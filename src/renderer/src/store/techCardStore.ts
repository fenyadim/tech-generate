import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { IProcessItem } from './processStore'

interface IActions {
  clearCards: () => void
  setCards: (arr: ITechCard[]) => void
  createCard: () => void
  deleteCard: (id: string) => void
  copyCard: (id: string) => void
  changeTitle: (id: string, title: string) => void
  setProcess: (id: string, processes: IProcessItem[]) => void
  toggleVisible: (id: string) => void
  setVisible: (isVisible: boolean) => void
  incrementCount: (id: string, value: number) => void
  decrementCount: (id: string, value: number) => void
}

export interface ITechCard {
  id: string
  title: string
  process: IProcessItem[]
  isVisibleForPrint: boolean
  count: number
}

interface ITechCardStore {
  techCards: ITechCard[]
  actions: IActions
  selectors: {
    getTitleById: (id: string) => string | undefined
    getLastId: () => string
  }
}

export const techCardStore = create<ITechCardStore>()(
  immer((set, get) => ({
    techCards: [],
    actions: {
      clearCards: () =>
        set((state) => {
          state.techCards = []
        }),

      setCards: (arr) =>
        set((state) => {
          state.techCards = arr
        }),

      createCard: () =>
        set((state) => {
          state.techCards.push({
            id: uuidv4(),
            title: '',
            process: [],
            count: 1,
            isVisibleForPrint: true
          })
        }),

      setProcess: (id, processes) =>
        set((state) => {
          const index = state.techCards.findIndex((card) => card.id === id)
          if (index !== -1) {
            state.techCards[index].process = processes
          }
        }),

      deleteCard: (id) =>
        set((state) => {
          const index = state.techCards.findIndex((card) => card.id === id)
          if (index !== -1) {
            state.techCards.splice(index, 1)
          }
        }),

      copyCard: (id) =>
        set((state) => {
          const index = state.techCards.findIndex((item) => item.id === id)
          if (index !== -1) state.techCards.push({ ...state.techCards[index], id: uuidv4() })
        }),

      changeTitle: (id, title) =>
        set((state) => {
          const card = state.techCards.find((card) => card.id === id)
          if (card) {
            card.title = title
          }
        }),

      toggleVisible: (id) =>
        set((state) => {
          const card = state.techCards.find((card) => card.id === id)
          if (card) {
            card.isVisibleForPrint = !card.isVisibleForPrint
          }
        }),

      setVisible: (isVisible) =>
        set((state) => {
          state.techCards = state.techCards.map((item) => ({
            ...item,
            isVisibleForPrint: isVisible
          }))
        }),

      incrementCount: (id, value) =>
        set((state) => {
          const card = state.techCards.find((card) => card.id === id)
          if (card) {
            card.count += value
          }
        }),

      decrementCount: (id, value) =>
        set((state) => {
          const card = state.techCards.find((card) => card.id === id)
          if (card) {
            card.count -= value
          }
        })
    },
    selectors: {
      getTitleById: (id) => get().techCards.find((card) => card.id === id)?.title,
      getLastId: () => get().techCards.findLast(() => true)!.id
    }
  }))
)

export const useTechTitle = (id: string) =>
  techCardStore((state) => state.selectors.getTitleById(id))
export const getTechLastId = () => techCardStore.getState().selectors.getLastId()
export const useTechCards = () => techCardStore((state) => state.techCards)
export const useTechActions = () => techCardStore((state) => state.actions)
