import { Button } from '@/shared/ui'
import { techCardStore } from '@/store'
import { Eye, EyeClosed } from 'lucide-react'

interface IShowButton {
  idCard: string
  isVisible: boolean
}

export const ShowButton = ({ idCard, isVisible }: IShowButton) => {
  const title = isVisible ? 'Скрыть при печати' : 'Показать при печати'

  const handleVisible = () => {
    techCardStore.toggleVisible(idCard)
  }

  return (
    <Button variant="ghost" title={title} size="icon" onClick={handleVisible}>
      {isVisible ? <EyeClosed /> : <Eye />}
    </Button>
  )
}
