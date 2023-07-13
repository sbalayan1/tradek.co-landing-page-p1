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


// assets interfaces
interface Asset {
	id: string,
	class: string,
	exchange: string,
	symbol: string,
	name: string,
	status: string,
	tradable: boolean,
	marginable: boolean,
	maintenance_margin_requirement: number,
	shortable: boolean,
	easy_to_borrow: boolean,
	fractionable: boolean,
	attributes: [],
	[key: string]: any
}


// timeframe types

type TimeframesType = '1d' | '1w' | '1m' | '3m' | '1y' | '5y'
// the below creates a Mapped Type of the Timeframes type. under the hood we have 
	// type TimeframeData = {
	// 	"1d"?: MarketData[] | undefined;
	// 	"1w"?: MarketData[] | undefined;
	// 	"1m"?: MarketData[] | undefined;
	// 	"3m"?: MarketData[] | undefined;
	// 	"1y"?: MarketData[] | undefined;
	// 	"5y"?: MarketData[] | undefined;
type TimeframeData = {
	[Property in TimeframesType]?: MarketData // https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
}

export type { Profit, Quote, Stock, MarketData, WatchList, DiscoverMoreData, News, Article, Asset, TimeframeData, TimeframesType }