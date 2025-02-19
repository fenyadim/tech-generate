import { StateCreator } from 'zustand'

export interface IAuthorSlice {
  author: string
  setAuthorStore: (author: string) => void
}

export const authorSlice: StateCreator<IAuthorSlice, [], [], IAuthorSlice> = (set) => ({
  author: '',
  setAuthorStore: (authorValue) =>
    set(() => ({
      author: authorValue
    }))
})
