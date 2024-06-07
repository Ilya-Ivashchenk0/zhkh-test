import './app.css'
import { Table } from './table'
import { useStore } from '../hooks/useStore'
import { observer } from 'mobx-react-lite'

const App: React.FC = observer(() => {
  const { counters } = useStore()

  return (
    <main className="App">
      <h1>Список счётчиков</h1>
      <Table counters={counters.counters} />
    </main>
  )
})

export default App
