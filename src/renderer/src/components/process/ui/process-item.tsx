import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { IProcessItem, useProcessActions } from '@/store'
import { ArrowDown, ArrowUp, X } from 'lucide-react'
import { memo } from 'react'
import { AddDescriptionButton } from './add-description-button'
import { FieldInput } from './field-input'

interface ProcessItemProps extends IProcessItem {
  idParent: string
  pos: number
  length: number
}

const ProcessItemMemo = ({
  id,
  idParent,
  pos,
  time = '',
  title,
  description = '',
  category = 0,
  length
}: ProcessItemProps) => {
  const { removeProcess, moveDownProcess, moveUpProcess } = useProcessActions(idParent)

  const handleDeleteItem = () => {
    removeProcess(id)
  }

  const handleMoveDown = () => {
    moveDownProcess(pos - 1)
  }

  const handleMoveUp = () => {
    moveUpProcess(pos - 1)
  }

  return (
    <div>
      <div
        className={cn(
          'grid grid-cols-[0.3fr_3fr_1fr_0.5fr_90px] gap-1 px-2 items-center border border-b-0 rounded-t-lg print:grid-cols-[0.3fr_2fr_1fr_1fr]'
        )}
        data-testid="process-item"
      >
        <p className="text-right">{pos}.</p>
        <p className="align-middle text-center text-ellipsis" data-testid="process-title">
          {title}
        </p>
        <FieldInput
          fieldName="time"
          initialValue={time}
          idProcess={id}
          idParent={idParent}
          placeholder="Норма времени"
          data-testid="process-norm-time-input"
        />
        <FieldInput
          fieldName="category"
          initialValue={category}
          idProcess={id}
          idParent={idParent}
          min={0}
          max={5}
          type="number"
          data-testid="process-category-input"
        />
        <div className="flex gap-0.5 justify-self-end print:hidden">
          {pos !== 1 && (
            <Button
              title="Переместить вверх"
              variant="outline"
              size="icon"
              className="[&_svg]:size-4 size-7"
              onClick={handleMoveUp}
              data-testid="process-up-btn"
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
              data-testid="process-down-btn"
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
            data-testid="process-delete-btn"
          >
            <X />
          </Button>
        </div>
      </div>
      <div
        className={cn('hidden border print:block p-2 print:py-1', {
          'rounded-b-lg border-b': description === ''
        })}
      >
        <p className="font-medium opacity-50">Исполнитель</p>
      </div>
      <AddDescriptionButton id={id} idParent={idParent} description={description} />
    </div>
  )
}

export const ProcessItem = memo(ProcessItemMemo)
