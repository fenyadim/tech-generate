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
  description,
  length
}: ProcessItemProps) => {
  const { removeProcess, moveProcessDown, moveProcessUp } = useStore()
  const [value, setValue] = useState(time)
  const [textAreaValue, setTextAreaValue] = useState(description)

  const handleDeleteItem = () => {
    removeProcess(id, parentId)
  }

  const handleMoveDown = () => {
    moveProcessDown(parentId, pos - 1)
  }

  const handleMoveUp = () => {
    moveProcessUp(parentId, pos - 1)
  }

  return (
    <div>
      <div className="grid grid-cols-[0.3fr_2fr_1fr_90px] gap-2 px-2 items-center border border-b-0 rounded-t-lg">
        <p className="text-right">{pos}.</p>
        <p className="align-middle text-center">{title}</p>
        <Input
          className="border-none shadow-none rounded-none z-10"
          placeholder="Норма времени"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex gap-0.5 justify-self-end">
          {pos !== 1 && (
            <Button
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
          className="shadow-none w-full rounded-t-none"
          onClick={() => setTextAreaValue('1.')}
        >
          Добавить описание
          <ListPlus />
        </Button>
      ) : (
        <Textarea
          className="rounded-none shadow-none rounded-b-lg"
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
        />
      )}
    </div>
  )
}
