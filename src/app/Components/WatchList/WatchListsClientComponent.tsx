"use client"
import { useState } from 'react'

// import components
import CreateWatchListComponent from "../CreateWatchList/CreateWatchListComponent"
import WatchListClientComponent from './WatchListClient'

// import helper functions
import { buildStockData } from '@/app/utils/MarketDataUtils/getStocks'
import { postWatchListData } from '@/app/utils/UserDataUtils/userData'

// import typescript types
import { WatchList, Stock } from '@/app/globalInterfaces'


// data is fetched on the server on the page's initial render and is passed into the client component
// data is used to hydrate initial state
// when we add a new watchlist, we invoke addWatchList
// addWatchList updates the server using a server-side function and returns a json response
// using the json response, we use our server side function, buildStockData, to fetch stock data from Alpaca's API
// finally after all server side requests are complete, update the state of watchLists and watchListsStocks

// note the above can be consolidate into one function so that our stocks array within watchlists alredy includes a key value for the data

export default function WatchListsClientComponent({ watchListsData, watchListsStocksData }: { watchListsData: WatchList[], watchListsStocksData: Stock[][] }) {
    const [watchLists, setWatchLists] = useState(watchListsData)
    const [watchListsStocks, setWatchListsStocks] = useState(watchListsStocksData)

    const addWatchList = async (name: string) => {
			const watchListRes = await postWatchListData(name)
			const watchListStockData = await buildStockData(watchListRes.stocks)
			setWatchLists([...watchLists, watchListRes])
			setWatchListsStocks([...watchListsStocks, watchListStockData])
    }

    return (
        <div>
             <div className="flex justify-between p-4 border-t border-b">
                <h1 className='text-xl'>Lists</h1>
                <CreateWatchListComponent addWatchList={addWatchList} />
            </div>
            {watchLists.map((watchlist, idx) => <WatchListClientComponent key={idx} watchlist={watchlist} watchListStocks={watchListsStocks[idx]} />)}
        </div>
    )
}