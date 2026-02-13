import { create } from 'zustand'

interface IUnsavedStore {
  isDirty: boolean
  isLoading: boolean
  setDirty: (value: boolean) => void
  setLoading: (value: boolean) => void
}

export const unsavedStore = create<IUnsavedStore>((set) => ({
  isDirty: false,
  isLoading: false,
  setDirty: (value) => set({ isDirty: value }),
  setLoading: (value) => set({ isLoading: value })
}))
