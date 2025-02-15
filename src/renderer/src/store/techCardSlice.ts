import { v4 as uuidv4 } from 'uuid'
import { StateCreator } from 'zustand'

export interface ITechCardSlice {
  tech: ITechCard[]
  createTechCard: (title: string) => void
  deleteTechCard: (id: string) => void
}

export interface IProccesItem {
  title: string
  time?: string
}

interface ITechCard {
  id: string
  title: string
}

const initialState: ITechCard[] = []

export const techCardSlice: StateCreator<ITechCardSlice, [], [], ITechCardSlice> = (set) => ({
  tech: initialState,
  createTechCard: (title: string) =>
    set((state) => ({ tech: [...state.tech, { id: uuidv4(), title, process: [] }] })),
  deleteTechCard: (id: string) =>
    set((state) => ({ tech: state.tech.filter((item) => item.id !== id) }))
})

// addProcess: (title: string, id: string) =>
// 	set((state) => ({
// 		tech: state.tech.map((item) =>
// 			item.id === id ? { ...item, process: [...item.process, { title }] } : item
// 		)
// 	})),
// removeProcess: (id: string) =>
// 	set((state) => ({
// 		tech: state.tech.map((item) => (item.id === id ? { ...item, process: [] } : item))
// 	}))
//
