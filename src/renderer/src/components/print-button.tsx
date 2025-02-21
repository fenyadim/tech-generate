import { useToast } from '@/shared/hooks/use-toast'
import { Button } from '@/shared/ui'

export const PrintButton = () => {
  const { toast } = useToast()

  const handlePrint = async () => {
    try {
      const { success, message } = await window.api.printPage()
      if (success) {
        toast({
          title: 'Успешно',
          description: 'Страница отправлена на печать.',
          variant: 'success'
        })
      } else {
        toast({
          title: 'Ошибка',
          description: `Ошибка при печати: ${message}`,
          variant: 'destructive'
        })
      }
    } catch (err) {
      toast({
        title: 'Ошибка',
        description: `Ошибка: ${err}`,
        variant: 'destructive'
      })
    }
  }

  return <Button onClick={handlePrint}>Печать</Button>
}
