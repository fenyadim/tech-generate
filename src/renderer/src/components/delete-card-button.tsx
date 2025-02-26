import { Button } from '@/shared/ui'
import { techCardStore } from '@/store'
import { Trash2 } from 'lucide-react'
import { memo } from 'react'

interface DeleteCardButtonProps {
  id: string
}

export const DeleteCardButtonMemo = ({ id }: DeleteCardButtonProps) => {
  const handleDelete = (id: string) => () => {
    techCardStore.deleteCard(id)
  }

  return (
    <Button title="Удалить" variant="ghost" size="icon" onClick={handleDelete(id)}>
      <Trash2 className="text-red-600" />
    </Button>
  )
}

export const DeleteCardButton = memo(DeleteCardButtonMemo)
