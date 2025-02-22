import { ElectronAPI } from '@electron-toolkit/preload'
import { HandlersApi } from './types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: HandlersApi
  }
}
