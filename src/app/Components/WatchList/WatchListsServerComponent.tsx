// this component wraps the WatchListsClientComponent so that we can use streaming 

// import components
import WatchListsClientComponent from "./WatchListsClientComponent"

// import helper functions
import { getUserData } from "@/app/utils/UserDataUtils/userData"
import { buildStockData } from "@/app/utils/MarketDataUtils/getStocks"

// import typescript types
import { WatchList, Stock } from '@/app/globalInterfaces'


export default async function WatchListsServerComponent() {
    const userWatchLists: WatchList[] = await getUserData('watchlists')
    const watchListsStocks: Stock[][] = await Promise.all(userWatchLists.map((watchList: WatchList) => buildStockData(watchList.stocks)))

    return (<WatchListsClientComponent watchListsData={userWatchLists} watchListsStocksData={watchListsStocks}/>)
}