import { store } from '@davstack/store'
import { v4 as uuidv4 } from 'uuid'
import { IProcessItem } from './processStore'

export interface ITechCard {
  id: string
  title: string
  process: IProcessItem[]
  isVisibleForPrint: boolean
  count: number
}

const initialState: ITechCard[] = []

export const techCardStore = store(initialState).extend((store) => ({
  createCard: () =>
    store.set((draft) => {
      draft.push({ id: uuidv4(), title: '', process: [], count: 1, isVisibleForPrint: true })
    }),
  deleteCard: (id: string) => {
    store.set((draft) => {
      const index = draft.findIndex((item) => item.id === id)
      if (index !== -1) draft.splice(index, 1)
    })
  },
  copyCard: (id: string) => {
    store.set((draft) => {
      const index = draft.findIndex((item) => item.id === id)
      if (index !== -1) draft.push({ ...draft[index], id: uuidv4() })
    })
  },
  changeTitle: (id: string, title: string) => {
    store.set((draft) => {
      const index = draft.findIndex((item) => item.id === id)
      if (index !== -1) draft[index].title = title
    })
  },
  toggleVisible: (id: string) => {
    store.set((draft) => {
      const index = draft.findIndex((item) => item.id === id)
      if (index !== -1) draft[index].isVisibleForPrint = !draft[index].isVisibleForPrint
    })
  },
  incrementCount: (id: string) => {
    store.set((draft) => {
      const index = draft.findIndex((item) => item.id === id)
      if (index !== -1) draft[index].count += 1
    })
  },
  decrementCount: (id: string) => {
    store.set((draft) => {
      const index = draft.findIndex((item) => item.id === id)
      if (index !== -1) draft[index].count -= 1
    })
  }
}))
