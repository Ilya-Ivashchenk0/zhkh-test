import './table-header.css'

export const TableHeader: React.FC = () => {
  return (
    <thead className="table-header">
      <tr className="table-header__heading">
        <th className="table-header__cell first-cell">№</th>
        <th className="table-header__cell other-cell">Тип</th>
        <th className="table-header__cell other-cell">Дата установки</th>
        <th className="table-header__cell other-cell">Автоматический</th>
        <th className="table-header__cell other-cell">Текущие показания</th>
        <th className="table-header__cell other-cell">Адрес</th>
        <th className="table-header__cell other-cell">Примечание</th>
        <th className="table-header__cell other-cell"></th>
      </tr>
    </thead>
  )
}
