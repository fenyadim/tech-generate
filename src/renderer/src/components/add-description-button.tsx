import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { processStore } from '@/store/processStore'
import _ from 'lodash'
import { ListPlus } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { FieldTextarea } from './field-textarea'

interface AddDescriptionButtonProps {
  id: string
  idParent: string
  description: string
}

export const AddDescriptionButton = ({ id, idParent, description }: AddDescriptionButtonProps) => {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    processStore.changeText(id, '', 'description', idParent)
  }, [])

  const handleClick = () => {
    ref.current?.focus()
    console.log(ref.current?.focus())
    processStore.changeText(id, '1.', 'description', idParent)
  }

  return (
    <>
      <Button
        variant="outline"
        className={cn('shadow-none w-full rounded-t-none print:hidden', {
          hidden: description
        })}
        onClick={handleClick}
      >
        Добавить описание
        <ListPlus />
      </Button>
      <FieldTextarea
        className={cn({ 'opacity-0 size-0 p-0': _.isEmpty(description) })}
        ref={ref}
        idParent={idParent}
        idProcess={id}
        initialValue={description}
      />
    </>
  )
}
