import { create } from 'zustand'
import { authorSlice, IAuthorSlice } from './authorSlice'
import { IProcessSlice, processSlice } from './processSlice'
import { ITechCardSlice, techCardSlice } from './techCardSlice'

export const useStore = create<ITechCardSlice & IProcessSlice & IAuthorSlice>((...a) => ({
  ...techCardSlice(...a),
  ...processSlice(...a),
  ...authorSlice(...a)
}))
