import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/ui'
import { useTechActions } from '@/store'
import { ArrowDown } from 'lucide-react'

interface IToggleVisionButtonProps {
  disabled: boolean
}

export const ToggleVisionButton = ({ disabled }: IToggleVisionButtonProps) => {
  const { setVisible } = useTechActions()

  const handleClick = (isVisible: boolean) => () => {
    setVisible(isVisible)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" disabled={disabled}>
          <ArrowDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleClick(true)}>Показать все</DropdownMenuItem>
        <DropdownMenuItem onClick={handleClick(false)}>Скрыть все</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
