import { create } from 'zustand'
import { authorSlice, IAuthorSlice } from './authorSlice'

export const useStore = create<IAuthorSlice>((...a) => ({
  ...authorSlice(...a)
}))
