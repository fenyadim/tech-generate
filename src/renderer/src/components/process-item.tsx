import { Button, Input } from '@/shared/ui'
import { ArrowDown, ArrowUp, X } from 'lucide-react'

interface ProcessItemProps {
  pos: number
  title: string
  time?: string
  length: number
}

export const ProcessItem = ({ pos, time = '', title, length }: ProcessItemProps) => {
  return (
    <div className="border rounded-full">
      <div className="grid grid-cols-[0.3fr_2fr_1fr_90px] gap-2 items-center px-2">
        <p className="text-right">{pos}.</p>
        <p className="align-middle">{title}</p>
        <Input
          className="border-none shadow-none rounded-none"
          placeholder="Норма времени"
          value={time}
        />
        <div className="flex gap-0.5 justify-self-end">
          {pos !== 1 && (
            <Button size="icon" className="[&_svg]:size-4 size-7">
              <ArrowUp />
            </Button>
          )}
          {pos !== length && (
            <Button size="icon" className="[&_svg]:size-4 size-7" disabled={pos === length}>
              <ArrowDown />
            </Button>
          )}
          <Button size="icon" className="[&_svg]:size-4 size-7" variant="destructive">
            <X />
          </Button>
        </div>
      </div>
    </div>
  )
}
