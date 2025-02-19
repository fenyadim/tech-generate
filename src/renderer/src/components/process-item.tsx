import { cn } from '@/shared/lib/utils'
import { Button, Input, Textarea } from '@/shared/ui'
import { useStore } from '@/store'
import { FieldType, IProcessItem } from '@/store/processSlice'
import { ArrowDown, ArrowUp, ListPlus, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ProcessItemProps extends IProcessItem {
  parentId: string
  pos: number
  length: number
}

export const ProcessItem = ({
  id,
  parentId,
  pos,
  time = '',
  title,
  description = '',
  category = 0,
  length
}: ProcessItemProps) => {
  const { removeProcess, moveProcessDown, moveProcessUp, changeText } = useStore()
  const [timeValue, setTimeValue] = useState(time)
  const [textAreaValue, setTextAreaValue] = useState(description)
  const [categoryValue, setCategoryValue] = useState(category)

  const handleDeleteItem = () => {
    removeProcess(id, parentId)
  }

  const handleMoveDown = () => {
    moveProcessDown(pos - 1, parentId)
  }

  const handleMoveUp = () => {
    moveProcessUp(pos - 1, parentId)
  }

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value)
    // if (textAreaValue !== description && textAreaValue === ' ')
    // changeText(id, textAreaValue, 'description', parentId)
  }

  const onFocusOut = (field: FieldType) => () => {
    if (field === 'time' && timeValue !== time) changeText(id, timeValue, 'time', parentId)
    if (field === 'description' && textAreaValue !== description)
      changeText(id, textAreaValue, 'description', parentId)
    if (field === 'category' && categoryValue !== category)
      changeText(id, categoryValue, 'category', parentId)
  }

  return (
    <div>
      <div
        className={cn(
          'grid grid-cols-[0.3fr_2fr_1fr_1fr_90px] gap-2 px-2 items-center border border-b-0 rounded-t-lg print:grid-cols-[0.3fr_2fr_1fr_1fr]',
          {
            'print:rounded-b-lg print:border-b': description === ''
          }
        )}
      >
        <p className="text-right">{pos}.</p>
        <p className="align-middle text-center">{title}</p>
        <Input
          className={cn(
            'border-none shadow-none rounded-none z-10 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            {
              'print:hidden': timeValue === ''
            }
          )}
          placeholder="Норма времени"
          type="number"
          value={timeValue}
          onChange={(e) => setTimeValue(e.target.value)}
          onBlur={onFocusOut('time')}
        />
        <Input
          className={cn(
            'border-none shadow-none rounded-none z-10 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            {
              'print:hidden': categoryValue === 0
            }
          )}
          placeholder="Разряд"
          type="number"
          value={categoryValue}
          onChange={(e) => setCategoryValue(Number(e.target.value))}
          onBlur={onFocusOut('category')}
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
      {textAreaValue === '' ? (
        <AddNewDescription id={id} idParent={parentId} setText={setTextAreaValue} />
      ) : (
        <Textarea
          className="rounded-none shadow-none rounded-b-lg [field-sizing:content] resize-none"
          value={textAreaValue}
          onChange={onChangeTextArea}
          onBlur={onFocusOut('description')}
        />
      )}
    </div>
  )
}

const AddNewDescription = ({
  setText,
  id,
  idParent
}: {
  setText: (text: string) => void
  id: string
  idParent: string
}) => {
  const { changeText } = useStore()

  useEffect(() => {
    changeText(id, '', 'description', idParent)
  }, [])

  return (
    <Button
      variant="outline"
      className="shadow-none w-full rounded-t-none print:hidden"
      onClick={() => setText('1.')}
    >
      Добавить описание
      <ListPlus />
    </Button>
  )
}
