// this is a server component. we don't need to use a layout here because its format is not something shared across multiple pages
import Articles from "./Components/Articles/Articles";
import BuyingPower from "./Components/BuyingPower/BuyingPower";
import PortfolioChart from "./PortfolioChart"

// helper functions for building trade data. we don't need to include these in the client component. instead we can instantiate them on the server and pass them to the client

interface Profit {
    date: Date
    balance: number
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


interface MarketData {
    bars: Stock,
    next_page_token: string
}

export const createProfitLoss = (balance: number) => {
    const direction = Math.random()
    const amount = Math.floor(Math.random() * 100)
    balance = direction >= 0.5 ? balance + amount : balance - amount
    return balance
}

export const buildData = () => {
    const result: Profit[] = [{date: new Date('9/13/2020'), balance: 0}]
    const start: any = new Date('1/1/1970')
    const today: any = new Date()
    const oneDay = 1000*60*60*24 // calculates the number of milliseconds in one day

    for (let i = 0; i < 1000; i++) {
        const current = result[i]
        const daysPrior = oneDay * (1000 - i - 1)
        const pastDate = new Date(today - start - daysPrior)

        // creates the NEXT obj in the list
        const obj: Profit = {
            date: pastDate,
            balance: createProfitLoss(current.balance)
        }
        result.push(obj)
    }

    return result
}

export const getSubData = (tgt: string, arr: Profit[]) => {
    if (tgt === "1d") return arr.slice(-2)
    if (tgt === "1w") return arr.slice(-7)
    if (tgt === "1m") return arr.slice(-30)
    if (tgt === "3m") return arr.slice(-90)
    if (tgt === "YTD") return arr.slice(-266)
    if (tgt === "1y") return arr.slice(-365)
    return arr.slice()
}

export const calculateProfit = (arr: Profit[]) => {
    let result = 0
    for (let i = 1; i<arr.length; i++) {
        const curr = arr[i]
        const prev = arr[i-1]
        result += curr.balance - prev.balance 
    }

    return result
}



export default function Dashboard({ data }: { data: MarketData }) {
    return (
        <div className="flex p-4 justify-center">
            {/* This div should be a column with multiple sections*/}
            <div className='border-2 p-4 w-1/2'> 

                {/* client component */}
                <section>
                    {/* <h1 className='text-xl'>Portfolio Performance and Buying Power</h1> */}
                    {/* <h1 className="text-white">The data should be here: {data}</h1> */}
                    <PortfolioChart />
                    <BuyingPower />
                </section>

                {/* this div contains the articles/notifications sent from rh.  */}
                <Articles />

                <section>
                    <h1 className='text-xl'>Discover more</h1>
                </section>

                <section>
                    <h1 className='text-xl'>Trending Lists</h1>
                </section>
                <section>
                    <h1 className='text-xl'>News</h1>
                    {/* renders news articles */}
                </section>

            </div>

            {/* this contains the users portfolio information such as current options/stocks/watchlists etc */}
            <aside className="ml-2 p-4 border-4 w-1/6">
                <div>
                    <h1 className='text-xl'>Current Positions</h1>
                </div>
                <section>
                    <h1 className='text-xl'>Lists</h1>
                    {Object.keys(data['bars'])}: {data['bars']['AAPL'][0]['o']}
                </section>
            </aside>
        </div>
    )
}