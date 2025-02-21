import { store } from '@davstack/store'
import { v4 as uuidv4 } from 'uuid'
import { IProcessItem } from './processStore'

export interface ITechCardSlice {
  tech: ITechCard[]
  createTechCard: () => void
  deleteTechCard: (id: string) => void
  changeTitle: (id: string, title: string) => void
  importTechCard: (data: ITechCard[]) => void
}
interface ITechCard {
  id: string
  title: string
  process: IProcessItem[]
}

const initialState: ITechCard[] = []

export const techCardStore = store(initialState).extend((store) => ({
  createCard: () =>
    store.set((draft) => {
      draft.push({ id: uuidv4(), title: '', process: [] })
    }),
  deleteCard: (id: string) => {
    console.log(store.get())
    store.set((draft) => {
      const index = draft.findIndex((item) => item.id === id)
      if (index !== -1) draft.splice(index, 1)
    })
  },
  changeTitle: (id: string, title: string) => {
    store.set((draft) => {
      const index = draft.findIndex((item) => item.id === id)
      if (index !== -1) draft[index].title = title
    })
  }
}))
