import { store } from '@davstack/store'

interface IFileStore {
  title: string
  author: string
  path: string
}

const initialState: IFileStore = {
  title: '',
  author: '',
  path: ''
}

export const fileStore = store(initialState)
