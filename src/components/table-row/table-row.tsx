import { tableRowProps } from './types'

export const TableRow: React.FC<tableRowProps> = ({
  number,
  _type,
  is_automatic,
  description,
  installation_date,
  initial_values,
  address,
  ...otherProps
}) => {
  const houseAddress = address?.house?.address || 'Загрузка...'
  const strNumberFull = address?.str_number_full || 'Загрузка...'

  const counterType = () => {
    switch (_type[0]) {
      case 'ColdWaterAreaMeter':
        return 'ХВС'
      case 'HotWaterAreaMeter':
        return 'ГВС'
      default:
        return 'Неизвестный тип'
    }
  }

  const date = (data: string) => {
    const date = new Date(data)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  return (
    <tr>
      <th>{number}</th>
      <th>{counterType()}</th>
      <th>{date(installation_date)}</th>
      <th>{is_automatic === null ? '' : is_automatic ? 'Да' : 'Нет'}</th>
      <th>{initial_values}</th>
      <th>{`${houseAddress}, ${strNumberFull}`}</th>
      <th>{description}</th>
    </tr>
  )
}
