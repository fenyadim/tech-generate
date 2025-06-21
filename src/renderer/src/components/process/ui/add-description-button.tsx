import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { useProcessActions } from '@/store'
import _ from 'lodash'
import { ListPlus } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { FieldTextarea } from './field-textarea'

interface AddDescriptionButtonProps {
  id: string
  idParent: string
  description: string
}

export const AddDescriptionButton = ({ id, idParent, description }: AddDescriptionButtonProps) => {
  const { changeTextProcess } = useProcessActions(idParent)
  const ref = useRef<HTMLTextAreaElement>(null)

  const handleClick = useCallback(() => {
    ref.current?.focus()
    changeTextProcess(id, '1.', 'description')
  }, [changeTextProcess, id])

  return (
    <>
      <Button
        variant="outline"
        className={cn('shadow-none w-full rounded-t-none print:hidden', {
          hidden: description
        })}
        onClick={handleClick}
        data-testid="process-add-desc-btn"
      >
        Добавить описание
        <ListPlus />
      </Button>
      <FieldTextarea
        className={cn({ 'opacity-0 size-0 leading-0 p-0': _.isEmpty(description) })}
        ref={ref}
        idParent={idParent}
        idProcess={id}
        initialValue={description}
        data-testid="process-desc-input"
      />
    </>
  )
}
