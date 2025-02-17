import { cn } from '@/shared/lib/utils'
import { Button, Input, Textarea } from '@/shared/ui'
import { useStore } from '@/store'
import { ArrowDown, ArrowUp, ListPlus, X } from 'lucide-react'
import { useState } from 'react'

interface ProcessItemProps {
  id: string
  parentId: string
  pos: number
  title: string
  description?: string
  time?: string
  length: number
}

export const ProcessItem = ({
  id,
  parentId,
  pos,
  time = '',
  title,
  description = '',
  length
}: ProcessItemProps) => {
  const { removeProcess, moveProcessDown, moveProcessUp, changeText } = useStore()
  const [timeValue, setTimeValue] = useState(time)
  const [textAreaValue, setTextAreaValue] = useState(description)

  const handleDeleteItem = () => {
    removeProcess(id, parentId)
  }

  const handleMoveDown = () => {
    moveProcessDown(pos - 1, parentId)
  }

  const handleMoveUp = () => {
    moveProcessUp(pos - 1, parentId)
  }

  const onFocusOut = (field: 'time' | 'description') => () => {
    if (field === 'time' && timeValue !== time) changeText(id, timeValue, 'time', parentId)
    if (field === 'description' && textAreaValue !== description)
      changeText(id, textAreaValue, 'description', parentId)
  }

  return (
    <div>
      <div
        className={cn(
          'grid grid-cols-[0.3fr_2fr_1fr_90px] gap-2 px-2 items-center border border-b-0 rounded-t-lg',
          {
            'print:rounded-b-lg print:border-b': description === ''
          }
        )}
      >
        <p className="text-right">{pos}.</p>
        <p className="align-middle text-center">{title}</p>
        <Input
          className={cn('border-none shadow-none rounded-none z-10 text-center', {
            'print:hidden': timeValue === ''
          })}
          placeholder="Норма времени"
          value={timeValue}
          onChange={(e) => setTimeValue(e.target.value)}
          onBlur={onFocusOut('time')}
        />
        <div className="flex gap-0.5 justify-self-end print:hidden">
          {pos !== 1 && (
            <Button
              title="Переместить вверх"
              variant="outline"
              size="icon"
              className="[&_svg]:size-4 size-7"
              onClick={handleMoveUp}
            >
              <ArrowUp />
            </Button>
          )}
          {pos !== length && (
            <Button
              title="Переместить вниз"
              variant="outline"
              size="icon"
              className="[&_svg]:size-4 size-7"
              disabled={pos === length}
              onClick={handleMoveDown}
            >
              <ArrowDown />
            </Button>
          )}
          <Button
            title="Удалить"
            size="icon"
            className="[&_svg]:size-4 size-7"
            variant="destructive"
            onClick={handleDeleteItem}
          >
            <X />
          </Button>
        </div>
      </div>
      {!textAreaValue ? (
        <Button
          variant="outline"
          className="shadow-none w-full rounded-t-none print:hidden"
          onClick={() => setTextAreaValue('1.')}
        >
          Добавить описание
          <ListPlus />
        </Button>
      ) : (
        <Textarea
          className="rounded-none shadow-none rounded-b-lg [field-sizing:content] resize-none"
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
          onBlur={onFocusOut('description')}
        />
      )}
    </div>
  )
}
