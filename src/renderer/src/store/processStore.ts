import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
export interface IProcess {
  [idTechCard: string]: IProcessItem[]
}

export type FieldType = keyof Omit<IProcessItem, 'id' | 'title'>

interface IActions {
  addProcess: (title: string) => void
  setProcess: (process: IProcess) => void
  removeProcess: (idProcess: string) => void
  clearProcess: () => void
  copyProcess: (items: IProcessItem[], idFreshTechCard: string) => void
  moveUpProcess: (pos: number) => void
  moveDownProcess: (pos: number) => void
  changeTextProcess: (idProcess: string, text: string, field: FieldType) => void
}
export interface IProcessItem {
  id: string
  title: string
  time?: string
  description?: string
  category?: number
}

interface IProcessStore {
  processItems: IProcess
  actions: (idTechCard: string) => IActions
}

const moveProcess =
  (pos: number, idTechCard: string, type: 'up' | 'down') => (state: IProcessStore) => {
    const item = state.processItems[idTechCard][pos]
    state.processItems[idTechCard].splice(pos, 1)
    if (type === 'up') state.processItems[idTechCard].splice(pos - 1, 0, item)
    else state.processItems[idTechCard].splice(pos + 1, 0, item)
  }

export const processStore = create<IProcessStore>()(
  immer((set) => ({
    processItems: {},
    actions: (idTechCard) => ({
      addProcess: (title) =>
        set((state) => {
          if (!state.processItems[idTechCard]) {
            state.processItems[idTechCard] = []
          }
          state.processItems[idTechCard].push({ id: uuidv4(), title })
        }),
      setProcess: (process) =>
        set((state) => {
          state.processItems = process
        }),
      removeProcess: (idProcess) =>
        set((state) => {
          const index = state.processItems[idTechCard].findIndex((item) => item.id === idProcess)
          if (index !== -1) state.processItems[idTechCard].splice(index, 1)
        }),
      clearProcess: () =>
        set((state) => {
          state.processItems = _.omit(state.processItems, idTechCard)
        }),
      copyProcess: (items: IProcessItem[], idFreshTechCard: string) =>
        set((state) => {
          state.processItems[idFreshTechCard] = items
        }),
      moveDownProcess: (pos: number) => set(moveProcess(pos, idTechCard, 'down')),
      moveUpProcess: (pos: number) => set(moveProcess(pos, idTechCard, 'up')),
      changeTextProcess: (id: string, text: string, field: FieldType) =>
        set((state) => {
          const index = state.processItems[idTechCard].findIndex((item) => item.id === id)
          state.processItems[idTechCard][index] = {
            ...state.processItems[idTechCard][index],
            [field]: text
          }
        })
    })
  }))
)

export const useProcessItems = () => processStore((state) => state.processItems)
export const useProcessItem = (id: string) => processStore((state) => state.processItems[id])
export const useProcessActions = (idTechCard: string) => processStore.getState().actions(idTechCard)
