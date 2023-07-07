"use server"
import "server-only"

const api_key = process.env.API_KEY 
const secret_key = process.env.API_SECRET_KEY 

import { Stock, MarketData } from '@/app/globalInterfaces'

function createDateString() {
  // sunday: 0, monday: 1, tuesday: 2, ... saturday: 6
  const currentDate = new Date()
  const currentDay = currentDate.getDay()
  if (currentDay === 0) currentDate.setDate(currentDate.getDate() - 2)
  if (currentDay === 6) currentDate.setDate(currentDate.getDate() - 1)
  currentDate.setHours(0, 0, 0)
  return currentDate.toJSON() // needs to be converted to json or an ISOstring
}

export async function getAlpacaData(stock: string) {
  if (!api_key || !secret_key) throw new Error('Input your API keys in the .env')
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': api_key,
      'APCA-API-SECRET-KEY': secret_key,
    },
  };

  const dateString = createDateString()
  const tgtString = `https://data.alpaca.markets/v2/stocks/bars?symbols=${stock}&timeframe=1min&start=${dateString}&limit=${24*60}&adjustment=raw`
	
  // note if you don't pass a start and end, the API defaults to the start of the CURRENT DAY. If there's no market data for that day, then you'll return an array of empty objects
  const res = await fetch(tgtString, options)
  if (!res.ok) {
    throw new Error('Failed to fetch data') // this will activate the closest err.js error boundary
  }

  return res.json()
}

export async function buildStockData(stocks: string[]): Promise<Stock[]> {
  "use server"
  const promises: Promise<MarketData>[] = stocks.map((stock) => getAlpacaData(stock)) // create an array of promises
  const data: MarketData[] = await Promise.all(promises) // fetch 1 minute performance over the entire day concurrently
  const stockData: Stock[] = data.map(obj => obj.bars) // return an array of Stocks
  return stockData
}


