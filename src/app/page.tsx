import "server-only" // this is a server component. we don't need to use a layout here because its format is not something shared across multiple pages

import Articles from "./Dashboard/Components/Articles/Articles";
import BuyingPower from "./Dashboard/Components/BuyingPower/BuyingPower";
// import PortfolioContainer from "./Dashboard/test";
import StocksContainer from "./Dashboard/StocksContainer";
import PortfolioChart from "./Dashboard/PortfolioChart"
// import WatchListButton from "./Dashboard/Components/CreateWatchList/CreateWatchListButton";

// helper functions for building trade data. we don't need to include these in the client component. instead we can instantiate them on the server and pass them to the client
// import { getDat } from "./MarketDataUtils/getData";

// import { getData } from "./MarketDataUtils/getData";
import { getSubData, buildData } from "./helpers";
import CreateWatchListComponent from "./Dashboard/Components/CreateWatchList/CreateWatchListComponent";
import WatchListsContainer from "./Dashboard/WatchListsContainer";
import { getData } from "./MarketDataUtils/getData";

interface Profit {
    date: Date
    balance: number
}

// interface Quote {
//     t: string,
//     o: number,
//     h: number,
//     l: number,
//     c: number,
//     v: number,
//     n: number
//     vw: number
// }

// interface Stock {
//     [key: string]: Quote[]
// }

interface WatchList {
    icon: string,
    name: string,
    stocks: string[],
    isOpen: boolean
}

export default async function Dashboard() {
    const mockPortfolioData: Profit[] = buildData()
    const initialData: Profit[] = getSubData("1m", mockPortfolioData)
    const initialWatchList: WatchList[] = [
        {
            icon: '/next.svg',
            name: 'Example 1',
            stocks: ['TSLA', 'GME', 'AMC', 'AMD'],
            isOpen: false
        }
    ]

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
            <aside className="ml-2 ">
                <section className="border-2">
                    <div className="flex justify-between border-b-2 text-xl p-4">
                        <h1 className='text-xl'>Stocks</h1>
                    </div>
                    <StocksContainer />
                    <WatchListsContainer initialWatchList={initialWatchList}/>
                        {/* map over the initial watchlist and display an array of StocksContainers. When a watchlist changes or state and the initialWatchList are different, display state instead of children? */}
                </section>
            </aside>
        </div>
    )
}