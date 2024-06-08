import './table-row.css'
import { tableRowProps } from './types'
import trash from '../../images/icons/trash.svg'
import trashHover from '../../images/icons/trash-hover.svg'
import { useState } from 'react'
import cold from '../../images/icons/hvs.svg'
import hot from '../../images/icons/gvs.svg'

export const TableRow: React.FC<tableRowProps> = ({
  id,
  number,
  _type,
  is_automatic,
  description,
  installation_date,
  initial_values,
  address,
  handleDeleteCounter,
  ...otherProps
}) => {
  const [isCounterHover, setCounterHover] = useState(false)
  const [isButtonHover, setButtonHover] = useState(false)
  const houseAddress = address?.house?.address || ''
  const strNumberFull = address?.str_number_full || 'Загрузка...'

  const counterType = () => {
    switch (_type[0]) {
      case 'ColdWaterAreaMeter':
        return (
          <td className="table-row__cell other-cell">
            <div className="table-row__content">
              <img className="table-row__content-img" src={cold} alt="" />
              <span>ХВС</span>
            </div>
          </td>
        )
      case 'HotWaterAreaMeter':
        return (
          <td className="table-row__cell other-cell">
            <div className="table-row__content">
              <img className="table-row__content-img" src={hot} alt="" />
              <span>ГВС</span>
            </div>
          </td>
        )
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

  const handleDelete = () => {
    handleDeleteCounter(id)
  }

  return (
    <tr
      className="table-row"
      onMouseEnter={() => setCounterHover(true)}
      onMouseLeave={() => setCounterHover(false)}
    >
      <td className="table-row__cell first-cell">{number}</td>
      {counterType()}
      <td className="table-row__cell other-cell">{date(installation_date)}</td>
      <td className="table-row__cell other-cell">
        {is_automatic === null ? 'Да' : is_automatic ? '' : 'Нет'}
      </td>
      <td className="table-row__cell other-cell">{initial_values}</td>
      <td className="table-row__cell other-cell">{`${houseAddress} ${strNumberFull}`}</td>
      <td className="table-row__cell table-row__desc other-cell">
        {description}
      </td>
      <td className="table-row__cell other-cell table-row__trash-wrapper">
        {isCounterHover && (
          <button
            onClick={handleDelete}
            className="table-row__button"
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            <img
              src={isButtonHover ? trash : trashHover}
              alt=""
              className="table-row__trash-icon"
            />
          </button>
        )}
      </td>
    </tr>
  )
}
