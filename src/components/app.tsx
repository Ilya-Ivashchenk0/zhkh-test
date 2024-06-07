import './app.css'
import { Table } from './table'
import { useStore } from '../hooks/useStore'
import { observer } from 'mobx-react-lite'

const App: React.FC = observer(() => {
  const { counters } = useStore()

  if (!counters.counters.length || !counters.addresses.length) {
    return <div>Loading...</div>
  }

  return (
    <main className="App">
      <h1>Список счётчиков</h1>
      <Table counters={counters.counters} addresses={counters.addresses} />
    </main>
  )
})

export default App
