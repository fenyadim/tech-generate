import { ITechCard } from '@/store/techCardStore'

export interface IFileOpened {
  titleTool: string
  author: string
  techList: ITechCard[]
  path: string
}
