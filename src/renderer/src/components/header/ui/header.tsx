import { Button, Input, Label } from '@/shared/ui'
import { totalSum } from '@/shared/utils/totalSum'
import {
  useFileActions,
  useFileAuthor,
  useProcessActions,
  useProcessItems,
  useTechActions,
  useTechCards
} from '@/store'
import { useCallback } from 'react'
import { EquipTitleInput } from './equip-title-input'
import { OpenButton } from './open-button'
import { PrintButton } from './print-button'
import { SaveButton } from './save-button'

export const Header = () => {
  const author = useFileAuthor()
  const { changeValue, clearFileData } = useFileActions()
  const techCards = useTechCards()
  const { clearCards } = useTechActions()
  const processItems = useProcessItems()
  const { setProcess } = useProcessActions('')

  const sumTime = totalSum(processItems, techCards)

  const handleCreate = async () => {
    clearFileData()
    clearCards()
    setProcess({})
  }

  const onChangeAuthor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.target.value, 'author')
  }, [])

  return (
    <header className="fixed z-20 bg-white top-0 left-0 right-0 flex items-center justify-between p-2 px-4 border-b print:hidden">
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
              data-testid="header-author"
            />
            <h3 className="font-medium hidden print:block" data-testid="header-author">
              {author}
            </h3>
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
