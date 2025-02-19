import { Textarea } from '@/shared/ui'
import { useStore } from '@/store'
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
  const { changeText } = useStore()

  //TODO: Добавить debounce
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeText(idProcess, e.target.value as T, 'description', idParent)
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
