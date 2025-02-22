import { store, StoreApi } from '@davstack/store'
import { v4 as uuidv4 } from 'uuid'

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

const moveProcess = (
  store: StoreApi<IProccess>,
  pos: number,
  idTechCard: string,
  type: 'up' | 'down'
) => {
  store[idTechCard].set((draft) => {
    const item = draft[pos]
    draft.splice(pos, 1)
    if (type === 'up') draft.splice(pos - 1, 0, item)
    else draft.splice(pos + 1, 0, item)
  })
}

const initialState: IProccess = {}

export const processStore = store(initialState).extend((store) => ({
  add: (title: string, idTechCard: string) => {
    if (!store[idTechCard].get())
      store.assign({
        [idTechCard]: []
      })
    store[idTechCard].set((draft) => draft.push({ id: uuidv4(), title }))
  },
  remove: (id: string, idTechCard: string) => {
    store[idTechCard].set((draft) => {
      const index = draft.findIndex((item) => item.id === id)
      if (index !== -1) draft.splice(index, 1)
    })
  },
  copyProcess: (items: IProcessItem[], idTechCard: string) => {
    store.assign({ [idTechCard]: items })
  },
  moveDown: (pos: number, idTechCard: string) => {
    moveProcess(store, pos, idTechCard, 'down')
  },
  moveUp: (pos: number, idTechCard: string) => {
    moveProcess(store, pos, idTechCard, 'up')
  },
  changeText: (id: string, text: string, field: FieldType, idTechCard: string) => {
    const index = store[idTechCard].get().findIndex((item) => item.id === id)
    store[idTechCard][index].assign({ [field]: text })
  }
}))
