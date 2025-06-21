import { ITechCard } from '@/store'

export interface IFileOpened {
  titleTool: string
  author: string
  techList: ITechCard[]
  path: string
}
