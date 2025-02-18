import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import fs from 'fs'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

let mainWindow: BrowserWindow

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    title: 'Генератор тех.процессов',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.webContents.on('before-input-event', async (event, input) => {
    if (input.control && input.code === 'KeyP') {
      event.preventDefault()
      handlePrint()
    }
    if (input.control && input.code === 'KeyO') {
      event.preventDefault()
      handleOpen()
    }
    if (input.control && input.code === 'KeyS') {
      event.preventDefault()
      const data = await mainWindow.webContents.executeJavaScript('window.getSaveData()')
      handleSave(data)
    }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

async function handleSave({ data, fileName }) {
  const dataDirectory = join(app.getPath('userData'), 'data')
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory)
  }

  let filePath = join(dataDirectory, `${fileName}.json`)

  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    mainWindow.webContents.send('file-saved')
    return { status: 'success', filePath }
  }

  const result = await dialog.showSaveDialog({
    defaultPath: filePath,
    filters: [{ name: 'JSON Files', extensions: ['json'] }]
  })

  if (!result.canceled && result.filePath) {
    filePath = result.filePath
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    mainWindow.webContents.send('file-saved')
    return { status: 'success', filePath }
  } else {
    return { status: 'cancelled' }
  }
}

async function handleOpen() {
  const result = await dialog.showOpenDialog({
    title: 'Открыть файл',
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
    properties: ['openFile']
  })

  if (result.canceled) {
    return { status: 'cancelled' }
  }

  const filePath = result.filePaths[0]
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    const parsedData = JSON.parse(data)
    mainWindow.webContents.send('file-opened', parsedData)
    return { status: 'success', filePath, data: parsedData }
  } catch (error) {
    return { status: 'error', message: 'Не удалось прочитать файл.' }
  }
}

function handlePrint() {
  const win = BrowserWindow.getFocusedWindow()
  if (!win) return { status: 'error', message: 'Нет активного окна' }

  win.webContents.print(
    {
      printBackground: true,
      silent: false
    },
    (success, error) => {
      if (!success) console.error('Ошибка печати:', error)
    }
  )

  return { status: 'success' }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('save', async (_, data) => handleSave(data))

  ipcMain.handle('open', async () => handleOpen())

  ipcMain.handle('print', async () => handlePrint())

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
