import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui'

interface TechCardProps {
  title: string
  id: string
  onDelete: (id: string) => void
}

export const TechCard = ({ id, title, onDelete }: TechCardProps) => {
  const handleDelete = () => {
    onDelete(id)
  }

  return (
    <Card className="w-min h-min">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div></div>
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
