import { ElectronAPI } from '@electron-toolkit/preload'

interface HandlersApi {
  saveFile: (
    mode: 'save' | 'save-as',
    data: { data: T; filePath: string | null; fileName: string }
  ) => Promise<{
    success: boolean
    message: string
    filePath: string
  }>
  openFile: () => Promise<{
    success: boolean
    message: string
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
