import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { Header } from './components/header'
import { PrintView } from './components/print-view'
import { TechCard } from './components/tech-card'
import { Button } from './shared/ui'
import { fileStore, processStore, techCardStore } from './store'
import { IFileOpened } from './types'

function App(): JSX.Element {
  const tech = techCardStore.use()

  useEffect(() => {
    window.api.fileOpened((data) => {
      const { titleTool, techList, author, path } = data as IFileOpened
      fileStore.assign({ title: titleTool, author: author, path })
      techCardStore.set(
        techList.map((item) => ({
          ...item,
          count: item.count ?? 1,
          process: [],
          isVisibleForPrint: true
        }))
      )
      processStore.set(techList.reduce((acc, item) => ({ ...acc, [item.id]: item.process }), {}))
    })

    return () => {
      window.api.removeAllListeners('file-opened')
    }
  }, [])

  const handleCreate = () => {
    techCardStore.createCard()
  }

  return (
    <main className="h-screen print:p-0 overflow-hidden">
      <Header />
      <div className="relative print:hidden grid grid-cols-auto-fill grid-flow-dense gap-4 h-full pt-28 p-4 overflow-y-scroll">
        {tech.map(({ title, id, count, isVisibleForPrint }) => (
          <TechCard
            id={String(id)}
            title={title}
            count={count}
            key={id}
            isVisibleForPrint={isVisibleForPrint}
          />
        ))}
        <Button
          variant="outline"
          className="h-full max-h-40 flex-1 print:hidden"
          onClick={handleCreate}
          data-testid="add-tech-card-button"
        >
          Добавить новую
          <Plus />
        </Button>
      </div>
      <PrintView techCards={tech} />
    </main>
  )
}

export default App
