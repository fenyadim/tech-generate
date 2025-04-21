import { useDebounce } from '@/shared/hooks/use-debounce'
import { cn } from '@/shared/lib/utils'
import { Textarea } from '@/shared/ui'
import { useProcessActions } from '@/store'
import { ComponentProps, forwardRef, ReactElement, Ref, useState } from 'react'

interface FieldTextareaProps<T> extends ComponentProps<'textarea'> {
  initialValue: T
  idProcess: string
  idParent: string
}

const FieldTextareaWithoutRef = <T extends string | number>(
  { initialValue, idProcess, idParent, ...props }: FieldTextareaProps<T>,
  ref: Ref<HTMLTextAreaElement>
) => {
  const { changeTextProcess } = useProcessActions(idParent)
  const [value, setValue] = useState(initialValue)

  const debouncedChangeText = useDebounce((value) => {
    changeTextProcess(idProcess, value as string, 'description')
  }, 300)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue as T)
    debouncedChangeText(newValue)
  }

  return (
    <Textarea
      {...props}
      ref={ref}
      className={cn(
        props.className,
        'rounded-none border-border shadow-none rounded-b-lg print:border-t-0 [field-sizing:content] resize-none print:py-1 print:text-sm'
      )}
      value={value}
      onChange={onChange}
    />
  )
}

export const FieldTextarea = forwardRef(FieldTextareaWithoutRef) as <T extends string | number>(
  props: FieldTextareaProps<T> & { ref?: Ref<HTMLTextAreaElement> }
) => ReactElement
