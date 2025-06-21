import { Button } from '@/shared/ui'
import { totalSum } from '@/shared/utils/totalSum'
import {
  useFileActions,
  useProcessActions,
  useProcessItems,
  useTechActions,
  useTechCards
} from '@/store'
import { useCallback, useMemo } from 'react'
import { HeaderInput } from './header-input'
import { OpenButton } from './open-button'
import { PrintButton } from './print-button'
import { SaveButton } from './save-button'
import { ToggleVisionButton } from './toggle-vision-toggle'

export const Header = () => {
  const { clearFileData } = useFileActions()
  const techCards = useTechCards()
  const { clearCards } = useTechActions()
  const processItems = useProcessItems()
  const { setProcess } = useProcessActions('')

  const sumTime = useMemo(() => totalSum(processItems, techCards), [processItems, techCards])

  const handleCreate = useCallback(async () => {
    clearFileData()
    clearCards()
    setProcess({})
  }, [])

  return (
    <header className="fixed z-20 bg-white top-0 left-0 right-0 flex items-center justify-between p-2 px-4 border-b print:hidden">
      <div>
        <div className="flex items-end gap-2">
          <HeaderInput field="title" label="Номер оснастки" placeholder="пример РА9260769" />
          <HeaderInput field="author" label="Автор" />
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
        <ToggleVisionButton disabled={techCards.length === 0} />
      </div>
    </header>
  )
}
