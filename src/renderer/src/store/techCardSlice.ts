import { v4 as uuidv4 } from 'uuid'
import { StateCreator } from 'zustand'

export interface ITechCardSlice {
  tech: ITechCard[]
  createTechCard: (title: string) => void
  deleteTechCard: (id: string) => void
  changeTitle: (id: string, title: string) => void
}
interface ITechCard {
  id: string
  title: string
}

const initialState: ITechCard[] = []

export const techCardSlice: StateCreator<ITechCardSlice, [], [], ITechCardSlice> = (set) => ({
  tech: initialState,
  createTechCard: (title) =>
    set((state) => ({ tech: [...state.tech, { id: uuidv4(), title, process: [] }] })),
  deleteTechCard: (id) => set((state) => ({ tech: state.tech.filter((item) => item.id !== id) })),
  changeTitle: (id, title) =>
    set((state) => ({
      tech: state.tech.map((item) => (item.id === id ? { ...item, title } : item))
    }))
})
