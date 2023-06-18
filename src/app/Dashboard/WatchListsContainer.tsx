"use client"
import { useState } from 'react'
import CreateWatchListComponent from "./Components/CreateWatchList/CreateWatchListComponent"
import WatchListClientComponent from './Components/WatchList/WatchListClient'
// import WatchListClientComponent from "./WatchListClient"
// import WatchListClientComponent from './Components/WatchList/WatchListsClient'
import { getUserData } from "../UserDataUtils/getUserData"
import { buildStockData } from "../MarketDataUtils/getStocks"
import { postWatchListData } from '../UserDataUtils/postWatchListData'


interface WatchList {
    id: number,
    icon: string,
    name: string,
    stocks: string[],
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

// data is fetched on the server on the pages initial render and is passed into the client component
// data is used to hydrate initial state
// when we add a new watchlist, we invoke addWatchList
// addWatchList updates the server using a server-side function and returns a json response
// using the json response, we use our server side function, buildStockData, to fetch stock data from Alpaca's API
// finally after all server side requests are complete, update the state of watchLists and watchListsStocks

// note the above can be consolidate into one function so that our stocks array within watchlists alredy includes a key value for the data

export default function WatchListsContainer({ watchListsData, watchListsStocksData }: { watchListsData: WatchList[], watchListsStocksData: Stock[][] }) {
    const [watchLists, setWatchLists] = useState(watchListsData)
    const [watchListsStocks, setWatchListsStocks] = useState(watchListsStocksData)

    const addWatchList = async () => {
        const watchListRes = await postWatchListData()
        const watchListStockData = await buildStockData(watchListRes.stocks)
        setWatchLists([...watchLists, watchListRes])
        setWatchListsStocks([...watchListsStocks, watchListStockData])
    }

    return (
        <div>
             <div className="flex justify-between p-4 border-2">
                <h1 className='text-xl'>Lists</h1>
                <CreateWatchListComponent addWatchList={addWatchList} />
            </div>
                {watchLists.map((watchlist, idx) => <WatchListClientComponent key={idx} watchlist={watchlist} watchListStocks={watchListsStocks[idx]} />)}

            {/* within each render, we'll have a ternary that displays the watchlist's stocks as well as an isOpen state for opening and closing the watchlist*/}
        </div>
    )
}