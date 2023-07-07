import "server-only" // this is a server component. we don't need to use a layout here because its format is not something shared across multiple pages
// import { Suspense } from "react";

import Articles from "./Dashboard/Components/Articles/Articles";
import BuyingPower from "./Dashboard/Components/BuyingPower/BuyingPower";
import StocksClientComponent from "./Dashboard/Components/Stocks/StocksClientComponent";
import PortfolioChartClientComponent from "./Dashboard/Components/PortfolioChart/PortfolioChartClientComponent"
import WatchListsServerComponent from "./Dashboard/Components/WatchList/WatchListsServerComponent";

// helper functions for building trade data. we don't need to include these in the client component. instead we can instantiate them on the server and pass them to the client
import { getSubData, buildData } from "./utils/UserDataUtils/buildPortfolioData";
import { getUserData } from "./utils/UserDataUtils/userData";
import { buildStockData } from "./utils/MarketDataUtils/getStocks";

import { Profit, Stock } from './globalInterfaces'
import DiscoverMoreClientComponent from "./Dashboard/Components/DiscoverMore/DiscoverMoreClientComponent";
import NewsArticlesClient from "./Dashboard/Components/NewsArticles/NewsArticlesClient";

export default async function Dashboard() {
    const mockPortfolioData: Profit[] = buildData()
    const initialData: Profit[] = getSubData("1m", mockPortfolioData)
    const stocks = await getUserData('positions')
    const stocksData: Stock[] = await buildStockData(stocks) 

		const discoverMoreImages = ['/vercel.svg', '/next.svg', '/icons8-feather-50.png']
		const discoverMoreTitles = [
			'Transfer accounts in',
			'Robinhood Gold',
			'Lend your stocks',
			'Retirement',
			'Reinvest dividends',
			'Recurring',
			'Earn up to 4.65% APY',
			'Crypto',
			'ETFs'
		]
		const discoverMoreDescriptions = [
			'Consolidate assets',
			'Get premium perks',
			'Potential to earn',
			'Get a 1% match',
			'Build investing habits',
			'Invest on a schedule',
			'On uninvested cash',
			'Browse coins'
		]

		const discoverMoreData = discoverMoreTitles.map((title, idx) => {
			const randomIdx = Math.floor(Math.random()*2)
			return (
				{
					title: title,
					description: discoverMoreDescriptions[idx],
					img: discoverMoreImages[randomIdx]
				}
			)
		})

    return (
        <div className="flex p-4 justify-center">
            {/* This div should be a column with multiple sections*/}
            <div className='p-4 w-3/5'> 

                {/* client component */}
                <section>
                    <PortfolioChartClientComponent mockPortfolioData={mockPortfolioData} initialData={initialData} />
                    <BuyingPower />
                </section>

                {/* this div contains the articles/notifications sent from rh.  */}
                <Articles />

                <section className="mt-10">
                    <h1 className='text-xl border-b p-4'>Discover more</h1>
										<DiscoverMoreClientComponent data={discoverMoreData}/>
                </section>

                {/* <section>
                    <h1 className='text-xl'>Trending Lists</h1>
                </section> */}
                <section>
                    <h1 className='text-xl border-b p-4'>News</h1>
										<NewsArticlesClient />
                </section>

            </div>

            {/* this contains the users portfolio information such as current options/stocks/watchlists etc */}
            <aside className="ml-2 border h-full">
							<div className="flex justify-between border-b-2 text-xl p-4">
									<h1 className='text-xl'>Stocks</h1>
							</div>
							<StocksClientComponent stocksData={stocksData} />
							<WatchListsServerComponent /> 
            </aside>
        </div>
    )
}