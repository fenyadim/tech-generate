import { Button } from '@/shared/ui'
import { fileStore, processStore, techCardStore } from '@/store'
import _ from 'lodash'
import { useEffect } from 'react'

export const OpenButton = () => {
  useEffect(() => {
    window.electron.ipcRenderer.on('file-opened', (__, data) => {
      const { titleTool, techList, author, path } = data
      fileStore.assign({ title: titleTool, author: author, path })
      techCardStore.set(techList.map((item) => _.omit(item, 'process')))
      processStore.set(techList.reduce((acc, item) => ({ ...acc, [item.id]: item.process }), {}))
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('file-opened')
    }
  }, [])

  const handleOpen = async () => {
    try {
      await window.api.openFile()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <Button variant="outline" onClick={handleOpen}>
      Открыть
    </Button>
  )
}
