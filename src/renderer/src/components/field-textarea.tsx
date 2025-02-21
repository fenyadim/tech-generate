import { Textarea } from '@/shared/ui'
import { processStore } from '@/store/processStore'
import { ComponentProps } from 'react'

interface FieldTextareaProps<T> extends ComponentProps<'textarea'> {
  initialValue: T
  idProcess: string
  idParent: string
}

export const FieldTextarea = <T extends string | number>({
  initialValue,
  idProcess,
  idParent,
  ...props
}: FieldTextareaProps<T>) => {
  //TODO: Добавить debounce
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    processStore.changeText(idProcess, e.target.value, 'description', idParent)
  }

  return (
    <Textarea
      {...props}
      className="rounded-none border-border shadow-none rounded-b-lg print:border-t-0 [field-sizing:content] resize-none"
      value={initialValue}
      onChange={onChange}
    />
  )
}
