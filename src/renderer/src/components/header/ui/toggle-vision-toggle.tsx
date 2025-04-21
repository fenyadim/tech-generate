import { Button } from '@/shared/ui/button'
import { useTechActions } from '@/store'

export const ToggleVisionButton = () => {
  const { setVisible } = useTechActions()

  const handleClick = (isVisible: boolean) => () => {
    setVisible(isVisible)
  }

  return (
    <>
      <Button variant="ghost" size="sm" onClick={handleClick(true)}>
        Показать все
      </Button>
      <Button variant="ghost" size="sm" onClick={handleClick(false)}>
        Скрыть все
      </Button>
    </>
  )
}
