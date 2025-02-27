import { type BrowserWindow, dialog } from 'electron'
import fs from 'fs'

export async function handleOpen(mainWindow: BrowserWindow, filePath: string | null = null) {
  let openFilePath = filePath
  if (!openFilePath) {
    const result = await dialog.showOpenDialog({
      title: 'Открыть файл',
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
      properties: ['openFile']
    })
    if (result.canceled) {
      return { status: 'cancelled' }
    }
    openFilePath = result.filePaths[0]
  }

  try {
    const data = fs.readFileSync(openFilePath, 'utf-8')
    const parsedData = JSON.parse(data)
    mainWindow.webContents.send('file-opened', parsedData)
    return { status: 'success', data: parsedData }
  } catch (error) {
    return { status: 'error', message: 'Не удалось прочитать файл.' }
  }
}
