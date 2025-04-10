import { cn } from '@/shared/lib/utils'
import { Input } from '@/shared/ui'
import { FieldType, processStore } from '@/store/processStore'
import { ComponentProps, memo } from 'react'

interface FieldInputProps<T> extends ComponentProps<'input'> {
  initialValue: T
  fieldName: FieldType
  idProcess: string
  idParent: string
}

export const FieldInputMemo = <T extends string | number>({
  initialValue,
  fieldName,
  idProcess,
  idParent,
  type,
  ...props
}: FieldInputProps<T>) => {
  //TODO: Добавить debounce
  // const debounced = debounce(
  //   (e: React.ChangeEvent<HTMLInputElement>) =>
  //     changeText(idProcess, e.target.value as T, fieldName, idParent),
  //   500
  // )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processStore.changeText(idProcess, e.target.value, fieldName, idParent)
  }

  return (
    <Input
      {...props}
      className={cn(
        'border-none shadow-none rounded-none z-10 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-1 print:py-1 print:h-min print:text-sm',
        {
          'print:hidden': type === 'number' ? initialValue === 0 : initialValue === ''
        }
      )}
      type={type}
      value={initialValue}
      onChange={onChange}
    />
  )
}

export const FieldInput = memo(FieldInputMemo)
