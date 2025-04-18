export interface IFileOpened {
  titleTool: string
  techList: Array<{
    id: string
    title: string
    count: number
    process: Array<{
      id: string
      title: string
      time?: string
      description?: string
      category?: number
    }>
  }>
  author: string
  path: string
}
