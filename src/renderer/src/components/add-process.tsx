import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui'
import { processStore } from '@/store/processStore'
import { Plus } from 'lucide-react'
import { AddProcessGroup } from './add-process-group'

const blankProcess = ['Отрезная', 'Шлифовка', 'Слесарная']
const bladeProcess = ['Фрезерная', 'Токарная', 'Расточка', 'Фрезерная ЧПУ']
const gridingProcess = ['Кр.шлифовка', 'Проф.шлифовка', 'Оптика', 'Внутр.шлиф.', 'Xаузер']
const thermalProcess = ['Отжиг', 'Т.О']
const erosiveProcess = ['Эл.эрозия', 'Прошивка']
const controlProcess = ['Контроль']

interface AddProcessProps {
  idParent: string
}

export const AddProcess = ({ idParent }: AddProcessProps) => {
  const handleAdd = (title: string) => {
    processStore.add(title, idParent)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Добавить процесс" variant={'outline'} className="rounded-full print:hidden">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Выберите процесс</DialogTitle>
        </DialogHeader>
        <AddProcessGroup title="Заготовительная" group={blankProcess} onAdd={handleAdd} />
        <AddProcessGroup title="Лезвийная" group={bladeProcess} onAdd={handleAdd} />
        <AddProcessGroup title="Шлифовальная" group={gridingProcess} onAdd={handleAdd} />
        <AddProcessGroup title="Термическая" group={thermalProcess} onAdd={handleAdd} />
        <AddProcessGroup title="Эрозийная" group={erosiveProcess} onAdd={handleAdd} />
        <AddProcessGroup title="Контроль" group={controlProcess} onAdd={handleAdd} />
      </DialogContent>
    </Dialog>
  )
}
