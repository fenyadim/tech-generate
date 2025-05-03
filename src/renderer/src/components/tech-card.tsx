import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'
import { useProcessItem } from '@/store'
import { useFileAuthor } from '@/store/fileStore'
import { memo, useCallback } from 'react'
import { CopyButton } from './copy-button'
import { CountElement } from './count-element'
import { DeleteCardButton } from './delete-card-button'
import { AddProcess, ProcessItem } from './process'
import { ShowButton } from './show-button'
import { TitleInput } from './title-input'

interface TechCardProps {
  id: string
  title: string
  count: number
  isVisibleForPrint: boolean
}

const TechCardMemo = ({ id, count = 1, isVisibleForPrint }: TechCardProps) => {
  const process = useProcessItem(id)
  const author = useFileAuthor()

  console.log(id)

  const sumNormTime = useCallback(
    () =>
      process ? process.reduce((acc, item) => acc + (item.time ? Number(item.time) : 0), 0) : 0,
    [process]
  )

  const sum = (sumNormTime() * count).toFixed(2)

  return (
    <Card
      className={cn('h-fit relative break-inside-avoid print:shadow-none', {
        'print:hidden': !process,
        'border-destructive border-2': isNaN(sumNormTime()),
        'opacity-30 print:hidden': !isVisibleForPrint
      })}
      data-testid="tech-card"
    >
      <div className="absolute top-1 right-1 print:hidden">
        <ShowButton idCard={id} isVisible={isVisibleForPrint} />
        <CopyButton idCard={id} />
        <DeleteCardButton idCard={id} />
      </div>
      <CardHeader className="print:p-2 print:pb-0">
        <CardTitle>
          <TitleInput id={id} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 print:p-2" data-testid="process-container">
        <div className="grid grid-cols-[0.3fr_3fr_1fr_1fr_70px] gap-1 justify-items-center px-2 *:font-medium text-sm print:grid-cols-[0.3fr_2fr_1fr_1fr]">
          <p>№</p>
          <p>Процесс</p>
          <p>Норма</p>
          <p>Разряд</p>
        </div>
        {process &&
          process.map(({ id: processId, title, category, description, time }, index) => {
            return (
              <ProcessItem
                key={processId}
                id={processId}
                idParent={id}
                pos={index + 1}
                length={process[id]?.length}
                title={title}
                time={time}
                description={description}
                category={category}
              />
            )
          })}
        <AddProcess idParent={id} />
        <p className="font-medium" data-testid="total-sum">
          Общее время: {sum}
        </p>
        <CountElement id={id} count={count} />
        <p className="hidden print:block">Автор: {author}</p>
      </CardContent>
    </Card>
  )
}

export const TechCard = memo(TechCardMemo)
