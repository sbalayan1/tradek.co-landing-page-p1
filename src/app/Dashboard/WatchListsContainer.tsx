import "server-only"

import CreateWatchListComponent from "./Components/CreateWatchList/CreateWatchListComponent"
import StockClientComponent from './StockClientComponent'
import WatchListsClientComponent from './Components/WatchList/WatchListsClient'
import { getUserData } from "../UserDataUtils/getUserData"
import { buildStockData } from "../MarketDataUtils/getStocks"


interface WatchList {
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


export default async function WatchListsContainer() {
    // // watchlists will be an array of watchlist names. each watchlist will contain an array of stock names
    // const [watchLists, setWatchLists] = useState(initialWatchList)
    const initialWatchList: WatchList[] = await getUserData('watchlists')

    // iterate over watchlist array
    const promises: Promise<Stock[]>[] = initialWatchList.map((watchList: WatchList) => buildStockData(watchList.stocks)) // grab each stock array and pass to buildStockData
    const watchListsStocks: Stock[][] = await Promise.all(promises) // pass array of promises to Promise.all to fetch concurrently and set result to stockData


    return (
        <div>
             <div className="flex justify-between p-4 border-2">
                <h1 className='text-xl'>Lists</h1>
                <CreateWatchListComponent />
            </div>
            <WatchListsClientComponent initialWatchList={initialWatchList} watchListsStocks={watchListsStocks}/>
           
            {/* within each render, we'll have a ternary that displays the watchlist's stocks as well as an isOpen state for opening and closing the watchlist*/}
        </div>
    )
}