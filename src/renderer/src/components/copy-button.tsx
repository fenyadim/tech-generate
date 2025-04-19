import { Button } from '@/shared/ui'
import { getTechLastId, useProcessActions, useProcessItems, useTechActions } from '@/store'
import { Copy } from 'lucide-react'
import { memo } from 'react'

interface CopyButtonProps {
  idCard: string
}

export const CopyButtonMemo = ({ idCard }: CopyButtonProps) => {
  const { copyCard } = useTechActions()
  const process = useProcessItems()
  const { copyProcess } = useProcessActions('')

  const handleCopy = () => {
    copyCard(idCard)
    copyProcess(process[idCard], getTechLastId())
  }

  return (
    <Button variant="ghost" title="Дублировать" onClick={handleCopy} size="icon">
      <Copy />
    </Button>
  )
}

export const CopyButton = memo(CopyButtonMemo)
