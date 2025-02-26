import { Input, Label } from '@/shared/ui'
import { fileStore } from '@/store'
import { memo } from 'react'

const EquipTitleInputMemo = () => {
  const title = fileStore.title.use()

  return (
    <div>
      <Label htmlFor="title">Номер оснастки</Label>
      <Input
        id="title"
        className="text-xl font-medium print:hidden"
        value={title}
        onChange={(e) => fileStore.title.set(e.target.value)}
        placeholder="пример РА9260769"
      />
    </div>
  )
}

export const EquipTitleInput = memo(EquipTitleInputMemo)
