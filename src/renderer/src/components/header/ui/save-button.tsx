import { toast } from '@/shared/hooks/use-toast'
import { Button } from '@/shared/ui'
import {
  useFileActions,
  useFileAuthor,
  useFilePath,
  useFileTitle,
  useProcessItems,
  useTechCards
} from '@/store'

import { useEffect, useRef } from 'react'

interface SaveButtonProps {
  mode: 'save' | 'save-as'
}

export const SaveButton = ({ mode }: SaveButtonProps) => {
  const title = useFileTitle()
  const author = useFileAuthor()
  const path = useFilePath()
  const { changeValue } = useFileActions()
  const techCards = useTechCards()
  const processItems = useProcessItems()
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

      if (techCards.length === 0) {
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
          techList: techCards.map((item) => ({
            ...item,
            process: processItems[item.id],
            count: item.count ?? 1
          }))
        },
        filePath: path,
        fileName: title
      })

      changeValue(filePath, 'path')
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <Button
      ref={mode === 'save' ? btnSaveRef : null}
      variant="outline"
      onClick={handleSave}
      data-testid={`header-${mode}-btn`}
    >
      {mode === 'save' ? 'Сохранить' : 'Сохранить как'}
    </Button>
  )
}
