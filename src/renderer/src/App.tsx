import { Header } from './components/header'
import { TechCardWrapper } from './components/tech-card-wrapper'
import { useFileOpenHandler } from './shared/hooks/use-file-open-handler'
import { useUnsavedSync } from './shared/hooks/use-unsaved-sync'
import { unsavedStore } from './store/unsavedStore'
import { useEffect } from 'react'

function App() {
  useFileOpenHandler()
  useUnsavedSync()

  useEffect(() => {
    window.api.onGetUnsavedStatusRequest(() => unsavedStore.getState().isDirty)
    return () => {
      window.api.removeAllListeners('get-unsaved-status')
    }
  }, [])

  return (
    <main className="h-screen print:p-0 ">
      <Header />
      <TechCardWrapper />
    </main>
  )
}

export default App
