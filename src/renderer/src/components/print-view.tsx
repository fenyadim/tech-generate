import { useIsPrintMode } from '@/shared/hooks/useIsPrintMode'
import { halfArray } from '@/shared/utils/halfArray'
import { ITechCard } from '@/store'
import { TechCard } from './tech-card'

interface IPrintView {
  techCards: ITechCard[]
}

export const PrintView = ({ techCards }: IPrintView) => {
  const isPrintMode = useIsPrintMode()

  return (
    isPrintMode && (
      <div className="hidden print:grid grid-cols-2 gap-2">
        {halfArray(techCards).map((item, id) => (
          <div className="hidden print:flex flex-col gap-2 break-inside-avoid" key={id}>
            {item.map(({ title, id, count, isVisibleForPrint }) => (
              <TechCard
                id={String(id)}
                title={title}
                count={count}
                key={id}
                isVisibleForPrint={isVisibleForPrint}
              />
            ))}
          </div>
        ))}
      </div>
    )
  )
}
