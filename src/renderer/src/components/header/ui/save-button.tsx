import { toast } from '@/shared/hooks/use-toast'
import { Button } from '@/shared/ui'
import { fileStore, processStore, techCardStore } from '@/store'
import { useEffect, useRef } from 'react'

interface SaveButtonProps {
  mode: 'save' | 'save-as'
}

export const SaveButton = ({ mode }: SaveButtonProps) => {
  const btnSaveRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    window.api.fileSaved(() => {
      toast({
        title: 'Успешно',
        description: 'Файл сохранен',
        variant: 'success'
      })
    })

    window.api.saveClick(() => {
      btnSaveRef.current?.focus()
      btnSaveRef.current?.click()
    })

    return () => {
      window.api.removeAllListeners('save-click')
      window.api.removeAllListeners('file-saved')
    }
  }, [])

  const handleSave = async () => {
    const author = fileStore.author.get()
    const title = fileStore.title.get()
    const tech = techCardStore.get()
    const process = processStore.get()

    try {
      if (!title) {
        toast({
          title: 'Ошибка',
          description: 'Введите номер оснастки',
          variant: 'destructive'
        })
        return
      }

      if (!author) {
        toast({
          title: 'Ошибка',
          description: 'Введите автора',
          variant: 'destructive'
        })
        return
      }

      if (tech.length === 0) {
        toast({
          title: 'Ошибка',
          description: 'Ничего не выбрано',
          variant: 'destructive'
        })
        return
      }

      const { filePath } = await window.api.saveFile(mode, {
        data: {
          titleTool: title,
          author,
          techList: tech.map((item) => ({
            ...item,
            process: process[item.id],
            count: item.count ?? 1
          }))
        },
        filePath: fileStore.path.get(),
        fileName: title
      })

      fileStore.path.set(filePath)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <Button ref={mode === 'save' ? btnSaveRef : null} variant="outline" onClick={handleSave}>
      {mode === 'save' ? 'Сохранить' : 'Сохранить как'}
    </Button>
  )
}
