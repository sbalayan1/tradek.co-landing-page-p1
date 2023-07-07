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


// news article interfaces

interface NewsImage {
	size: string,
	url: string
}

interface Article {
	id: number,
	author: string,
	content: string,
	created_at: string,
	headline: string,
	images: NewsImage[],
	source: string,
	summary: string,
	symbols: string[],
	updated_at: string,
	url: string
}

interface News {
	news: Article[]
}

export type { Profit, Quote, Stock, MarketData, WatchList, DiscoverMoreData, News, Article }