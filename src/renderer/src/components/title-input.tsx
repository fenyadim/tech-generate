import { Input, Label } from '@/shared/ui'
import { techCardStore } from '@/store'
import { memo } from 'react'

interface TitleInputProps {
  id: string
}

export const TitleInputMemo = ({ id }: TitleInputProps) => {
  const title = techCardStore.use((item) => item.find((item) => item.id === id)?.title)

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    techCardStore.changeTitle(id, e.target.value)
  }

  return (
    <>
      <Label className="print:hidden" htmlFor="title">
        Название и номер детали
      </Label>
      <Input id="title" className="text-xl print:hidden" value={title} onChange={onChangeTitle} />
      <h3 className="font-medium hidden print:block">{title}</h3>
    </>
  )
}

export const TitleInput = memo(TitleInputMemo)
