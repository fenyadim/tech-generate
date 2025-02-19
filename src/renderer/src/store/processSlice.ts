import { v4 as uuidv4 } from 'uuid'
import { StateCreator } from 'zustand'

export interface IProcessSlice {
  process: IProccess
  addProcess: (title: string, idTechCard: string) => void
  removeProcess: (id: string, idTechCard: string) => void
  moveProcessDown: (pos: number, idTechCard: string) => void
  moveProcessUp: (pos: number, idTechCard: string) => void
  changeText: (id: string, text: number | string, field: FieldType, idTechCard: string) => void
  importProccess: (data: IProccess) => void
}

interface IProccess {
  [idTechCard: string]: IProcessItem[]
}

export type FieldType = 'time' | 'description' | 'category'

export interface IProcessItem {
  id: string
  title: string
  time?: string
  description?: string
  category?: number
}

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
  process: {},
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
  moveProcessDown: (pos: number, idTechCard: string) => set(moveProcess(idTechCard, pos, 'down')),
  moveProcessUp: (pos: number, idTechCard: string) => set(moveProcess(idTechCard, pos, 'up')),
  changeText: (id: string, text: string | number, field: FieldType, idTechCard: string) =>
    set((state) => ({
      process: {
        ...state.process,
        [idTechCard]: state.process[idTechCard].map((item) =>
          item.id === id ? { ...item, [field]: text } : item
        )
      }
    })),
  importProccess: (data) => set(() => ({ process: data }))
})
