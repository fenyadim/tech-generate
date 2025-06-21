import { Button } from '@/shared/ui'
import { memo, useCallback } from 'react'
import { toast } from 'sonner'

const PrintButtonMemo = () => {
  const handlePrint = useCallback(async () => {
    try {
      const { success, message } = await window.api.printPage()
      if (success) {
        toast.success('Успешно', {
          description: 'Страница отправлена на печать.'
        })
      } else {
        toast.error('Ошибка', {
          description: `Ошибка при печати: ${message}`
        })
      }
    } catch (err) {
      toast.error('Ошибка', {
        description: `Ошибка: ${err}`
      })
    }
  }, [])

  return <Button onClick={handlePrint}>Печать</Button>
}

export const PrintButton = memo(PrintButtonMemo)
