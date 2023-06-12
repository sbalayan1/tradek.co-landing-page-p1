import "server-only"

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': 'PK7H5L487HMEI0TOC0DT',
      'APCA-API-SECRET-KEY': 'RBJ0MUgBbo6edCFUT29LOJOnW1OYDrbemQZgExAv'
    }
  };


export async function getData() {
    const res = await fetch('https://data.alpaca.markets/v2/stocks/bars?symbols=AAPL&timeframe=1day&start=2023-06-09&end=2023-06-09&limit=1&adjustment=raw', options)
    if (!res.ok) {
        throw new Error('Failed to fetch data') // this will activate the closest err.js error boundary
    }

    return res.json()
}