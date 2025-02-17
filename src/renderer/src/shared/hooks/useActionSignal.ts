import { useStore } from '@/store'
import { useEffect } from 'react'

interface CallbackOneParam<T1, T2 = void> {
  (param1: T1): T2
}

export const useActionSignal = <T extends CallbackOneParam<void>>(cb: T): void => {
  const { signal, onSignalReset } = useStore()

  useEffect(() => {
    if (signal === 'save') {
      cb()
      onSignalReset()
    }
  }, [signal])
}
