import { useToast } from '@/shared/hooks/use-toast'
import { Button, Input, Label } from '@/shared/ui'
import { useStore } from '@/store'
import _ from 'lodash'
import { useState } from 'react'

export const Header = () => {
  const { tech, process, importTechCard, importProccess } = useStore()
  const [title, setTitle] = useState('')
  const { toast } = useToast()

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
      toast({
        title: 'Успешно',
        description: 'Файл сохранен',
        variant: 'success'
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleOpen = async () => {
    try {
      const { data } = await window.electron.ipcRenderer.invoke('open')
      setTitle(data.titleTool)
      importTechCard(data.techList.map((item) => _.omit(item, 'process')))
      importProccess(data.techList.reduce((acc, item) => ({ ...acc, [item.id]: item.process }), {}))
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

  return (
    <header className="mb-4 flex items-center justify-between p-2 border-b">
      <div>
        <Label htmlFor="title">Номер оснастки</Label>
        <Input
          id="title"
          className="text-xl font-medium"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="пример РА9260769"
        />
      </div>
      <Button onClick={handleCreate}>Создать новую</Button>
      <div className="flex gap-2">
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
