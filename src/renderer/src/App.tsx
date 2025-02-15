import { Plus } from 'lucide-react'
import { Header } from './components/header'
import { TechCard } from './components/tech-card'
import { Button } from './shared/ui'
import { useStore } from './store'

function App(): JSX.Element {
  const { tech, createTechCard, deleteTechCard } = useStore()

  const handleClick = () => {
    createTechCard('Test')
  }

  const handleDelete = (id: string) => {
    deleteTechCard(id)
  }

  return (
    <main className="h-screen p-4">
      <Header />
      <div className="relative flex flex-wrap items-center gap-4">
        {tech.map(({ title, id }) => (
          <TechCard id={String(id)} title={`${title} ${id}`} key={id} onDelete={handleDelete} />
        ))}
        <Button onClick={handleClick} size="icon">
          <Plus />
        </Button>
      </div>
    </main>
  )
}

export default App
