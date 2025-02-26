import { cn } from '@/shared/lib/utils'
import { Textarea } from '@/shared/ui'
import { processStore } from '@/store/processStore'
import { ComponentProps, forwardRef, ReactElement, Ref } from 'react'

interface FieldTextareaProps<T> extends ComponentProps<'textarea'> {
  initialValue: T
  idProcess: string
  idParent: string
}

const FieldTextareaWithoutRef = <T extends string | number>(
  { initialValue, idProcess, idParent, ...props }: FieldTextareaProps<T>,
  ref: Ref<HTMLTextAreaElement>
) => {
  //TODO: Добавить debounce
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    processStore.changeText(idProcess, e.target.value, 'description', idParent)
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

export const FieldTextarea = forwardRef(FieldTextareaWithoutRef) as <T extends string | number>(
  props: FieldTextareaProps<T> & { ref?: Ref<HTMLTextAreaElement> }
) => ReactElement
