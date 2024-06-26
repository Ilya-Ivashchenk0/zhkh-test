import './table.css';
import { Instance } from 'mobx-state-tree';
import { TableHeader } from '../table-header';
import { TableRow } from '../table-row';
import { tableProps } from './types';
import AddressModel from '../../models/address-model';
import { Pagination } from '../pagination';

export const Table: React.FC<tableProps> = ({
  counters,
  addresses,
  totalPages,
  handlePageChange,
  currentPage,
  handleDeleteCounter,
}) => {
  const getAddress = (id: string) => {
    return addresses.find((address) => address.id === id);
  };

  const calculateCounterNumber = (index: number) => {
    return (currentPage - 1) * 20 + index + 1;
  };

  const onDeleteCounter = (id: string) => {
    handleDeleteCounter(id);
  };

  return (
    <div className="table">
      <div className="table__body-wrapper">
        <table>
          <TableHeader />
          <tbody className="table__body">
            {counters.map((item, index) => (
              <TableRow
                key={item.id}
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
                  getAddress(item.area.id) as Instance<typeof AddressModel>
                }
                handleDeleteCounter={onDeleteCounter}
              />
            ))}
          </tbody>
        </table>
      </div>
      <table>
        <tfoot className="table__footer">
          <tr>
            <td colSpan={8}>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
