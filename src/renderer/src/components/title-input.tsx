import { Input, Label } from '@/shared/ui'
import { useTechActions, useTechTitle } from '@/store'
import { memo } from 'react'

interface TitleInputProps {
  id: string
}

export const TitleInputMemo = ({ id }: TitleInputProps) => {
  const title = useTechTitle(id)
  const { changeTitle } = useTechActions()

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeTitle(id, e.target.value)
  }

  return (
    <>
      <Label className="print:hidden" htmlFor="title">
        Название и номер детали
      </Label>
      <Input
        id="title"
        className="text-xl print:hidden"
        value={title}
        onChange={onChangeTitle}
        data-testid="tech-card-title-input"
      />
      <h3 className="font-medium hidden print:block">{title}</h3>
    </>
  )
}

export const TitleInput = memo(TitleInputMemo)
