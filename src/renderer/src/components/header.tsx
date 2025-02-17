import { Button } from '@/shared/ui'
import { useStore } from '@/store'

export const Header = () => {
  const { tech, process, onSignalSave } = useStore()

  const handleSave = () => {
    onSignalSave()
    window.electron.ipcRenderer.send(
      'ping',
      JSON.stringify(tech.map((item) => ({ ...item, process: JSON.stringify(process[item.id]) })))
    )
  }

  return (
    <header className="mb-4 flex items-center justify-between p-2 border-b">
      <div>
        <p className="text-sm font-medium opacity-60">Номер оснастки</p>
        <h2 className="text-2xl font-bold">РА9260769</h2>
      </div>
      <Button onClick={handleSave}>Записать</Button>
    </header>
  )
}
