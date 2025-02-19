import _ from 'lodash'
import { Plus } from 'lucide-react'
import { Header } from './components/header'
import { TechCard } from './components/tech-card'
import { Button } from './shared/ui'
import { useStore } from './store'

function App(): JSX.Element {
  const { tech, createTechCard, deleteTechCard } = useStore()

  const handleClick = () => {
    createTechCard()
  }

  const handleDelete = (id: string) => {
    deleteTechCard(id)
  }

  return (
    <main className="h-screen p-4 print:p-0">
      <Header />
      {/* <div className="relative grid grid-cols-auto-fill print:columns-2 gap-4 pb-4"> */}
      <div className="relative print:hidden grid grid-cols-auto-fill grid-flow-dense gap-4 pb-4">
        {tech.map(({ title, id }) => (
          <TechCard id={String(id)} title={title} key={id} onDelete={handleDelete} />
        ))}
        <Button variant="outline" className="h-auto print:hidden" onClick={handleClick}>
          <Plus />
        </Button>
      </div>
      <div className="hidden print:grid grid-cols-2 gap-2">
        {_.chunk(tech, tech.length / 2).map((item, id) => (
          <div className="hidden print:flex flex-col gap-2 break-inside-avoid" key={id}>
            {item.map(({ title, id }) => (
              <TechCard id={String(id)} title={title} key={id} onDelete={handleDelete} />
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
