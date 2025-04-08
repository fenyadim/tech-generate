import { Button } from '@/shared/ui'
import { techCardStore } from '@/store'
import { Trash2 } from 'lucide-react'
import { memo } from 'react'

interface DeleteCardButtonProps {
  idCard: string
}

export const DeleteCardButtonMemo = ({ idCard }: DeleteCardButtonProps) => {
  const handleDelete = (idCard: string) => () => {
    techCardStore.deleteCard(idCard)
  }

  return (
    <Button title="Удалить" variant="ghost" size="icon" onClick={handleDelete(idCard)}>
      <Trash2 className="text-red-600" />
    </Button>
  )
}

export const DeleteCardButton = memo(DeleteCardButtonMemo)
