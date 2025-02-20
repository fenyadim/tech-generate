import { useToast } from '@/shared/hooks/use-toast'
import { Button, Input, Label } from '@/shared/ui'
import { useStore } from '@/store'
import _ from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'

export const Header = () => {
  const { author, setAuthorStore, tech, process, importTechCard, importProccess } = useStore()
  const [title, setTitle] = useState('')
  const { toast } = useToast()

  const btnSaveRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    window.electron.ipcRenderer.on('file-saved', () => {
      toast({
        title: 'Успешно',
        description: 'Файл сохранен',
        variant: 'success'
      })
    })

    window.electron.ipcRenderer.on('save-click', () => {
      btnSaveRef.current?.click()
    })

    window.electron.ipcRenderer.on('file-opened', (__, data) => {
      const { titleTool, techList, author } = data
      setTitle(titleTool)
      setAuthorStore(author)
      importTechCard(techList.map((item) => _.omit(item, 'process')))
      importProccess(techList.reduce((acc, item) => ({ ...acc, [item.id]: item.process }), {}))
      console.log(tech)
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('file-opened')
      window.electron.ipcRenderer.removeAllListeners('save-click')
      window.electron.ipcRenderer.removeAllListeners('file-saved')
    }
  }, [])

  const handleSave = (type: 'save' | 'save-as') => async () => {
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

      window.electron.ipcRenderer.invoke(type, {
        fileName: title,
        data: {
          titleTool: title,
          author,
          techList: tech.map((item) => ({ ...item, process: process[item.id] }))
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleOpen = async () => {
    try {
      await window.electron.ipcRenderer.invoke('open')
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleCreate = async () => {
    window.electron.ipcRenderer.invoke('new-file')
    setTitle('')
    setAuthorStore('')
    importTechCard([])
    importProccess({})
  }

  const handlePrint = async () => {
    try {
      const { success, message } = await window.api.printPage()
      console.log(success, message)
      if (success) {
        toast({
          title: 'Успешно',
          description: 'Страница отправлена на печать.',
          variant: 'success'
        })
      } else {
        toast({
          title: 'Ошибка',
          description: `Ошибка при печати: ${message}`,
          variant: 'destructive'
        })
      }
    } catch (err) {
      toast({
        title: 'Ошибка',
        description: `Ошибка: ${err}`,
        variant: 'destructive'
      })
    }
  }

  const onChangeAuthor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorStore(e.target.value)
  }, [])

  return (
    <header className="mb-4 flex items-center justify-between p-2 border-b print:hidden">
      <div className="flex gap-2">
        <div>
          <Label htmlFor="title">Номер оснастки</Label>
          <Input
            id="title"
            className="text-xl font-medium print:hidden"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="пример РА9260769"
          />
          <h3 className="font-medium hidden print:block">{title}</h3>
        </div>
        <div>
          <Label htmlFor="author">Автор</Label>
          <Input
            id="author"
            className="text-xl font-medium print:hidden"
            value={author}
            onChange={onChangeAuthor}
          />
          <h3 className="font-medium hidden print:block">{author}</h3>
        </div>
      </div>
      <div className="flex gap-2 print:hidden">
        <Button onClick={handleCreate}>Создать новую</Button>
        <Button onClick={handlePrint}>Печать</Button>
      </div>
      <div className="flex gap-2 print:hidden">
        <Button ref={btnSaveRef} variant="outline" onClick={handleSave('save')}>
          Сохранить
        </Button>
        <Button variant="outline" onClick={handleSave('save-as')}>
          Сохранить как
        </Button>
        <Button variant="outline" onClick={handleOpen}>
          Открыть
        </Button>
      </div>
    </header>
  )
}
