import { cn } from '@/shared/lib/utils'
import { Input } from '@/shared/ui'
import { useStore } from '@/store'
import { FieldType } from '@/store/processSlice'
import { ComponentProps } from 'react'

interface FieldInputProps<T> extends ComponentProps<'input'> {
  initialValue: T
  fieldName: FieldType
  idProcess: string
  idParent: string
}

export const FieldInput = <T extends string | number>({
  initialValue,
  fieldName,
  idProcess,
  idParent,
  ...props
}: FieldInputProps<T>) => {
  const { changeText } = useStore()

  //TODO: Добавить debounce
  // const debounced = debounce(
  //   (e: React.ChangeEvent<HTMLInputElement>) =>
  //     changeText(idProcess, e.target.value as T, fieldName, idParent),
  //   500
  // )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    changeText(idProcess, e.target.value as T, fieldName, idParent)

  return (
    <Input
      {...props}
      className={cn(
        'border-none shadow-none rounded-none z-10 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-1',
        {
          'print:hidden':
            typeof initialValue === 'number' ? initialValue === 0 : initialValue === ''
        }
      )}
      value={initialValue}
      onChange={onChange}
    />
  )
}
