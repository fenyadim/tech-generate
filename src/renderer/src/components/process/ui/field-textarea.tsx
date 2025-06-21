import { cn } from '@/shared/lib/utils'
import { Textarea } from '@/shared/ui'
import { useProcessActions } from '@/store'
import { ComponentProps, forwardRef, Ref } from 'react'

interface FieldTextareaProps extends ComponentProps<'textarea'> {
  initialValue: string
  idProcess: string
  idParent: string
}

const FieldTextareaWithoutRef = (
  { initialValue, idProcess, idParent, ...props }: FieldTextareaProps,
  ref: Ref<HTMLTextAreaElement>
) => {
  const { changeTextProcess } = useProcessActions(idParent)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    changeTextProcess(idProcess, newValue, 'description')
  }

  return (
    <Textarea
      {...props}
      ref={ref}
      className={cn(
        props.className,
        'rounded-none border-border shadow-none rounded-b-lg print:border-t-0 [field-sizing:content] resize-none print:py-1 print:text-sm'
      )}
      value={initialValue}
      onChange={onChange}
    />
  )
}

export const FieldTextarea = forwardRef(FieldTextareaWithoutRef)
