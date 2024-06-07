export interface IArea {
  id: string
  number: number
  str_number: string
  str_number_full: string
  house: {
    address: string
    id: string
    fias_addrobjs: string[]
  }
}

export interface ICounter {
  id: string
  _type: string[]
  area: {
    id: string
  }
  is_automatic: boolean | null
  communication: string
  description: string
  serial_number: string
  installation_date: string
  brand_name: string | null
  model_name: string | null
  initial_values: number[]
}
