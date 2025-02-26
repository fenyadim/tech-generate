import { Button } from '@/shared/ui'
import { processStore, techCardStore } from '@/store'
import { Copy } from 'lucide-react'
import { memo } from 'react'

interface CopyButtonProps {
  idCard: string
}

export const CopyButtonMemo = ({ idCard }: CopyButtonProps) => {
  const handleCopy = () => {
    techCardStore.copyCard(idCard)
    const tech = techCardStore.get()
    const process = processStore.get()
    processStore.copyProcess(process[idCard], tech[tech.length - 1].id)
  }

  return (
    <Button variant="ghost" title="Дублировать" onClick={handleCopy} size="icon">
      <Copy />
    </Button>
  )
}

export const CopyButton = memo(CopyButtonMemo)
