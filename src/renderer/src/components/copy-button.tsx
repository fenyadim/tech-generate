import { Button } from '@/shared/ui'
import { processStore, techCardStore } from '@/store'
import { Copy } from 'lucide-react'

interface CopyButtonProps {
  idCard: string
}

export const CopyButton = ({ idCard }: CopyButtonProps) => {
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
