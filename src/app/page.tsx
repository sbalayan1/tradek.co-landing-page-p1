import "server-only"
import Dashboard from "./Dashboard/Dashboard";
import { getData } from "./Dashboard/Components/PortfolioChart/MarketData/utils/getData";

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

export default async function Page() {
    const data: MarketData = await getData()
    console.log(data['bars'])
    return (
        <Dashboard data={data}/>
        // <h1>Hello world</h1>
    )
}