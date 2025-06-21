import { cn } from '@/shared/lib/utils'
import { Input, Label } from '@/shared/ui'
import { IFileData, useFileActions, useFileFields } from '@/store'
import { InputHTMLAttributes, memo, useCallback } from 'react'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'id'>

interface HeaderInputProps extends HTMLInputProps {
  field: keyof IFileData
  label: string
}

export const HeaderInputMemo = ({ field, label, ...props }: HeaderInputProps) => {
  const initialValue = useFileFields(field)
  const { changeValue } = useFileActions()

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    changeValue(newValue, field)
  }, [])

  return (
    <div>
      <Label htmlFor={field}>{label}</Label>
      <Input
        id={field}
        className={cn('text-xl font-medium print:hidden', props.className)}
        value={initialValue}
        onChange={onChange}
        data-testid={`header-${field}`}
        {...props}
      />
    </div>
  )
}

export const HeaderInput = memo(HeaderInputMemo)
