import { Button } from '@/shared/ui'
import { useTechActions } from '@/store'
import { Minus, Plus } from 'lucide-react'

interface CountElementProps {
  id: string
  count: number
}

export const CountElement = ({ id, count }: CountElementProps) => {
  const { decrementCount, incrementCount } = useTechActions()

  return (
    <div>
      <h3 className="font-medium">
        Кол-во: <span className="hidden print:inline">{count}</span>
      </h3>
      <div className="flex items-center gap-2 print:hidden">
        <Button
          className="[&_svg]:size-4 size-7"
          disabled={count === 1}
          variant="outline"
          size="icon"
          onClick={() => decrementCount(id)}
        >
          <Minus />
        </Button>
        <p data-testid="tech-card-count">{count}</p>
        <Button
          className="[&_svg]:size-4 size-7"
          variant="outline"
          size="icon"
          onClick={() => incrementCount(id)}
        >
          <Plus />
        </Button>
      </div>
    </div>
  )
}
