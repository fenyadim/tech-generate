import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import log from 'electron-log'
import { autoUpdater } from 'electron-updater'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { handleOpen } from './handle/handleOpen'
import { handlePrint } from './handle/handlePrint'
import { handleSave } from './handle/handleSave'

let mainWindow: BrowserWindow

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
      handlePrint(mainWindow)
    }
    if (input.control && input.code === 'KeyO') {
      event.preventDefault()
      handleOpen(mainWindow)
    }
    if (input.control && input.code === 'KeyS') {
      event.preventDefault()
      mainWindow.webContents.send('save-click')
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

ipcMain.handle('print', async () => handlePrint(mainWindow))

ipcMain.handle('save', async (_, data) => handleSave(mainWindow, 'save', data))

ipcMain.handle('save-as', async (_, data) => handleSave(mainWindow, 'save-as', data))

ipcMain.handle('open', async () => handleOpen(mainWindow))

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (_, commandLine) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
      const filePath = commandLine.find((arg) => arg.endsWith('.json'))
      if (filePath) {
        handleOpen(mainWindow, filePath)
      }
    }
  })

  app.whenReady().then(async () => {
    electronApp.setAppUserModelId('com.electron')

    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    createWindow()

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    if (process.argv.length >= 2) {
      const filePath = process.argv[1]
      if (filePath && filePath.endsWith('.json')) {
        mainWindow.webContents.once('did-finish-load', () => {
          handleOpen(mainWindow, filePath)
        })
      }
    }

    log.info('Проверка обновлений...')
    autoUpdater.checkForUpdatesAndNotify()
  })

  app.on('open-file', (event, path) => {
    event.preventDefault()
    if (mainWindow) {
      handleOpen(mainWindow, path)
    }
  })
}

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
  mainWindow.webContents.send('update-status', { status: 'update-start' })
})

autoUpdater.on('update-not-available', () => {
  log.info('Обновления нет.')
})

autoUpdater.on('download-progress', (info) => {
  const percent = info.percent.toFixed(1)
  mainWindow.webContents.send('update-progress', { percent })
})

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update-status', { status: 'update-end' })
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
