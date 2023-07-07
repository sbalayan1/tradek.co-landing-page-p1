'use server'
import 'server-only'
import { News } from '@/app/globalInterfaces'

const api_key = process.env.API_KEY
const secret_key = process.env.API_SECRET_KEY

// used for fetching the latest news of a given day
export async function getLatestNews(symbol: string | string[] = ''): Promise<News> {
	if (!api_key || !secret_key) throw new Error('Input your API keys in the .env')

	let tgtString;

	// search for news on a symbol if a symbol is passed otherwise, gather the latest news
	if (typeof symbol === 'string') {
		tgtString = symbol.length > 1 ? `https://data.alpaca.markets/v1beta1/news?symbols=${symbol}&limit=20&sort=DESC` : 'https://data.alpaca.markets/v1beta1/news?limit=20&sort=DESC'
	} else {
		let symbolStr: string = symbol.slice(0,symbol.length).join('%2C') + symbol.slice(-1) // create a copy of the symbol array not including the last element and create a string joined by '%2C'. Add the last element in the symbol arr

		tgtString = `https://data.alpaca.markets/v1beta1/news?symbols=${symbolStr}&limit=20&sort=DESC`
	}


	const res = await fetch(tgtString, { 
		method: 'GET', 
		cache: 'no-store',
		headers: {
			accept: 'application/json',
      'APCA-API-KEY-ID': api_key,
      'APCA-API-SECRET-KEY': secret_key,
		}
	})
	
	if (!res.ok) throw new Error('Failed to fetch data')
	return res.json()
}
