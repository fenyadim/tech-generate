import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'
import { HandlersApi } from './types'

// Custom APIs for renderer
const api: HandlersApi = {
  printPage: () => ipcRenderer.invoke('print'),
  saveFile: (mode, data) => ipcRenderer.invoke(mode, data),
  openFile: () => ipcRenderer.invoke('open'),
  updateProgress: (cb) => ipcRenderer.on('progress', (_, precent) => cb(precent)),
  onUpdateStatus: (cb) => ipcRenderer.on('update-status', (_, status) => cb(status))
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
