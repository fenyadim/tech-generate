import { ElectronAPI } from '@electron-toolkit/preload'

interface HandlersApi {
  saveFile: (data: { data: T; filePath: string | null }) => Promise<{
    success: boolean
    message: string
    filePath: string | null
  }>
  openFile: (data: { filePath: string | null }) => Promise<{
    success: boolean
    message: string
    filePath: string | null
    data: T | null
  }>
  printPage: () => Promise<{ success: boolean; message: string }>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: HandlersApi
  }
}
