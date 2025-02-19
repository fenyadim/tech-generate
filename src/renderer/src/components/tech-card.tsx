import { cn } from '@/shared/lib/utils'
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

export const TechCard = ({ id, title = '', onDelete }: TechCardProps) => {
  const { author, process, changeTitle } = useStore()
  const [titleValue, setTitleValue] = useState(title)

  const handleDelete = () => {
    onDelete(id)
  }

  const onChangeTitle = () => {
    if (titleValue !== title) changeTitle(id, titleValue)
  }

  const sumNormTime = () => {
    return process[id]
      ? process[id].reduce((acc, item) => acc + (item.time ? Number(item.time) : 0), 0)
      : 0
  }

  return (
    <Card
      className={cn('h-fit relative break-inside-avoid print:shadow-none print:w-[340px]', {
        'print:hidden': !process[id]
      })}
    >
      <Button
        className="absolute top-1 right-1 print:hidden"
        title="Удалить"
        variant="ghost"
        size="icon"
        onClick={handleDelete}
      >
        <Trash2 className="text-red-600" />
      </Button>
      <CardHeader className="print:p-2">
        <CardTitle>
          <Label className="print:hidden" htmlFor="title">
            Название и номер детали
          </Label>
          <Input
            id="title"
            className="text-xl print:hidden"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={onChangeTitle}
          />
          <h3 className="font-medium hidden print:block">{title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 print:p-2">
        <div className="grid grid-cols-[0.3fr_2fr_1fr_1fr_90px] gap-2 justify-items-center px-2 *:font-medium print:grid-cols-[0.3fr_2fr_1fr_1fr]">
          <p>№</p>
          <p>Процесс</p>
          <p>Норма</p>
          <p>Разряд</p>
        </div>
        {!!process[id] &&
          process[id].map(({ id: processId, ...items }, index) => {
            return (
              <ProcessItem
                key={processId}
                id={processId}
                parentId={id}
                pos={index + 1}
                length={process[id]?.length}
                {...items}
              />
            )
          })}
        <AddProcess idParent={id} />
        <p className="font-medium">Общее время: {sumNormTime().toFixed(2)}</p>
        <p className="hidden print:block">Автор: {author}</p>
      </CardContent>
    </Card>
  )
}
