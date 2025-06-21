import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface IAction {
  clearFileData: () => void
  changeAll: (obj: IFileData) => void
  changeValue: (value: string, field: keyof IFileData) => void
}

export interface IFileData {
  title: string
  author: string
  path: string
}

interface IFileStore {
  fileData: IFileData
  action: IAction
}

const fileStore = create<IFileStore>()(
  immer((set) => ({
    fileData: {
      title: '',
      author: '',
      path: ''
    },
    action: {
      clearFileData: () =>
        set((state) => {
          state.fileData = { title: '', path: '', author: '' }
        }),
      changeAll: (obj) =>
        set((state) => {
          state.fileData = obj
        }),
      changeValue: (value, field) =>
        set((state) => {
          state.fileData[field] = value
        })
    }
  }))
)

export const useFileTitle = () => fileStore((state) => state.fileData.title)
export const useFileAuthor = () => fileStore((state) => state.fileData.author)
export const useFilePath = () => fileStore((state) => state.fileData.path)
export const useFileFields = (field: keyof IFileData) => fileStore((state) => state.fileData[field])
export const useFileActions = () => fileStore((state) => state.action)
