import { useToast } from '@/shared/hooks/use-toast'
import { Button, Input, Label } from '@/shared/ui'
import { useStore } from '@/store'
import _ from 'lodash'
import { useEffect, useState } from 'react'

export const Header = () => {
  const { tech, process, importTechCard, importProccess } = useStore()
  const [title, setTitle] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    window.electron.ipcRenderer.on('file-saved', () => {
      toast({
        title: 'Успешно',
        description: 'Файл сохранен',
        variant: 'success'
      })
    })
    window.electron.ipcRenderer.on('file-opened', (__, data) => {
      const { titleTool, techList } = data
      setTitle(titleTool)
      importTechCard(techList.map((item) => _.omit(item, 'process')))
      importProccess(techList.reduce((acc, item) => ({ ...acc, [item.id]: item.process }), {}))
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('file-opened')
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  window.getSaveData = () => {
    return {
      fileName: title,
      data: {
        titleTool: title,
        techList: tech.map((item) => ({ ...item, process: process[item.id] }))
      }
    }
  }

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

      if (tech.length === 0) {
        toast({
          title: 'Ошибка',
          description: 'Ничего не выбрано',
          variant: 'destructive'
        })
        return
      }

      window.electron.ipcRenderer.send('save', {
        fileName: title,
        data: {
          titleTool: title,
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

  const handleCreate = () => {
    setTitle('')
    importTechCard([])
    importProccess({})
  }

  const handlePrint = async () => {
    try {
      const result = await window.electron.ipcRenderer.invoke('print')
      if (result.status === 'success') {
        console.log('Страница отправлена на печать.')
      } else {
        console.error('Ошибка при печати:', result.message)
      }
    } catch (err) {
      console.error('Ошибка:', err)
    }
  }

  return (
    <header className="mb-4 flex items-center justify-between p-2 border-b print:hidden">
      <div>
        <p>Test</p>
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
      <div className="flex gap-2 print:hidden">
        <Button onClick={handleCreate}>Создать новую</Button>
        <Button onClick={handlePrint}>Печать</Button>
      </div>
      <div className="flex gap-2 print:hidden">
        <Button variant="outline" onClick={handleSave}>
          Сохранить
        </Button>
        <Button variant="outline" onClick={handleOpen}>
          Открыть
        </Button>
      </div>
    </header>
  )
}
