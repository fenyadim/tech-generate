import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import log from 'electron-log'
import { autoUpdater } from 'electron-updater'
import fs from 'fs'
import path, { join } from 'path'
import icon from '../../resources/icon.png?asset'

let mainWindow: BrowserWindow
let savedFilePath = ''

log.transports.file.level = 'info'
autoUpdater.logger = log

autoUpdater.setFeedURL({
  provider: 'github',
  repo: 'tech-generate',
  owner: 'fenyadim'
})

function createWindow(): void {
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
    // if (input.control && input.code === 'KeyS') {
    //   event.preventDefault()
    //   mainWindow.webContents.send('save-click')
    // }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

async function handleSaveAs({ data, fileName }) {
  try {
    const { filePath } = await dialog.showSaveDialog({
      title: 'Сохранить файл',
      defaultPath: path.join(app.getPath('documents'), `${fileName}.json`),
      filters: [{ name: 'JSON Files', extensions: ['json'] }]
    })

    if (!filePath) return

    savedFilePath = filePath

    fs.writeFileSync(savedFilePath, JSON.stringify(data, null, 2), 'utf-8')
    mainWindow.webContents.send('file-saved')

    return { success: true, path: savedFilePath }
  } catch (error) {
    console.error('Ошибка сохранения файла:', error)
    return { success: false, error: (error as Error).message }
  }
}

async function handleSave({ data, fileName }) {
  try {
    if (!savedFilePath) {
      const { filePath } = await dialog.showSaveDialog({
        title: 'Сохранить файл',
        defaultPath: path.join(app.getPath('documents'), `${fileName}.json`),
        filters: [{ name: 'JSON Files', extensions: ['json'] }]
      })

      if (!filePath) return
      savedFilePath = filePath
    }

    fs.writeFileSync(savedFilePath, JSON.stringify(data, null, 2), 'utf-8')
    mainWindow.webContents.send('file-saved')

    return { success: true, path: savedFilePath }
  } catch (error) {
    console.error('Ошибка сохранения файла:', error)
    return { success: false, error: (error as Error).message }
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
    savedFilePath = filePath
    return { status: 'success', filePath, data: parsedData }
  } catch (error) {
    return { status: 'error', message: 'Не удалось прочитать файл.' }
  }
}

async function handlePrint() {
  const win = BrowserWindow.getFocusedWindow()
  if (!win) return { status: 'error', message: 'Нет активного окна' }

  win.webContents.print({}, (success, error) => {
    if (!success) return { status: 'error', message: error }
    return { status: 'success' }
  })
  return { status: 'success' }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('save', async (_, data) => handleSave(data))
  ipcMain.handle('save-as', async (_, data) => handleSaveAs(data))

  ipcMain.handle('open', async () => handleOpen())

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.handle('print', async () => handlePrint())

  ipcMain.handle('new-file', () => {
    savedFilePath = ''
    console.log(savedFilePath)
  })

  log.info('Проверка обновлений...')
  autoUpdater.checkForUpdatesAndNotify()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

autoUpdater.on('update-available', (info) => {
  log.info(`Обновление доступно: ${info.version}`)
  dialog.showMessageBox({
    type: 'info',
    title: 'Обновление доступно',
    message: 'Доступна новая версия. Загрузка...'
  })
})

autoUpdater.on('update-not-available', () => {
  log.info('Обновления нет.')
})

autoUpdater.on('download-progress', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Загрузка обновления',
    message: `Идет загрузка обновления. Подождите...`
  })
})

autoUpdater.on('update-downloaded', () => {
  dialog
    .showMessageBox({
      type: 'info',
      title: 'Обновление загружено',
      message: 'Обновление загружено. Перезапустить приложение?',
      buttons: ['Да', 'Позже']
    })
    .then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall()
      }
    })
})
