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


interface WatchList {
    id: number,
    icon: string,
    name: string,
    stocks: string[],
}

interface DiscoverMoreData {
	title: string,
	img: string,
	description: string
}

export type { Profit, Quote, Stock, MarketData, WatchList, DiscoverMoreData }