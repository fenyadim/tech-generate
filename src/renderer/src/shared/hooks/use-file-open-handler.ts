import { useFileActions, useProcessActions, useTechActions } from '@/store'
import { IFileOpened } from '@/types'
import { useEffect } from 'react'

export const useFileOpenHandler = () => {
  const { setCards } = useTechActions()
  const { changeAll } = useFileActions()
  const { setProcess } = useProcessActions('')

  useEffect(() => {
    const handleFileOpen = (data: IFileOpened) => {
      const { titleTool, techList, author, path } = data

      changeAll({ title: titleTool, author, path })
      setCards(
        techList.map((item) => ({
          ...item,
          count: item.count ?? 1,
          process: [],
          isVisibleForPrint: true
        }))
      )
      setProcess(techList.reduce((acc, item) => ({ ...acc, [item.id]: item.process }), {}))
    }

    window.api.fileOpened(handleFileOpen)

    return () => {
      window.api.removeAllListeners('file-opened')
    }
  }, [changeAll, setCards, setProcess])
}
