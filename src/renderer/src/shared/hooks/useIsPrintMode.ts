import { useEffect, useState } from 'react'

export const useIsPrintMode = () => {
  const [isPrinting, setIsPrinting] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia('print')
    const handler = (e) => setIsPrinting(e.matches)

    mediaQueryList.addEventListener('change', handler)
    return () => mediaQueryList.removeEventListener('change', handler)
  }, [])

  return isPrinting
}
