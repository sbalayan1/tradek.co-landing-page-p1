import "server-only" // this is a server component. we don't need to use a layout here because its format is not something shared across multiple pages
import { Suspense } from "react";

import Articles from "./Dashboard/Components/Articles/Articles";
import BuyingPower from "./Dashboard/Components/BuyingPower/BuyingPower";
import StocksClientComponent from "./Dashboard/Components/Stocks/StocksClientComponent";
import PortfolioChartClientComponent from "./Dashboard/Components/PortfolioChart/PortfolioChartClientComponent"
import WatchListsServerComponent from "./Dashboard/Components/WatchList/WatchListsServerComponent";

// helper functions for building trade data. we don't need to include these in the client component. instead we can instantiate them on the server and pass them to the client
import { getSubData, buildData } from "./UserDataUtils/buildPortfolioData";
import { getUserData } from "./UserDataUtils/userData";
import { buildStockData } from "./MarketDataUtils/getStocks";

import { Profit, Stock } from './globalInterfaces'
import Loading from "./loading";


export default async function Dashboard() {
    const mockPortfolioData: Profit[] = buildData()
    const initialData: Profit[] = getSubData("1m", mockPortfolioData)
    const stocks = await getUserData('positions')
    const stocksData: Stock[] = await buildStockData(stocks) 

    return (
        // <Loading />
        <div className="flex p-4 justify-center">
            {/* This div should be a column with multiple sections*/}
            <div className='p-4 w-1/2'> 

                {/* client component */}
                <section>
                    <PortfolioChartClientComponent mockPortfolioData={mockPortfolioData} initialData={initialData} />
                    <BuyingPower />
                </section>

                {/* this div contains the articles/notifications sent from rh.  */}
                <Articles />

                <section>
                    <h1 className='text-xl'>Discover more</h1>
                </section>

                <section>
                    <h1 className='text-xl'>Trending Lists</h1>
                </section>
                <section>
                    <h1 className='text-xl'>News</h1>
                    {/* renders news articles */}
                </section>

            </div>

            {/* this contains the users portfolio information such as current options/stocks/watchlists etc */}
            <aside className="ml-2 border-2">
                {/* <section className="border-2"> */}
                    <div className="flex justify-between border-b-2 text-xl p-4">
                        <h1 className='text-xl'>Stocks</h1>
                    </div>
                    <StocksClientComponent stocksData={stocksData} />
                    <Suspense fallback={<p>Loading...</p>}>                    
                        <WatchListsServerComponent />
                    </Suspense>

            </aside>
        </div>
    )
}