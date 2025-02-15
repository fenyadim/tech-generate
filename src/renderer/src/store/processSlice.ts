import { v4 as uuidv4 } from 'uuid'
import { StateCreator } from 'zustand'

export interface IProcessSlice {
  process: IProccess
  addProcess: (title: string, idTechCard: string) => void
  removeProcess: (id: string, idTechCard: string) => void
  moveProcessDown: (idTechCard: string, pos: number) => void
  moveProcessUp: (idTechCard: string, pos: number) => void
}

interface IProccess {
  [idTechCard: string]: IProcessItem[]
}

interface IProcessItem {
  id: string
  title: string
  time?: string
}

const initialState: IProccess = {}

const moveProcess =
  (idTechCard: string, pos: number, type: 'up' | 'down') => (state: IProcessSlice) => {
    const newList = [...state.process[idTechCard]]
    if (type === 'up') {
      ;[newList[pos], newList[pos - 1]] = [newList[pos - 1], newList[pos]]
    } else if (type === 'down') {
      ;[newList[pos], newList[pos + 1]] = [newList[pos + 1], newList[pos]]
    }
    return { process: { ...state.process, [idTechCard]: newList } }
  }

export const processSlice: StateCreator<IProcessSlice, [], [], IProcessSlice> = (set) => ({
  process: initialState,
  addProcess: (title: string, idTechCard: string) =>
    set((state) => ({
      process: {
        ...state.process,
        [idTechCard]: state.process[idTechCard]
          ? [...state.process[idTechCard], { id: uuidv4(), title }]
          : [{ id: uuidv4(), title }]
      }
    })),
  removeProcess: (id: string, idTechCard: string) =>
    set((state) => ({
      process: {
        ...state.process,
        [idTechCard]: state.process[idTechCard].filter((item) => item.id !== id)
      }
    })),
  moveProcessDown: (idTechCard: string, pos: number) => set(moveProcess(idTechCard, pos, 'down')),
  moveProcessUp: (idTechCard: string, pos: number) => set(moveProcess(idTechCard, pos, 'up'))
})
