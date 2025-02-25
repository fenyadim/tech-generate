import { cn } from '@/shared/lib/utils'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@/shared/ui'
import { fileStore, processStore, techCardStore } from '@/store'
import { Trash2 } from 'lucide-react'
import { AddProcess } from './add-process'
import { CopyButton } from './copy-button'
import { CountElement } from './count-element'
import { ProcessItem } from './process-item'

interface TechCardProps {
  id: string
  title: string
  count: number
  onDelete: (id: string) => void
}

export const TechCard = ({ id, title = '', count = 1, onDelete }: TechCardProps) => {
  const process = processStore.use()
  const author = fileStore.author.use()

  const handleDelete = () => {
    onDelete(id)
  }

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    techCardStore.changeTitle(id, e.target.value)
  }

  const sumNormTime = () => {
    return process[id]
      ? process[id].reduce((acc, item) => acc + (item.time ? Number(item.time) : 0), 0)
      : 0
  }

  const sum = (sumNormTime() * count).toFixed(2)

  return (
    <Card
      className={cn('h-fit relative break-inside-avoid print:shadow-none', {
        'print:hidden': !process[id],
        'border-destructive border-2': isNaN(sumNormTime())
      })}
    >
      <div className="absolute top-1 right-1 print:hidden">
        <CopyButton idCard={id} />
        <Button title="Удалить" variant="ghost" size="icon" onClick={handleDelete}>
          <Trash2 className="text-red-600" />
        </Button>
      </div>
      <CardHeader className="print:p-2 print:pb-0">
        <CardTitle>
          <Label className="print:hidden" htmlFor="title">
            Название и номер детали
          </Label>
          <Input
            id="title"
            className="text-xl print:hidden"
            value={title}
            onChange={onChangeTitle}
          />
          <h3 className="font-medium hidden print:block">{title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 print:p-2">
        <div className="grid grid-cols-[0.3fr_3fr_1fr_1fr_70px] gap-1 justify-items-center px-2 *:font-medium text-sm print:grid-cols-[0.3fr_2fr_1fr_1fr]">
          <p>№</p>
          <p>Процесс</p>
          <p>Норма</p>
          <p>Разряд</p>
        </div>
        {!!process[id] &&
          process[id].map(({ id: processId, title, category, description, time }, index) => {
            return (
              <ProcessItem
                key={processId}
                id={processId}
                parentId={id}
                pos={index + 1}
                length={process[id]?.length}
                title={title}
                time={time}
                description={description}
                category={category}
              />
            )
          })}
        <AddProcess idParent={id} />
        <p className="font-medium">Общее время: {sum}</p>
        <CountElement id={id} count={count} />
        <p className="hidden print:block">Автор: {author}</p>
      </CardContent>
    </Card>
  )
}
