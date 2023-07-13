"use client"
import React, { useRef, useState } from 'react'

import Timeframes from './Timeframes';
import PortfolioGraph from './PortfolioGraph';

// import helper functions
import { getSubData, calculateProfit } from '../../../utils/UserDataUtils/buildPortfolioData';

import { Profit, TimeframeData, TimeframesType, MarketData } from '@/app/globalInterfaces';
import StockClientComponent from '../Stocks/StockClientComponent';
// import { useParams } from 'next/navigation';


function PortfolioChartClientComponent({ mockPortfolioData, initialData }: { mockPortfolioData: Profit[], initialData: Profit[] }) {
    const data = useRef(mockPortfolioData)
    const [selected, setSelected] = useState("1m")
    const [subData, setSubData] = useState(initialData)
    const [stats, setStats] = useState({
        profit: calculateProfit(subData),
        percentageChange: Math.floor((subData[subData.length - 1].balance - subData[0].balance)/subData.length)
    })

    const updateSubData = (timeframe: string) => {
        const updatedData = getSubData(timeframe, data.current)
        setSubData(updatedData)
        setSelected(timeframe)
        setStats({
            profit: calculateProfit(updatedData),
            percentageChange: Math.floor((updatedData[updatedData.length - 1].balance - updatedData[0].balance)/updatedData.length)
        })
    }

    return (
        <div className="mb-2">
            {/* Client component */}
            <div className="text-2xl">
                <h1 className={`${stats.profit > 0 ? "text-green" : "text-red"}`}>${stats.profit} in {selected}</h1>
                <h3 className={`${stats.profit > 0 ? "text-green" : "text-red"}`}>{stats.percentageChange}% in {selected}</h3>
            </div>
            {/* client component */}
            <div className="flex flex-col justify-center h-[22rem] w-full">
                <PortfolioGraph data={subData} profit={stats.profit}/>
            </div>
            {/* client component */}
            <Timeframes selected={selected} updateSubData={updateSubData}/>
        </div>
    )
}

///////// 7/12/23 NEED TO FIGURE OUT UNDEFINED ISSUES. FOR SOME REASON, DATA HAS POTENTIAL TO BE UNDEFINED LIKELY CAUSED BY TIMEFRAMEDATA TYPE

function StockChartClientComponent({ data, ticker }: { data: TimeframeData, ticker: string }) {
	const [selected, setSelected] = useState<TimeframesType>("1m")
  const [selectedData, setSelectedData] = useState<MarketData | undefined>(data[selected])

	const updateSelectedData = ((timeframe: TimeframesType) => {
		setSelectedData(data[timeframe])
		setSelected(timeframe)
		// setStats({
		// 		profit: calculateProfit(updatedData),
		// 		percentageChange: Math.floor((updatedData[updatedData.length - 1].balance - updatedData[0].balance)/updatedData.length)
		// })
	})

	return (
		<div className="mb-2">
            {/* Client component */}
				<div className="text-2xl">
						{/* <h1 className={`${stats.profit > 0 ? "text-green" : "text-red"}`}>${stats.profit} in {selected}</h1>
						<h3 className={`${stats.profit > 0 ? "text-green" : "text-red"}`}>{stats.percentageChange}% in {selected}</h3> */}
				</div>
				{/* client component */}
				<div className="flex flex-col justify-center h-[22rem] w-full">
						{selectedData && 
							<StockClientComponent stockName={ticker} stockData={selectedData.bars[ticker]}/>
						}
				</div>
				{/* client component */}
				<Timeframes selected={selected} updateSubData={updateSelectedData}/>
		</div>
	)
}

export { PortfolioChartClientComponent, StockChartClientComponent}