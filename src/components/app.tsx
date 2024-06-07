import './app.css'
import { Table } from './table'
import { useStore } from '../hooks/useStore'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const App: React.FC = observer(() => {
  const { counters } = useStore()

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    counters.getCounters(currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    counters.clearCache()
  }

  if (!counters.counters.length || !counters.addresses.length) {
    return <div>Loading...</div>
  }

  return (
    <main className="app">
      <h1 className="app__heading">Список счётчиков</h1>
      <Table
        counters={counters.counters}
        addresses={counters.addresses}
        totalPages={counters.totalPages}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </main>
  )
})

export default App
