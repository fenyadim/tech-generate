import { Button } from '@/shared/ui'
import { useTechActions } from '@/store'
import { Minus, Plus } from 'lucide-react'
import { memo } from 'react'

interface CountElementProps {
  id: string
  count: number
}

const CountElementMemo = ({ id, count }: CountElementProps) => {
  const { decrementCount, incrementCount } = useTechActions()

  return (
    <div>
      <h3 className="font-medium">
        Кол-во: <span className="hidden print:inline">{count}</span>
      </h3>
      <div className="flex items-center gap-1 print:hidden">
        <Button
          className="h-7 w-10 [&_svg]:size-3 gap-0"
          variant="outline"
          onClick={() => decrementCount(id, 10)}
        >
          <Minus />
          10
        </Button>
        <Button
          className="[&_svg]:size-4 size-7"
          disabled={count === 1}
          variant="outline"
          size="icon"
          onClick={() => decrementCount(id, 1)}
        >
          <Minus />
        </Button>
        <p data-testid="tech-card-count">{count}</p>
        <Button
          className="[&_svg]:size-4 size-7"
          variant="outline"
          size="icon"
          onClick={() => incrementCount(id, 1)}
        >
          <Plus />
        </Button>
        <Button
          className="h-7 w-10 [&_svg]:size-3 gap-0"
          variant="outline"
          onClick={() => incrementCount(id, 10)}
        >
          <Plus />
          10
        </Button>
      </div>
    </div>
  )
}

export const CountElement = memo(CountElementMemo)
