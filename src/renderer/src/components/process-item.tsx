import { Button, Input } from '@/shared/ui'
import { useStore } from '@/store'
import { ArrowDown, ArrowUp, X } from 'lucide-react'
import { useState } from 'react'

interface ProcessItemProps {
  id: string
  parentId: string
  pos: number
  title: string
  time?: string
  length: number
}

export const ProcessItem = ({ id, parentId, pos, time = '', title, length }: ProcessItemProps) => {
  const { removeProcess, moveProcessDown, moveProcessUp } = useStore()
  const [value, setValue] = useState(time)

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
    <div className="border rounded-full">
      <div className="grid grid-cols-[0.3fr_2fr_1fr_90px] gap-2 items-center px-2">
        <p className="text-right">{pos}.</p>
        <p className="align-middle text-center">{title}</p>
        <Input
          className="border-none shadow-none rounded-none"
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
    </div>
  )
}
