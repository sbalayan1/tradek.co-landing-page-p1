// this is a server component. we don't need to use a layout here because its format is not something shared across multiple pages

import ArticleList from "./Components/Articles/ArticleList";
import BuyingPower from "./Components/BuyingPower/BuyingPower";
import PortfolioChart from "./PortfolioChart";


export default function Dashboard() {
    return (
        <div className="flex w-screen p-4">
            {/* This div should be a column with multiple sections*/}
            <div className='border-2 w-3/4 p-4'> 

                {/* client component */}
                <section>
                    <h1 className='text-xl'>Portfolio Performance and Buying Power</h1>
                    <PortfolioChart />
                    <BuyingPower />
                </section>

                {/* this div contains the articles/notifications sent from rh.  */}
                <ArticleList />

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
            <aside className="ml-2 p-4 border-4">
                <div>
                    <h1 className='text-xl'>Current Positions</h1>
                </div>
                <section>
                    <h1 className='text-xl'>Lists</h1>
                </section>
            </aside>
        </div>
    )
}