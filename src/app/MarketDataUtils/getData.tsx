import "server-only"

const api_key = process.env.API_KEY 
const secret_key = process.env.API_SECRET_KEY 

export async function getData(stock: string) {
  if (!api_key || !secret_key) throw new Error('Input your API keys in the .env')

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': '',
      'APCA-API-SECRET-KEY': '',
      cache: 'no-store'
    },
    next: { revalidate: 60 }
  };

  const res = await fetch(`https://data.alpaca.markets/v2/stocks/bars?symbols=${stock}&timeframe=1minute&limit=${24*60}&adjustment=raw`, options)
  if (!res.ok) {
    throw new Error('Failed to fetch data') // this will activate the closest err.js error boundary
  }

  return res.json()
}