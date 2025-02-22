import { Dialog, DialogContent, DialogHeader, DialogTitle, Progress } from '@/shared/ui'
import { useEffect, useState } from 'react'

export const UpdateModal = () => {
  const [progressBar, setProgressBar] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.api.onUpdateStatus((status) => setOpen(status === 'update-start'))
    window.api.updateProgress((precent) => setProgressBar(Number(precent)))
  }, [])

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Обновление</DialogTitle>
        </DialogHeader>
        <Progress value={progressBar} />
      </DialogContent>
    </Dialog>
  )
}
