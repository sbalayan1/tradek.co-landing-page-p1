'use client'
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

// needs to be a client component so that we can pass in specific stockData and render for our watchLists component
export default function StocksClientComponent({ stocksData }: { stocksData: Stock[] }) {
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