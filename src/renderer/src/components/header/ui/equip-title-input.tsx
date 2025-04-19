import { Input, Label } from '@/shared/ui'
import { useFileActions, useFileTitle } from '@/store/fileStore'
import { memo } from 'react'

const EquipTitleInputMemo = () => {
  const title = useFileTitle()
  const { changeValue } = useFileActions()

  return (
    <div>
      <Label htmlFor="title">Номер оснастки</Label>
      <Input
        id="title"
        className="text-xl font-medium print:hidden"
        value={title}
        onChange={(e) => changeValue(e.target.value, 'title')}
        placeholder="пример РА9260769"
        data-testid="header-title"
      />
    </div>
  )
}

export const EquipTitleInput = memo(EquipTitleInputMemo)
