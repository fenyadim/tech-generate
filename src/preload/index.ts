import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'
import { HandlersApi } from './types'

// Custom APIs for renderer
const api: HandlersApi = {
  printPage: () => ipcRenderer.invoke('print'),
  saveFile: (mode, data) => ipcRenderer.invoke(mode, data),
  openFile: () => ipcRenderer.invoke('open'),
  updateProgress: (cb) => ipcRenderer.on('update-progress', (_, precent) => cb(precent)),
  updateStatus: (cb) => ipcRenderer.on('update-status', (_, status) => cb(status)),
  saveClick: (cb) => ipcRenderer.on('save-click', () => cb()),
  fileOpened: (cb) => ipcRenderer.on('file-opened', (_, data) => cb(data)),
  fileSaved: (cb) => ipcRenderer.on('file-saved', () => cb()),
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
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
