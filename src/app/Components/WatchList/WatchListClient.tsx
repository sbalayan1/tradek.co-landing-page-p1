"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import StocksContainer from '../Stocks/StocksClientComponent'

import { WatchList, Stock } from '@/app/globalInterfaces'


export default function WatchListClientComponent({ watchlist, watchListStocks }: { watchlist: WatchList, watchListStocks: Stock[] }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <React.Fragment>
					<div key={watchlist.name} className="p-4">
							<div className="flex justify-between">
									<div className="flex w-1/2" onClick={() => setIsOpen(!isOpen)}>
											<Image className="bg-white" src={watchlist.icon} alt="temp logo" height={30} width={30} />
											<h1 className="ml-4">{watchlist.name}</h1>
									</div>
									<button onClick={() => setIsOpen(!isOpen)}>{isOpen ? '-': '+'}</button>
							</div>
					</div>
					{isOpen && <StocksContainer stocksData={watchListStocks}/>}
        </React.Fragment>
    )
}