import { useState } from 'react'
import { TechCard } from './components/tech-card'
import { Button } from './shared/ui'

function App(): JSX.Element {
  const [state, setState] = useState([
    {
      id: 1,
      title: 'Test'
    },
    {
      id: 2,
      title: 'Test2'
    },
    {
      id: 3,
      title: 'Test3'
    }
  ])

  const handleClick = () => {
    setState((prev) => [...prev, { id: Date.now(), title: 'Test' }])
  }

  const handleDelete = (id: string) => {
    setState((prev) => prev.filter((item) => item.id !== Number(id)))
  }

  return (
    <main className="h-screen p-4">
      <div className="relative flex flex-wrap items-center gap-4">
        {state.map(({ title, id }) => (
          <TechCard id={String(id)} title={`${title} ${id}`} key={id} onDelete={handleDelete} />
        ))}
        <Button variant="outline" onClick={handleClick}>
          +
        </Button>
      </div>
    </main>
  )
}

export default App
