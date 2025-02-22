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
}
