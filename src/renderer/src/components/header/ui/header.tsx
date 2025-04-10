import { Button, Input, Label } from '@/shared/ui'
import { totalSum } from '@/shared/utils/totalSum'
import { fileStore, processStore, techCardStore } from '@/store'
import { useCallback } from 'react'
import { EquipTitleInput } from './equip-title-input'
import { OpenButton } from './open-button'
import { PrintButton } from './print-button'
import { SaveButton } from './save-button'

export const Header = () => {
  const author = fileStore.author.use()
  const sumTime = totalSum(processStore.use(), techCardStore.use())

  const handleCreate = async () => {
    fileStore.assign({ title: '', author: '', path: '' })
    techCardStore.set([])
    processStore.set({})
  }

  const onChangeAuthor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    fileStore.author.set(e.target.value)
  }, [])

  return (
    <header className="mb-4 flex items-center justify-between p-2 border-b print:hidden">
      <div>
        <div className="flex items-end gap-2">
          <EquipTitleInput />
          <div>
            <Label htmlFor="author">Автор</Label>
            <Input
              id="author"
              className="text-xl font-medium print:hidden"
              value={author}
              onChange={onChangeAuthor}
            />
            <h3 className="font-medium hidden print:block">{author}</h3>
          </div>
        </div>
        <h3 className="font-medium">Общее время на всё: {sumTime}</h3>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleCreate}>Создать новую</Button>
        <PrintButton />
      </div>
      <div className="flex gap-2">
        <SaveButton mode="save" />
        <SaveButton mode="save-as" />
        <OpenButton />
      </div>
    </header>
  )
}
