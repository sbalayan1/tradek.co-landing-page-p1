// this component wraps the WatchListsClientComponent so that we can use streaming 
import WatchListsClientComponent from "./WatchListsClientComponent"
import { getUserData } from "../../../UserDataUtils/userData"
import { buildStockData } from "../../../MarketDataUtils/getStocks"

import { WatchList, Stock } from '@/app/globalInterfaces'


export default async function WatchListsServerComponent() {
    const userWatchLists: WatchList[] = await getUserData('watchlists')
    const watchListsStocks: Stock[][] = await Promise.all(userWatchLists.map((watchList: WatchList) => buildStockData(watchList.stocks)))

    return (<WatchListsClientComponent watchListsData={userWatchLists} watchListsStocksData={watchListsStocks}/>)
}