import { Button } from '@/shared/ui'

export const OpenButton = () => {
  const handleOpen = async () => {
    try {
      await window.api.openFile()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <Button variant="outline" onClick={handleOpen}>
      Открыть
    </Button>
  )
}
