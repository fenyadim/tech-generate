import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { useTechActions, useTechCards } from '@/store'
import { Plus } from 'lucide-react'
import { TechCard } from './tech-card'

export const TechCardWrapper = () => {
  const techCards = useTechCards()
  const { createCard } = useTechActions()

  const handleCreate = () => {
    createCard()
  }

  return (
    <div className="relative grid grid-cols-(--auto-fill) grid-flow-dense gap-4 h-full pt-28 p-4 print:grid-cols-2 print:p-0">
      {techCards.map(({ title, id, count, isVisibleForPrint }) => (
        <div
          key={id}
          className={cn('break-inside-avoid', {
            'print:hidden': !isVisibleForPrint,
            'print:block ': isVisibleForPrint
          })}
        >
          <TechCard
            id={String(id)}
            title={title}
            count={count}
            isVisibleForPrint={isVisibleForPrint}
          />
        </div>
      ))}
      <Button
        variant="outline"
        className="h-full max-h-40 flex-1 print:hidden"
        onClick={handleCreate}
        data-testid="add-tech-card-button"
      >
        Добавить новую
        <Plus />
      </Button>
    </div>
  )
}
