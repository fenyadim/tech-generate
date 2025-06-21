import { app, BrowserWindow } from 'electron'
import fs from 'fs'
import path from 'path'

let previewWindow: BrowserWindow | null

export async function handlePrint(mainWindow: BrowserWindow) {
  try {
    const pdfData = await mainWindow.webContents.printToPDF({
      printBackground: true,
      margins: {
        marginType: 'none'
      },
      pageSize: 'A4'
    })

    const pdfPath = path.join(app.getPath('temp'), 'print_preview.pdf')
    fs.writeFileSync(pdfPath, pdfData)

    if (previewWindow) {
      previewWindow.close()
    }

    previewWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    })

    previewWindow.loadURL(`file://${pdfPath}`)
    previewWindow.on('closed', () => {
      fs.unlinkSync(pdfPath)
      previewWindow = null
    })

    return { success: true, message: 'Превью готово', pdfPath }
  } catch (error) {
    return { success: false, message: `Ошибка: ${(error as Error).message}` }
  }
}
