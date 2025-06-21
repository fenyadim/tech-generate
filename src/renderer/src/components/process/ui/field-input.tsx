import { cn } from '@/shared/lib/utils'
import { Input } from '@/shared/ui'
import { FieldType, useProcessActions } from '@/store'
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
  const { changeTextProcess } = useProcessActions(idParent)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    changeTextProcess(idProcess, newValue, fieldName)
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
