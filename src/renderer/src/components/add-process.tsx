import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui'
import { useStore } from '@/store'
import { Plus } from 'lucide-react'
import { AddProcessGroup } from './add-process-group'

const blankProcess = ['Отрезная', 'Шлифовка', 'Слесарная']
const bladeProcces = ['Фрезерная', 'Токарная', 'Расточка', 'Фрезерная ЧПУ']
const gridingProcces = ['Кр.шлифовка', 'Проф.шлифовка', 'Оптика', 'Внутр.шлиф.', 'Xаузер']
const thermalProcces = ['Отжиг', 'Т.О']
const erosiveProcces = ['Эл.эрозия', 'Прошивка']

interface AddProcessProps {
  idParent: string
}

export const AddProcess = ({ idParent }: AddProcessProps) => {
  const { addProcess } = useStore()

  const handleAdd = (title: string) => {
    addProcess(title, idParent)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="rounded-full">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Выберите процесс</DialogTitle>
        </DialogHeader>
        <AddProcessGroup title="Заготовительная" group={blankProcess} onAdd={handleAdd} />
        <AddProcessGroup title="Лезвийная" group={bladeProcces} onAdd={handleAdd} />
        <AddProcessGroup title="Шлифовальная" group={gridingProcces} onAdd={handleAdd} />
        <AddProcessGroup title="Термическая" group={thermalProcces} onAdd={handleAdd} />
        <AddProcessGroup title="Эрозийная" group={erosiveProcces} onAdd={handleAdd} />
      </DialogContent>
    </Dialog>
  )
}
