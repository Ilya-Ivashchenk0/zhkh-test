import './table-header.css';

export const TableHeader: React.FC = () => {
  return (
    <thead className="table-header">
      <tr className="table-header__heading">
        <th className="table-header__cell first-cell">№</th>
        <th className="table-header__cell">Тип</th>
        <th className="table-header__cell">Дата установки</th>
        <th className="table-header__cell">Автоматический</th>
        <th className="table-header__cell">Текущие показания</th>
        <th className="table-header__cell">Адрес</th>
        <th className="table-header__cell">Примечание</th>
        <th className="table-header__cell last-cell"></th>
      </tr>
    </thead>
  );
};
