import { TableHeader } from '../table-header'
import { TableRow } from '../table-row'
import { tableProps } from './types'

export const Table: React.FC<tableProps> = ({ counters }) => {
  return (
    <table>
      <TableHeader />
      <tbody>
        {counters.map((item, index) => (
          <TableRow
            key={index}
            number={index + 1}
            id={item.id}
            _type={item._type}
            area={item.area}
            is_automatic={item.is_automatic}
            communication={item.communication}
            description={item.description}
            serial_number={item.serial_number}
            installation_date={item.installation_date}
            brand_name={item.brand_name}
            model_name={item.model_name}
            initial_values={item.initial_values}
          />
        ))}
      </tbody>
    </table>
  )
}
