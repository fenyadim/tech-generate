import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui'
import { ProcessItem } from './process-item'

interface TechCardProps {
  title: string
  id: string
  onDelete: (id: string) => void
}

const mockProcess = [
  { title: 'Заготовка', time: '2.5' },
  { title: 'Проф.шлифовка', time: '1.5' },
  { title: 'Оптика', time: '1.5' },
  { title: 'Эл.эрозия' }
]

export const TechCard = ({ id, title, onDelete }: TechCardProps) => {
  const handleDelete = () => {
    onDelete(id)
  }

  return (
    <Card className="w-96 h-min">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="grid grid-cols-[0.3fr_2fr_1fr_90px] gap-2 justify-items-center px-2 *:font-medium">
          <p>№</p>
          <p>Процесс</p>
          <p>Норма</p>
        </div>
        {mockProcess.map(({ title, time }, index) => (
          <ProcessItem
            key={index}
            pos={index + 1}
            title={title}
            time={time}
            length={mockProcess.length}
          />
        ))}
      </CardContent>
      <CardFooter className="gap-3">
        <Button>Кнопка</Button>
        <Button variant="destructive" onClick={handleDelete}>
          Удалить
        </Button>
      </CardFooter>
    </Card>
  )
}
