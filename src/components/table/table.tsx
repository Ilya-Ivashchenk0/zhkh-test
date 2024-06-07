import { Instance } from 'mobx-state-tree'
import { TableHeader } from '../table-header'
import { TableRow } from '../table-row'
import { tableProps } from './types'
import AddressModel from '../../models/address-model'
import { Pagination } from '../pagination'

export const Table: React.FC<tableProps> = ({
  counters,
  addresses,
  totalPages,
  handlePageChange,
  currentPage
}) => {
  const getAddress = (id: string) => {
    return addresses.find((address) => address.id === id)
  }

  const calculateCounterNumber = (index: number) => {
    return (currentPage - 1) * 20 + index + 1
  }

  return (
    <>
      <table>
        <TableHeader />
        <tbody>
          {counters.map((item, index) => (
            <TableRow
              key={index}
              number={calculateCounterNumber(index)}
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
              address={
                (getAddress(item.area.id) as Instance<typeof AddressModel>) ||
                undefined
              }
            />
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}
