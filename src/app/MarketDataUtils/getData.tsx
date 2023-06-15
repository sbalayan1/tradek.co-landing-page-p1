import "server-only"

const api_key = process.env.API_KEY 
const secret_key = process.env.API_SECRET_KEY 

// const updateTimeframe



export async function getData(stock: string) {
  console.log('fetching data')
  if (!api_key || !secret_key) throw new Error('Input your API keys in the .env')

  // const symbolString = stocks.map((str, idx) => {
  //   if (idx === stocks.length -1) return str
  //   return str + "%2C"
  // }).join('')

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': 'insert API keys',
      'APCA-API-SECRET-KEY': 'insert API keys',
      cache: 'no-store'
    },
    next: { revalidate: 1 }
  };

  const res = await fetch(`https://data.alpaca.markets/v2/stocks/bars?symbols=${stock}&timeframe=1minute&start=2023-06-14&end=2023-06-14&limit=${24*60}&adjustment=raw`, options)
  if (!res.ok) {
    throw new Error('Failed to fetch data') // this will activate the closest err.js error boundary
  }

  return res.json()
}