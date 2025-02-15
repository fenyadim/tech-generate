import { Button, Card, CardContent } from '@/shared/ui'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { AddProcessGroup } from './add-process-group'

const blankProcess = ['Отрезная', 'Шлифовка', 'Фрезеровка']
const bladeProcces = ['Фрезерная', 'Токарная', 'Расточка', 'Фрезерная ЧПУ']
const gridingProcces = ['Кр.шлифовка', 'Проф.шлифовка', 'Оптика', 'Внутр.шлиф.', 'Xаузер']
const thermalProcces = ['Отжиг', 'Т.О']
const erosiveProcces = ['Эл.эрозия', 'Прошивка']

interface AddProcessProps {
  onAdd: (title: string) => void
}

export const AddProcess = ({ onAdd }: AddProcessProps) => {
  const [editMode, setEditMode] = useState(false)

  const handleAdd = () => {
    setEditMode(false)
    return onAdd
  }

  return (
    <>
      {!editMode ? (
        <Button variant={'outline'} className="rounded-full" onClick={() => setEditMode(true)}>
          <Plus />
        </Button>
      ) : (
        <Card>
          <CardContent className="flex flex-col gap-3 p-2">
            <AddProcessGroup title="Заготовительные" group={blankProcess} onAdd={handleAdd} />
            <AddProcessGroup title="Лезвийная" group={bladeProcces} onAdd={handleAdd} />
            <AddProcessGroup title="Шлифовальная" group={gridingProcces} onAdd={handleAdd} />
            <AddProcessGroup title="Термическая" group={thermalProcces} onAdd={handleAdd} />
            <AddProcessGroup title="Эрозийная" group={erosiveProcces} onAdd={handleAdd} />
          </CardContent>
        </Card>
      )}
    </>
  )
}
