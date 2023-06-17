import "server-only"
import StockClientComponent from "./StockClientComponent"
import { getUserData } from "../UserDataUtils/getUserData"
import { buildStockData } from "../MarketDataUtils/getStocks"


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


export default async function StocksContainer() {
    const stocks = await getUserData('positions')
    const stocksData = await buildStockData(stocks)

    {/* renders a list of server components with a nested client component */}
    return (
        <div className="p-4">
            {stocksData.map((stock: Stock) => {
                const stockName = Object.keys(stock)[0]
                return(
                    <div key={stockName} className="flex w-80 justify-between">
                        <h1>{stockName}</h1>
                        <StockClientComponent stockName={stockName} stockData={stock[stockName]} />
                    </div>
                ) 
            })}
        </div>
    )
}