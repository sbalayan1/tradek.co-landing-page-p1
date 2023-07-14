import 'server-only'

// import components
import MasterChartClient from '@/app/Dashboard/Components/MasterChart/MasterChartClient'
import NewsArticlesClient from '@/app/Dashboard/Components/NewsArticles/NewsArticlesClient'

// import interfaces
import { MarketData, TimeframeData } from '@/app/globalInterfaces'

// import helpers
import { testGetAlpacaData } from '@/app/utils/MarketDataUtils/getStocks'


// something is broken about the graphing component. data is not correct
// need to click on timeframe twice to switch timeframes for stocks


export default async function Page({ params }: { params: { ticker: string }}) {
	// make concurrent requests for a stocks 1d, 1w, 1m, 3m, 1y, and 5y data
	const timeframes = ['1d', '1w', '1m', '3m', '1y', '5y'] as const // turns the array of keys into a tuple. This changes the type from string[] to ['1d', '1w', '1m', '3m', '1y', '5y']
	let stockData: TimeframeData = {} // statically types our stockData to TimeframData. This lets us add the different key valeus to our obj. We need stockData to be TimeframeData so that we can add the keys 

	const dataPromises: Promise<MarketData>[] = timeframes.map((timeframe: '1d' | '1w' | '1m' | '3m' | '1y' | '5y') => testGetAlpacaData(params.ticker, timeframe) // gets obj with bars and next_page_token
	)

	const data: MarketData[] = await Promise.all(dataPromises)
	data.forEach((obj, idx) => stockData[timeframes[idx]] = obj )

	return (
		<div className="flex p-4 justify-center w-screen h-screen">
			<div className='p-4 w-3/5'>
				<section>
					{/* portfolio chart and timeframes */}
					<MasterChartClient data={stockData} ticker={params.ticker} />
				</section>
				<section>
					{/* market value in portfolio, average cost, etc */}
				</section>
				<section className='w-full'>
					<div className='flex justify-between w-full border-b p-4'>
						<h1 className='text-xl'>Stock Lending</h1>
						<h3 className='underline text-xs'>Enroll in Stock Lending Program</h3>
					</div>
					<p className='p-4 text-sm'>{"You're currently not taking advantage of an income opportunity. You could change that today."}</p>
					{/* stock lending */}
				</section>
				<section>
					{/* want refresher on stocks? */}
				</section>
				<section>
					{/* About section */}
				</section>
				<section>
					{/* key statistics */}
				</section>
				<section>
					{/* news */}
					<NewsArticlesClient target={params.ticker} />
				</section>
			</div>
			<aside className='ml-2 border h-full w-1/4'>

			</aside>
		</div>
	)
}