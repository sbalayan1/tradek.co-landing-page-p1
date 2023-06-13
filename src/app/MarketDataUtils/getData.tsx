import "server-only"

const api_key = process.env.API_KEY 
const secret_key = process.env.API_SECRET_KEY 

export async function getData() {
  console.log('fetching data')
  if (!api_key || !secret_key) throw new Error('Input your API keys in the .env')

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': 'input api keys',
      'APCA-API-SECRET-KEY': 'input api keys'
    }
  };

  console.log(options)
  const res = await fetch('https://data.alpaca.markets/v2/stocks/bars?symbols=AAPL&timeframe=1day&start=2023-06-13&end=2023-06-13&limit=1&adjustment=raw', options)
  if (!res.ok) {
        throw new Error('Failed to fetch data') // this will activate the closest err.js error boundary
  }

    return res.json()
}