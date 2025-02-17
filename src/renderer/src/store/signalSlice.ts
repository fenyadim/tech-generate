import { StateCreator } from 'zustand'

export interface ISignalProps {
  signal: string
  onSignalSave: () => void
  onSignalReset: () => void
}

export const signalSlice: StateCreator<ISignalProps, [], [], ISignalProps> = (set) => ({
  signal: '',
  onSignalSave: () => set(() => ({ signal: 'save' })),
  onSignalReset: () => set(() => ({ signal: '' }))
})
