import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@/shared/ui'
import { useStore } from '@/store'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { AddProcess } from './add-process'
import { ProcessItem } from './process-item'

interface TechCardProps {
  title: string
  id: string
  onDelete: (id: string) => void
}

// const mockProcess = [
//   { title: 'Заготовка', time: '2.5' },
//   { title: 'Проф.шлифовка', time: '1.5' },
//   { title: 'Оптика', time: '1.5' },
//   { title: 'Эл.эрозия' }
// ]

export const TechCard = ({ id, title = '', onDelete }: TechCardProps) => {
  const { process, changeTitle } = useStore()
  const [titleValue, setTitleValue] = useState(title)

  const handleDelete = () => {
    onDelete(id)
  }

  const onChangeTitle = () => {
    if (titleValue !== title) changeTitle(id, titleValue)
  }

  return (
    <Card className="w-96 h-fit relative">
      <Button
        className="absolute top-1 right-1"
        title="Удалить"
        variant="ghost"
        size="icon"
        onClick={handleDelete}
      >
        <Trash2 className="text-red-600" />
      </Button>
      <CardHeader>
        <CardTitle>
          <Label htmlFor="title">Название и номер детали</Label>
          <Input
            id="title"
            className="text-xl"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={onChangeTitle}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="grid grid-cols-[0.3fr_2fr_1fr_90px] gap-2 justify-items-center px-2 *:font-medium">
          <p>№</p>
          <p>Процесс</p>
          <p>Норма</p>
        </div>
        {!!process[id] &&
          process[id].map(({ id: processId, title, time, description }, index) => {
            return (
              <ProcessItem
                key={processId}
                id={processId}
                parentId={id}
                pos={index + 1}
                title={title}
                time={time}
                description={description}
                length={process[id]?.length}
              />
            )
          })}
        <AddProcess idParent={id} />
      </CardContent>
      {/* <CardFooter className="gap-3">
        <Button onClick={onSignalSave}>Сохранить</Button>
        <Button title="Удалить" variant="destructive" size="icon" onClick={handleDelete}>
          <Trash2 />
        </Button>
      </CardFooter> */}
    </Card>
  )
}
