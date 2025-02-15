import { create } from 'zustand'
import { IProcessSlice, processSlice } from './processSlice'
import { ITechCardSlice, techCardSlice } from './techCardSlice'

export const useStore = create<ITechCardSlice & IProcessSlice>((...a) => ({
  ...techCardSlice(...a),
  ...processSlice(...a)
}))
