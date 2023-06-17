"use client"
import React, { useState } from 'react'
import WatchListClientComponent from "./WatchListClient"


interface WatchList {
    icon: string,
    name: string,
    stocks: string[],
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

export default function WatchListsClientComponent({ initialWatchList, watchListsStocks }: { initialWatchList: WatchList[], watchListsStocks: Stock[][] }) {
    const [watchLists, setWatchLists] = useState(initialWatchList)

    return (
        <React.Fragment>
            {watchLists.map((watchlist, idx) => <WatchListClientComponent key={idx} watchlist={watchlist} watchListStocks={watchListsStocks[idx]} />)}
        </React.Fragment>
    )
}