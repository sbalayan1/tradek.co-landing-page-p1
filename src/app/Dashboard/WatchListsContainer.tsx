"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import CreateWatchListComponent from "./Components/CreateWatchList/CreateWatchListComponent"
import StockClientComponent from './StockClientComponent'


interface WatchList {
    icon: string,
    name: string,
    stocks: string[],
    isOpen: boolean
}


export default function WatchListsContainer({ initialWatchList }: { initialWatchList: WatchList[]}) {
    // watchlists will be an array of watchlist names. each watchlist will contain an array of stock names
    const [watchLists, setWatchLists] = useState(initialWatchList)

    const handleDisplayWatchlist = (tgt: WatchList, setter: Function, idx: number) => {
        const copy: WatchList = {...tgt}
        copy.isOpen = !copy.isOpen
        setter((watchLists: WatchList[]) => {
            watchLists[idx] = copy
            return watchLists
        })   
    }

    return (
        <React.Fragment>
             <div className="flex justify-between p-4 border-2">
                <h1 className='text-xl'>Lists</h1>
                <CreateWatchListComponent />
            </div>
            {watchLists.map((watchlist, idx) => {
                return (
                    <div key={watchlist.name} className="p-4">
                        <div className="flex justify-between">
                            <div className="flex w-1/2 justify-evenly">
                                <Image className="bg-white" src={watchlist.icon} alt="temp logo" height={30} width={30} />
                                <h1>{watchlist.name}</h1>
                            </div>
                            <button onClick={() => handleDisplayWatchlist(watchlist, setWatchLists, idx)}>
                                {watchlist.isOpen ? '-': '+'}
                            </button>
                        </div>
                    </div>
                )           
            })}
            {/* within each render, we'll have a ternary that displays the watchlist's stocks as well as an isOpen state for opening and closing the watchlist*/}
        </React.Fragment>
    )
}