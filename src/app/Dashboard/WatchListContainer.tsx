import Stock from "./Components/Portfolio/Stock"

export default function WatchListContainer() {
    const stocks = ['AAPL', 'TSLA', 'QQQ', 'SPY']
    return (
        <div>
            WatchlistContainer
            {stocks.map(stock => {
                return(
                    <div key={stock} className="flex justify-between">
                        <h1>{stock}</h1>
                        <Stock stock={stock} />
                    </div>
                ) 
            })}
        </div>
    )
}