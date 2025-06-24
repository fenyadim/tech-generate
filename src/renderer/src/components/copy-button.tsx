import { Button } from '@/shared/ui'
import { getTechLastId, useProcessActions, useProcessItems, useTechActions } from '@/store'
import { Copy } from 'lucide-react'
import { memo, useCallback } from 'react'

interface CopyButtonProps {
  idCard: string
}

export const CopyButtonMemo = ({ idCard }: CopyButtonProps) => {
  const { copyCard } = useTechActions()
  const process = useProcessItems()
  const { copyProcess } = useProcessActions('')

  const handleCopy = useCallback(() => {
    copyCard(idCard)
    copyProcess(process[idCard], getTechLastId())
  }, [copyCard, copyProcess, idCard, process])

  return (
    <Button
      variant="ghost"
      title="Дублировать"
      onClick={handleCopy}
      size="icon"
      data-testid="copy-btn"
    >
      <Copy />
    </Button>
  )
}

export const CopyButton = memo(CopyButtonMemo)
