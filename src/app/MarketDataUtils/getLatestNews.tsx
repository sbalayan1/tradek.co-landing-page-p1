'use server'
import 'server-only'

const api_key = process.env.API_KEY
const secret_key = process.env.API_SECRET_KEY

// used for fetching the latest news of a given day
export async function getLatestNews(symbol: string = '') {
	if (!api_key || !secret_key) throw new Error('Input your API keys in the .env')

	// search for news on a symbol if a symbol is passed otherwise, gather the latest news
	const tgtString = symbol.length > 1 ? `https://data.alpaca.markets/v1beta1/news?symbols=${symbol}&limit=20&sort=DESC` : 'https://data.alpaca.markets/v1beta1/news?limit=20&sort=DESC'
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
