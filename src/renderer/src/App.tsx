import { Header } from './components/header'
import { TechCardWrapper } from './components/tech-card-wrapper'
import { useFileOpenHandler } from './shared/hooks/use-file-open-handler'

function App(): JSX.Element {
  useFileOpenHandler()

  return (
    <main className="h-screen print:p-0 ">
      <Header />
      <TechCardWrapper />
    </main>
  )
}

export default App
