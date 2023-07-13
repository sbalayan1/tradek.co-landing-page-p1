import 'server-only'

import { getAlpacaData } from '@/app/utils/MarketDataUtils/getStocks'
import StockChart from './_Components/StockChart/StockChart'
import NewsArticlesClient from '@/app/Dashboard/Components/NewsArticles/NewsArticlesClient'

export default async function Page({ params }: { params: { ticker: string }}) {
	const stockData = await getAlpacaData(params.ticker)

	return (
		<div className="flex p-4 justify-center w-screen h-screen">
			<div className='p-4 w-3/5'>
				<section>
					{/* portfolio chart and timeframes */}
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