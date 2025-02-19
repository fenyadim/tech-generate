import { Button } from '@/shared/ui'
import { useStore } from '@/store'
import { ListPlus } from 'lucide-react'
import { useEffect } from 'react'

interface AddDescriptionButtonProps {
  id: string
  idParent: string
}

export const AddDescriptionButton = ({ id, idParent }: AddDescriptionButtonProps) => {
  const { changeText } = useStore()

  useEffect(() => {
    changeText(id, '', 'description', idParent)
  }, [])

  const handleClick = () => {
    changeText(id, '1.', 'description', idParent)
  }

  return (
    <Button
      variant="outline"
      className="shadow-none w-full rounded-t-none print:hidden"
      onClick={handleClick}
    >
      Добавить описание
      <ListPlus />
    </Button>
  )
}
