export interface HandlersApi {
  saveFile: (
    mode: 'save' | 'save-as',
    data: { data: unknown; filePath: string | null; fileName: string }
  ) => Promise<{
    success: boolean
    message: string
    filePath: string
  }>
  openFile: () => Promise<{
    success: boolean
    message: string
    data: unknown
  }>
  printPage: () => Promise<{ success: boolean; message: string }>
  updateProgress: (cb: (precent: string) => void) => void
  updateStatus: (cb: (status: 'update-start' | 'update-end') => void) => void
  saveClick: (cb: () => void) => void
  saveAsClick: (cb: () => void) => void
  onGetUnsavedStatusRequest: (getStatus: () => boolean) => void
  fileOpened: <T>(cb: (data: T) => void) => void
  fileSaved: (cb: () => void) => void
  removeAllListeners: (channel: ChannelsType) => void
}

type ChannelsType =
  | 'save-click'
  | 'save-as-click'
  | 'file-saved'
  | 'file-opened'
  | 'get-unsaved-status'
