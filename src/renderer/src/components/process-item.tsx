import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { IProcessItem, processStore } from '@/store/processSlice'
import { ArrowDown, ArrowUp, X } from 'lucide-react'
import { AddDescriptionButton } from './add-description-button'
import { FieldInput } from './field-input'
import { FieldTextarea } from './field-textarea'

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
  const handleDeleteItem = () => {
    processStore.remove(id, parentId)
  }

  const handleMoveDown = () => {
    processStore.moveDown(pos - 1, parentId)
  }

  const handleMoveUp = () => {
    processStore.moveUp(pos - 1, parentId)
  }

  return (
    <div>
      <div
        className={cn(
          'grid grid-cols-[0.3fr_3fr_1fr_0.5fr_90px] gap-1 px-2 items-center border border-b-0 rounded-t-lg print:grid-cols-[0.3fr_2fr_1fr_1fr]'
        )}
      >
        <p className="text-right">{pos}.</p>
        <p className="align-middle text-center text-ellipsis">{title}</p>
        <FieldInput
          fieldName="time"
          initialValue={time}
          idProcess={id}
          idParent={parentId}
          placeholder="Норма времени"
        />
        <FieldInput
          fieldName="category"
          initialValue={category}
          idProcess={id}
          idParent={parentId}
          min={0}
          max={5}
          type="number"
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
      <div
        className={cn('hidden border print:block p-2', {
          'rounded-b-lg border-b': description === ''
        })}
      >
        <p className="font-medium opacity-50">Исполнитель</p>
      </div>
      {description === '' ? (
        <AddDescriptionButton id={id} idParent={parentId} />
      ) : (
        <FieldTextarea idParent={parentId} idProcess={id} initialValue={description} />
      )}
    </div>
  )
}
