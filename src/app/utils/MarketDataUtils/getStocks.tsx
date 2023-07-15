"use server"
import "server-only"

const API_KEY = process.env.API_KEY 
const SECRET_KEY = process.env.API_SECRET_KEY 

import { Stock, MarketData } from '@/app/globalInterfaces'


export async function getAllAssets() {
	if (!API_KEY || !SECRET_KEY) throw new Error('Input your API keys in the .env')
	const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': API_KEY,
      'APCA-API-SECRET-KEY': SECRET_KEY,
    },
  };

	const res = await fetch('https://paper-api.alpaca.markets/v2/assets', options)
	if (!res.ok) throw new Error('Failed to fetch data')
	return res.json()
}


function createDateString(timeframe: '1d' | '1w' | '1m' | '3m' | '1y' | '5y' = '1d') {
  // sunday: 0, monday: 1, tuesday: 2, ... saturday: 6
  const currentDate = new Date()
  const currentDay = currentDate.getDay()
  if (currentDay === 0) currentDate.setDate(currentDate.getDate() - 2)
  if (currentDay === 6) currentDate.setDate(currentDate.getDate() - 1)

	if (timeframe === '1w') currentDate.setDate(currentDate.getDate() - 7) // if timeframe is 1w, set days 7 days back
	if (timeframe === '1m') {
		const currentMonth = currentDate.getMonth() 
		currentDate.setMonth(currentMonth === 1 ? 12 : currentMonth - 1)
	}
	if (timeframe === '3m') {
		const currentMonth = currentDate.getMonth()
		if (currentMonth === 1 || currentMonth === 3) {
			currentDate.setMonth(currentMonth === 1 ? 10 : 12)
		} else {
			currentDate.setMonth(currentMonth - 3)
		}
	}
	if (timeframe === '1y') currentDate.setFullYear(currentDate.getFullYear() - 1)
	if (timeframe === '5y') currentDate.setFullYear(currentDate.getFullYear() - 5)
	
  currentDate.setHours(0, 0, 0) // set hours of date to beginning of day
  return currentDate.toJSON() // needs to be converted to json or an ISOstring
}


export async function getAlpacaData(stock: string) {
  if (!API_KEY || !SECRET_KEY) throw new Error('Input your API keys in the .env')
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': API_KEY,
      'APCA-API-SECRET-KEY': SECRET_KEY,
    },
  };

  const dateString = createDateString() // defaults to 1d and should output the current date at hr 00:00:00AM
  const tgtString = `https://data.alpaca.markets/v2/stocks/bars?symbols=${stock}&timeframe=1min&start=${dateString}&limit=${24*60}&adjustment=raw`

  // note if you don't pass a start and end, the API defaults to the start of the CURRENT DAY. If there's no market data for that day, then you'll return an array of empty objects
  const res = await fetch(tgtString, options)
  if (!res.ok) {
    throw new Error('Failed to fetch data') // this will activate the closest err.js error boundary
  }

  return res.json()
}

// getAlpacaData function update
	// add a timeframe parameter that defaults to ''
	// add a next_page_token parameter that defaults to ''
	// when timeframe param is '' or 1day, targetString will have a timeframe of 1min and start on the current day
	// when timeframe is not '' or 1day, targetStrings timeframe will adjust to 1day
		//if timeframe = 1week => start value will be 7days from the current date
		//if timeframe = 1month => start vaue will be 30days from the current date
		//if timeframe = 3months => .....
	
	//if there is a next page token, return a json response and the next page token so that we can make another alpaca request


export async function testGetAlpacaData(stock: string, timeframe: '1d' | '1w' | '1m' | '3m' | '1y' | '5y' = '1d', next_token: string | null = null): Promise<MarketData> {
	if (!API_KEY || !SECRET_KEY) throw new Error('Input your API keys in the .env')

	// when timeframe param is '' or 1day, targetString will have a timeframe of 1min and start on the current day otherwise, get daily data
	const dateString = createDateString(timeframe)
	const tgtTimeframe = timeframe === '1d' ? '1Min' : '1Day'
	let tgtString = `https://data.alpaca.markets/v2/stocks/bars?symbols=${stock}&timeframe=${tgtTimeframe}&start=${dateString}&limit=${24*60}&adjustment=all`
	if (next_token) tgtString += `&page_token=%${next_token}` // add the token to the end of the tgtString if it exists. 	

  // note if you don't pass a start and end, the API defaults to the start of the CURRENT DAY. If there's no market data for that day, then you'll return an array of empty objects
  const res = await fetch(tgtString, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': API_KEY,
      'APCA-API-SECRET-KEY': SECRET_KEY,
    },
		cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch data') // this will activate the closest err.js error boundary

  return res.json()
}

export async function buildStockData(stocks: string[]): Promise<Stock[]> {
  "use server"
  const promises: Promise<MarketData>[] = stocks.map((stock) => testGetAlpacaData(stock)) // create an array of promises
  const data: MarketData[] = await Promise.all(promises) // fetch 1 minute performance over the entire day concurrently
  const stockData: Stock[] = data.map(obj => obj.bars) // return an array of Stocks
  return stockData
}


