import "server-only"
import { getData } from "../MarketDataUtils/getData"
import StockClientComponent from "./StockClientComponent"


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


interface MarketData {
    bars: Stock,
    next_page_token: string
}

export default async function StocksContainer() {
    const stocks = ['AAPL', 'TSLA', 'QQQ', 'SPY', 'PLTR', 'NVDA', 'AI'] // a users stocks can be fetched on the server. 
    const promises: Promise<MarketData>[] = stocks.map(stock => getData(stock)) // create an array of promises
    const data: MarketData[] = await Promise.all(promises) // fetch 1 minute performance over the entire day concurrently
    const stockData: Stock[] = data.map(obj => obj.bars) // return an array of Stocks

    {/* renders a list of server components with a nested client component */}
    return (
        <div className="p-4">
            {stocks.map((stock, idx) => {
                return(
                    <div key={stock} className="flex w-80 justify-between">
                        <h1>{stock}</h1>
                        <StockClientComponent stock={stock} fetchedData={stockData[idx]} />
                    </div>
                ) 
            })}
        </div>
    )
}