import { fileStore } from '@/store/fileStore'
import { processStore } from '@/store/processStore'
import { techCardStore } from '@/store/techCardStore'
import { unsavedStore } from '@/store/unsavedStore'
import { useEffect } from 'react'

export const useUnsavedSync = () => {
  useEffect(() => {
    const setDirtyIfNotLoading = () => {
      if (!unsavedStore.getState().isLoading) {
        unsavedStore.getState().setDirty(true)
      }
    }

    const unsubTech = techCardStore.subscribe(setDirtyIfNotLoading)
    const unsubProcess = processStore.subscribe(setDirtyIfNotLoading)
    const unsubFile = fileStore.subscribe(setDirtyIfNotLoading)

    return () => {
      unsubTech()
      unsubProcess()
      unsubFile()
    }
  }, [])
}
