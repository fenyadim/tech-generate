import { Button } from '@/shared/ui'
import {
  useFileActions,
  useFileAuthor,
  useFilePath,
  useFileTitle,
  useProcessItems,
  useTechCards
} from '@/store'

import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'sonner'

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
      toast.success('Успешно', {
        description: 'Файл сохранен'
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

  const handleSave = useCallback(async () => {
    try {
      if (!title) {
        toast.error('Ошибка', {
          description: 'Введите номер оснастки'
        })
        return
      }

      if (!author) {
        toast.error('Ошибка', {
          description: 'Введите автора'
        })
        return
      }

      if (techCards.length === 0) {
        toast.error('Ошибка', {
          description: 'Ничего не выбрано'
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
  }, [title, author, techCards, mode, path, changeValue, processItems])

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
