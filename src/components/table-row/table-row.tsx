import { tableRowProps } from './types'

export const TableRow: React.FC<tableRowProps> = ({
  number,
  _type,
  area,
  is_automatic,
  communication,
  description,
  serial_number,
  installation_date,
  brand_name,
  model_name,
  initial_values
}) => {
  return (
    <tr>
      <th>{number}</th>
      <th>{_type}</th>
      <th>{installation_date}</th>
      <th>
        {is_automatic === null ? 'Нет данных' : is_automatic ? 'Да' : 'Нет'}
      </th>
      <th>{initial_values}</th>
      <th>Адрес</th>
      <th>{description}</th>
    </tr>
  )
}
