import 'server-only'

// import components
import MasterChartClient from '@/app/MasterChart/MasterChartClient'
import NewsArticlesClient from '@/app/Components/NewsArticles/NewsArticlesClient'

// import interfaces
import { MarketData, TimeframeData } from '@/app/globalInterfaces'

// import helpers
import { testGetAlpacaData } from '@/app/utils/MarketDataUtils/getStocks'

export default async function Page({ params }: { params: { ticker: string }}) {
	// make concurrent requests for a stocks 1d, 1w, 1m, 3m, 1y, and 5y data
	const timeframes = ['1d', '1w', '1m', '3m', '1y', '5y'] as const // turns the array of keys into a tuple. This changes the type from string[] to ['1d', '1w', '1m', '3m', '1y', '5y']
	let stockData: TimeframeData = {} // statically types our stockData to TimeframData. This lets us add the different key valeus to our obj. We need stockData to be TimeframeData so that we can add the keys 
	const dataPromises: Promise<MarketData>[] = timeframes.map((timeframe: '1d' | '1w' | '1m' | '3m' | '1y' | '5y') => testGetAlpacaData(params.ticker, timeframe)) // gets obj with bars and next_page_token

	const data: MarketData[] = await Promise.all(dataPromises)
	data.forEach((obj, idx) => stockData[timeframes[idx]] = obj)

	return (
		<div className="flex p-4 justify-center w-screen h-screen">
			<div className='p-4 w-3/5'>
				<section>
					<MasterChartClient data={stockData} ticker={params.ticker} />
				</section>
				<section className='border-t py-7 w-full flex justify-between mb-4'>
					{/* market value in portfolio, average cost, etc */}
					<div className='border w-1/2 p-6 mr-2 rounded-sm'>
						<div className='w-full flex flex-col'>
							<h3 className='text-sm text-gray-300'>Your market value</h3>
							<h2 className='text-2xl'>$100</h2>
						</div>
						<div className='flex w-full justify-between border-b py-2'>
							<h3 className='text-sm text-gray-300'>{"Today's return"}</h3>
							<h3 className='text-sm text-gray-300'>{"+$0.25 (+0.10%)"}</h3>
						</div>
						<div className='flex w-full justify-between py-2'>
							<h3 className='text-sm text-gray-300'>Total return</h3>
							<h3 className='text-sm text-gray-300'>{"+$11.63 (+4.82%)"}</h3>
						</div>
					</div>
					<div className='border w-1/2 p-6 rounded-sm'>
						<div className='w-full flex flex-col'>
							<h3 className='text-sm text-gray-300'>Your average cost</h3>
							<h2 className='text-2xl'>$181.96</h2>
						</div>
						<div className='flex w-full justify-between border-b py-2'>
							<h3 className='text-sm text-gray-300'>Shares</h3>
							<h3 className='text-sm text-gray-300'>1.325559</h3>
						</div>
						<div className='flex w-full justify-between py-2'>
							<h3 className='text-sm text-gray-300'>Portfolio diversity</h3>
							<h3 className='text-sm text-gray-300'>59.85%</h3>
						</div>
					</div>
				</section>
				<section className='w-full mb-8'>
					<div className='flex justify-between items-center w-full border-b py-4'>
						<h1 className='text-2xl'>Stock Lending</h1>
						<h3 className='underline text-xs'>Enroll in Stock Lending Program</h3>
					</div>
					<p className='p-4 text-sm'>{"You're currently not taking advantage of an income opportunity. You could change that today."}</p>
					{/* stock lending */}
				</section>
				<section className='border rounded-md flex items-center mb-10'>
					<div className='w-1/6 h-full flex justify-center items-center p-4'>the image goes here</div>
					<div className='w-5/6 text-sm p-4'>
						<div className='flex justify-between w-full mb-2'>
							<h3 className='text-gray-500'>Want a refresher on stocks?</h3>
							<button>X</button>
						</div>
						<p className='mb-5'>Take a minute to learn the lingo and grow your confidence as an investor.</p>
						<button className='underline'>Review the basics</button>
					</div>
				</section>
				<section className='w-full'>
					<div className='py-4 border-b w-full text-2xl'>
						<h1>About</h1>
					</div>
					<div className='w-full py-4'>
						<p className='text-sm text-gray-200'>
							Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other varieties of related services. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific.  
							<button className='text-red'>Show More</button>
						</p>
					</div>
					<div className='flex w-full text-sm'>
						<div className='py-2 mr-28'>
							<h3>CEO</h3>
							<h3 className='text-gray-200'>Tim Cook</h3>
						</div>
						<div className='py-2 mr-28'>
							<h3>Employees</h3>
							<h3 className='text-gray-200'>164,000</h3>
						</div>
						<div className='py-2 mr-28'>
							<h3>Headquarters</h3>
							<h3 className='text-gray-200'>Cupertino, California</h3>
						</div>
						<div className='py-2 mr-28'>
							<h3>Founded</h3>
							<h3 className='text-gray-200'>1976</h3>
						</div>
					</div>
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