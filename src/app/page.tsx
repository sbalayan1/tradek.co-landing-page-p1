import "server-only" // this is a server component. we don't need to use a layout here because its format is not something shared across multiple pages

import Articles from "./Dashboard/Components/Articles/Articles";
import BuyingPower from "./Dashboard/Components/BuyingPower/BuyingPower";
import StocksContainer from "./Dashboard/StocksClientComponent";
import PortfolioChart from "./Dashboard/PortfolioChartClientComponent"

// helper functions for building trade data. we don't need to include these in the client component. instead we can instantiate them on the server and pass them to the client

import { getSubData, buildData } from "./UserDataUtils/buildPortfolioData";
import WatchListsContainer from "./Dashboard/WatchListsClientComponent";
import { getUserData } from "./UserDataUtils/userData";
import { buildStockData, getAlpacaData } from "./MarketDataUtils/getStocks";

interface Profit {
    date: Date
    balance: number
}

interface Quote {
    t: string,
    o: number,
    h: number,
    l: number,
    c: number,
    v: number,
    n: number
    vw: number
}

interface Stock {
    [key: string]: Quote[]
}

interface WatchList {
    id: number,
    icon: string,
    name: string,
    stocks: string[],
}

export default async function Dashboard() {
    const mockPortfolioData: Profit[] = buildData()
    const initialData: Profit[] = getSubData("1m", mockPortfolioData)

    // fetch data concurrently
    const userWatchLists: Promise<WatchList[]> = getUserData('watchlists') 
    const userPositions: Promise<string[]> = getUserData('positions')
    const [watchLists, stocks] = await Promise.all([userWatchLists, userPositions])

    // this can be fixed*******
        // need to test performance using basic awaits or aggregating into a concurrent Promise.all
    const stocksPromise: Promise<Stock[]> = buildStockData(stocks)
    const watchListsPromise: Promise<Stock[]>[] = watchLists.map((watchList: WatchList) => buildStockData(watchList.stocks))
    watchListsPromise.push(stocksPromise) // create an array of Promise<Stock[]>
    const watchListsStocks = await Promise.all(watchListsPromise) // resolve concurrently and assign array to a variable
    const stocksData = watchListsStocks.pop() // remove the last element which we pushed as a promise



    return (
        <div className="flex p-4 justify-center">
            {/* This div should be a column with multiple sections*/}
            <div className='p-4 w-1/2'> 

                {/* client component */}
                <section>
                    <PortfolioChart mockPortfolioData={mockPortfolioData} initialData={initialData} />
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
                    <StocksContainer stocksData={stocksData} />
                    <WatchListsContainer watchListsData={watchLists} watchListsStocksData={watchListsStocks} />
                {/* </section> */}
            </aside>
        </div>
    )
}