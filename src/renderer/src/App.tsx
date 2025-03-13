import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { Header } from './components/header'
import { TechCard } from './components/tech-card'
import { Button } from './shared/ui'
import { halfArray } from './shared/utils/halfArray'
import { fileStore, processStore, techCardStore } from './store'
import { IFileOpened } from './types'

function App(): JSX.Element {
  const tech = techCardStore.use()

  useEffect(() => {
    window.api.fileOpened((data) => {
      const { titleTool, techList, author, path } = data as IFileOpened
      fileStore.assign({ title: titleTool, author: author, path })
      techCardStore.set(techList.map((item) => ({ ...item, count: item.count ?? 1, process: [] })))
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
    <main className="h-screen p-4 print:p-0">
      <Header />
      <div className="relative print:hidden grid grid-cols-auto-fill grid-flow-dense gap-4 pb-4">
        {tech.map(({ title, id, count }) => (
          <TechCard id={String(id)} title={title} count={count} key={id} />
        ))}
        <Button
          variant="outline"
          className="h-full max-h-40 flex-1 print:hidden"
          onClick={handleCreate}
        >
          Добавить новую
          <Plus />
        </Button>
      </div>
      <div className="hidden print:grid grid-cols-2 gap-2">
        {halfArray(tech).map((item, id) => (
          <div className="hidden print:flex flex-col gap-2 break-inside-avoid" key={id}>
            {item.map(({ title, id, count }) => (
              <TechCard id={String(id)} title={title} count={count} key={id} />
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
