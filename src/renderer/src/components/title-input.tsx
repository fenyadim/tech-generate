import { useDebounce } from '@/shared/hooks/use-debounce'
import { Input, Label } from '@/shared/ui'
import { useTechActions, useTechTitle } from '@/store'
import { memo, useState } from 'react'

interface TitleInputProps {
  id: string
}

export const TitleInputMemo = ({ id }: TitleInputProps) => {
  const title = useTechTitle(id)
  const { changeTitle } = useTechActions()
  const [value, setValue] = useState(title)

  const debouncedChangeTitle = useDebounce((value) => {
    changeTitle(id, value as string)
  }, 300)

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    debouncedChangeTitle(newValue)
  }

  return (
    <>
      <Label className="print:hidden" htmlFor="title">
        Название и номер детали
      </Label>
      <Input
        id="title"
        className="text-xl print:hidden"
        value={value}
        onChange={onChangeTitle}
        data-testid="tech-card-title-input"
      />
      <h3 className="font-medium hidden print:block">{title}</h3>
    </>
  )
}

export const TitleInput = memo(TitleInputMemo)
