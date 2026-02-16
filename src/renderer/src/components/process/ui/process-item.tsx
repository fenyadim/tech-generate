import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { IProcessItem, useProcessActions } from '@/store'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, X } from 'lucide-react'
import { memo } from 'react'
import { AddDescriptionButton } from './add-description-button'
import { FieldInput } from './field-input'

interface ProcessItemProps extends IProcessItem {
  idParent: string
  pos: number
}

const ProcessItemMemo = ({
  id,
  idParent,
  pos,
  time = '',
  title,
  description = '',
  category = 0
}: ProcessItemProps) => {
  const { removeProcess } = useProcessActions(idParent)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const handleDeleteItem = () => {
    removeProcess(id)
  }

  return (
    <div ref={setNodeRef} style={style} className={cn({ 'opacity-50': isDragging })}>
      <div
        className={cn(
          'grid grid-cols-[0.3fr_3fr_1fr_1fr_40px] gap-1 px-2 items-center border border-b-0 rounded-t-lg print:grid-cols-[0.3fr_2fr_1fr_1fr]'
        )}
        data-testid="process-item"
      >
        <div className="flex items-center gap-1 justify-end">
          <div
            {...attributes}
            {...listeners}
            className="flex cursor-grab active:cursor-grabbing touch-none print:hidden p-1 -m-1 rounded hover:bg-muted/50"
            title="Перетащить"
          >
            <GripVertical className="size-4 text-muted-foreground" />
          </div>
          <p className="text-right">{pos}.</p>
        </div>
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
