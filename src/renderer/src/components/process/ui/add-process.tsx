import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui'
import { useProcessActions } from '@/store'
import { Plus } from 'lucide-react'
import { memo, useCallback } from 'react'
import { processList } from '../lib/constants'
import { AddProcessGroup } from './add-process-group'

interface AddProcessProps {
  idParent: string
}

const AddProcessMemo = ({ idParent }: AddProcessProps) => {
  const { addProcess } = useProcessActions(idParent)
  const handleAdd = useCallback((title: string) => {
    addProcess(title)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="Добавить процесс"
          variant={'outline'}
          className="rounded-full print:hidden"
          data-testid="add-process-btn"
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Выберите процесс</DialogTitle>
        </DialogHeader>
        <DialogClose
          className="opacity-0 absolute pointer-events-auto size-1"
          data-testid="modal-close-btn"
        />
        <DialogDescription className="hidden">Выберите процесс</DialogDescription>
        {processList.map(({ title, group }) => (
          <AddProcessGroup key={title} title={title} group={group} onAdd={handleAdd} />
        ))}
      </DialogContent>
    </Dialog>
  )
}

export const AddProcess = memo(AddProcessMemo)
