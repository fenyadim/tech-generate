import { useDebounce } from '@/shared/hooks/use-debounce'
import { cn } from '@/shared/lib/utils'
import { Textarea } from '@/shared/ui'
import { useProcessActions } from '@/store'
import { ComponentProps, forwardRef, Ref, useEffect, useState } from 'react'

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
  const [value, setValue] = useState('')

  useEffect(() => setValue(initialValue), [initialValue])

  const debouncedChangeText = useDebounce((value) => {
    changeTextProcess(idProcess, value as string, 'description')
  }, 300)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)
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

export const FieldTextarea = forwardRef(FieldTextareaWithoutRef)
