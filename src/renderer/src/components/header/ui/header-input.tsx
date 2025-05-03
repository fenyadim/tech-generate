import { useDebounce } from '@/shared/hooks/use-debounce'
import { cn } from '@/shared/lib/utils'
import { Input, Label } from '@/shared/ui'
import { IFileData, useFileActions, useFileFields } from '@/store'
import { InputHTMLAttributes, memo, useCallback, useState } from 'react'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'id'>

interface HeaderInputProps extends HTMLInputProps {
  field: keyof IFileData
}

export const HeaderInputMemo = ({ field, ...props }: HeaderInputProps) => {
  const initialValue = useFileFields(field)
  const { changeValue } = useFileActions()
  const [value, setValue] = useState(initialValue)

  const debouncedChangeText = useDebounce((value) => {
    changeValue(value as string, field)
  }, 300)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    debouncedChangeText(newValue)
  }, [])

  return (
    <div>
      <Label htmlFor="author">Автор</Label>
      <Input
        id={field}
        className={cn('text-xl font-medium print:hidden', props.className)}
        value={value.length ? value : initialValue}
        onChange={onChange}
        data-testid={`header-${field}`}
        {...props}
      />
    </div>
  )
}

export const HeaderInput = memo(HeaderInputMemo)
