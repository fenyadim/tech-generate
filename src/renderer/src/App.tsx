import { Plus } from 'lucide-react'
import { Header } from './components/header'
import { TechCard } from './components/tech-card'
import { Button } from './shared/ui'
import { halfArray } from './shared/utils/halfArray'
import { techCardStore } from './store/techCardStore'

function App(): JSX.Element {
  const tech = techCardStore.use()

  const handleCreate = () => {
    techCardStore.createCard()
  }

  const handleDelete = (id: string) => {
    techCardStore.deleteCard(id)
  }

  return (
    <main className="h-screen p-4 print:p-0">
      <Header />
      <div className="relative print:hidden grid grid-cols-auto-fill grid-flow-dense gap-4 pb-4">
        {tech.map(({ title, id, count }) => (
          <TechCard id={String(id)} title={title} count={count} key={id} onDelete={handleDelete} />
        ))}
        <Button variant="outline" className="h-auto flex-1 print:hidden" onClick={handleCreate}>
          Добавить новую
          <Plus />
        </Button>
      </div>
      <div className="hidden print:grid grid-cols-2 gap-2">
        {halfArray(tech).map((item, id) => (
          <div className="hidden print:flex flex-col gap-2 break-inside-avoid" key={id}>
            {item.map(({ title, id, count }) => (
              <TechCard
                id={String(id)}
                title={title}
                count={count}
                key={id}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
