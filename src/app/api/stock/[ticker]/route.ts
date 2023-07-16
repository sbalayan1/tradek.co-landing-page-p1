// route handlers allow us to create custom request handlers for given routes. In the example below, we create a custom GET request handler for the /api/stock/[ticker] route. 

// route handlers are evaluated statically when using the GET method with the RESPONSE object
// oppositely, route handlers are evaluated dynamically when using the REQUEST object with the GET method or with any of the other methods. In the example below, since we use the REQUEST object, our route is evaluated dynamically.

// not sure how necessary route handlers are for this project. in a way having these route handlers saves us time because we can make requests to the route handler instead of importing a helper method everytime we need to make a request to an api.

import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.API_KEY
const SECRET_KEY = process.env.API_KEY


export async function GET(request: NextRequest, { params }: { params: { ticker: string }}) {
	if (!API_KEY || !SECRET_KEY) throw new Error('input API KEYS')
	const res = await fetch(`https://data.alpaca.markets/v2/stocks/bars?symbols=${params.ticker}&timeframe=1min&limit=${24*60}&adjustment=raw`, {
		headers: {
			accept: 'application/json',
      'APCA-API-KEY-ID': API_KEY,
      'APCA-API-SECRET-KEY': SECRET_KEY,
		}
	})

	const data = await res.json()
	return NextResponse.json({ data })
}