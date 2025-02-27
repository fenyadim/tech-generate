import { app, type BrowserWindow, dialog } from 'electron'
import fs from 'fs'
import path from 'path'

export async function handleSave(
  mainWindow: BrowserWindow,
  mode: 'save' | 'save-as',
  { data, fileName, filePath: savedFilePath }
) {
  try {
    if (!savedFilePath || mode === 'save-as') {
      const { filePath } = await dialog.showSaveDialog({
        title: 'Сохранить файл',
        defaultPath: path.join(app.getPath('documents'), `${fileName}.json`),
        filters: [{ name: 'JSON Files', extensions: ['json'] }]
      })

      if (!filePath) return
      savedFilePath = filePath
    }

    fs.writeFileSync(
      savedFilePath,
      JSON.stringify({ ...data, path: savedFilePath }, null, 2),
      'utf-8'
    )
    mainWindow.webContents.send('file-saved')

    return { success: true, message: 'Файл успешно сохранен', filePath: savedFilePath }
  } catch (error) {
    return { success: false, message: `Ошибка: ${(error as Error).message}`, filePath: null }
  }
}
