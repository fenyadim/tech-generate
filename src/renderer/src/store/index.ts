import { create } from 'zustand'
import { IProcessSlice, processSlice } from './processSlice'
import { ISignalProps, signalSlice } from './signalSlice'
import { ITechCardSlice, techCardSlice } from './techCardSlice'

export const useStore = create<ITechCardSlice & IProcessSlice & ISignalProps>((...a) => ({
  ...techCardSlice(...a),
  ...processSlice(...a),
  ...signalSlice(...a)
}))
