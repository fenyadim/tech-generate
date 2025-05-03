import { Button } from '@/shared/ui'
import { useTechActions } from '@/store'
import { Eye, EyeClosed } from 'lucide-react'
import { memo } from 'react'

interface IShowButton {
  idCard: string
  isVisible: boolean
}

export const ShowButtonMemo = ({ idCard, isVisible }: IShowButton) => {
  const { toggleVisible } = useTechActions()

  const title = isVisible ? 'Скрыть при печати' : 'Показать при печати'

  const handleVisible = () => {
    toggleVisible(idCard)
  }

  return (
    <Button variant="ghost" title={title} size="icon" onClick={handleVisible}>
      {isVisible ? <EyeClosed /> : <Eye />}
    </Button>
  )
}

export const ShowButton = memo(ShowButtonMemo)
