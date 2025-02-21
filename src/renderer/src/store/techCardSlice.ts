import { store } from '@davstack/store'
import { v4 as uuidv4 } from 'uuid'
import { IProcessItem } from './processSlice'

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
  author: string
  process: IProcessItem[]
}

const initialState: ITechCard[] = []

export const techCardStore = store(initialState).extend((store) => ({
  create: () => {
    console.log('create')
    store.set((draft) => draft.push({ id: uuidv4(), title: '', author: '', process: [] }))
  },
  remove: (id: string) => {
    store.set((draft) => {
      const index = draft.findIndex((item) => item.id === id)
      if (index !== -1) draft.splice(index, 1)
    })
  }
}))
