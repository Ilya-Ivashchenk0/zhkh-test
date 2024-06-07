class Api {
  baseUrl: string
  headers: {
    [key: string]: string
  }

  constructor(options: {
    baseUrl: string
    headers: {
      [key: string]: string
    }
  }) {
    this.baseUrl = options.baseUrl
    this.headers = options.headers
  }

  _getResponseData(res: Response) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  async getAllCounters() {
    const data = await fetch(`${this.baseUrl}/test/meters`, {
      method: 'GET',
      headers: this.headers
    })

    return this._getResponseData(data)
  }

  async getCounters(limit: number, offset: number) {
    const data = await fetch(
      `${this.baseUrl}/test/meters/?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: this.headers
      }
    )

    return this._getResponseData(data)
  }

  async getCountersAddresses(id: string[]) {
    const data = await fetch(`${this.baseUrl}/test/areas/?id__in=${id}`, {
      method: 'GET',
      headers: this.headers
    })

    return this._getResponseData(data)
  }

  async deleteCounter(id: string) {
    return await fetch(`${this.baseUrl}/test/meters/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }
}

const api = new Api({
  baseUrl: 'http://showroom.eis24.me/api/v4',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
