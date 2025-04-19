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
import { memo, useCallback, useEffect, useRef } from 'react'
import { AddProcessGroup } from './add-process-group'

const blankProcess = ['Отрезная', 'Шлифовка', 'Слесарная', 'Заготовка']
const bladeProcess = ['Фрезерная', 'Токарная', 'Коорд.раст.', 'Фрезерная ЧПУ']
const gridingProcess = ['Кр.шлифовка', 'Пл.шлифовка', 'Оптика', 'Внутр.шлиф.', 'Xаузер']
const thermalProcess = ['Отжиг', 'Т.О']
const erosiveProcess = ['Эл.эрозия', 'Прошивка']
const controlProcess = ['Контроль']

interface AddProcessProps {
  idParent: string
}

const AddProcessMemo = ({ idParent }: AddProcessProps) => {
  const { addProcess } = useProcessActions(idParent)
  const testRef = useRef<HTMLButtonElement>(null)
  const handleAdd = useCallback((title: string) => {
    addProcess(title)
  }, [])

  useEffect(() => {
    if (testRef.current) {
      console.log('CLICK')
      testRef.current.click()
    }
  }, [testRef])

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
        <DialogClose ref={testRef} data-testid="modal-close-btn">
          Test
        </DialogClose>
        <DialogDescription className="hidden">Выберите процесс</DialogDescription>
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

export const AddProcess = memo(AddProcessMemo)
