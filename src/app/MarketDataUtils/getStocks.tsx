import "server-only"

const api_key = process.env.API_KEY 
const secret_key = process.env.API_SECRET_KEY 

interface Quote {
  t: string,
  o: number,
  h: number,
  l: number,
  c: number,
  v: number,
  n: number
  vw: number
}

interface Stock {
  [key: string]: Quote[]
}


interface MarketData {
  bars: Stock,
  next_page_token: string
}

export async function getAlpacaData(stock: string) {
  // if (!api_key || !secret_key) throw new Error('Input your API keys in the .env') commented out for now

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': 'insert api key',
      'APCA-API-SECRET-KEY': 'insert api key',
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

export async function buildStockData(stocks: string[]): Promise<Stock[]> {
  const promises: Promise<MarketData>[] = stocks.map((stock) => getAlpacaData(stock)) // create an array of promises
  const data: MarketData[] = await Promise.all(promises) // fetch 1 minute performance over the entire day concurrently
  const stockData: Stock[] = data.map(obj => obj.bars) // return an array of Stocks
  return stockData
}


