import { Button } from '@/shared/ui'
import { processStore } from '@/store/processSlice'
import { ListPlus } from 'lucide-react'
import { useEffect } from 'react'

interface AddDescriptionButtonProps {
  id: string
  idParent: string
}

export const AddDescriptionButton = ({ id, idParent }: AddDescriptionButtonProps) => {
  useEffect(() => {
    processStore.changeText(id, '', 'description', idParent)
  }, [])

  const handleClick = () => {
    processStore.changeText(id, '1.', 'description', idParent)
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
