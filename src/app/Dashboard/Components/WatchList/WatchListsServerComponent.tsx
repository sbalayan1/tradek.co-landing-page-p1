// this component wraps the WatchListsClientComponent so that we can use streaming 
import WatchListsClientComponent from "./WatchListsClientComponent"
import { getUserData } from "../../../UserDataUtils/userData"
import { buildStockData } from "../../../MarketDataUtils/getStocks"

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

export default async function WatchListsServerComponent() {
    const userWatchLists: WatchList[] = await getUserData('watchlists')
    const watchListsStocks: Stock[][] = await Promise.all(userWatchLists.map((watchList: WatchList) => buildStockData(watchList.stocks)))

    return (<WatchListsClientComponent watchListsData={userWatchLists} watchListsStocksData={watchListsStocks}/>)
}