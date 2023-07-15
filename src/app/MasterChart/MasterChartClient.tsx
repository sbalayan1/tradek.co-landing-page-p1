"use client"
import React, { useRef, useState } from 'react'

// import components
import Timeframes from './Timeframes';
import Graph from './Graph';

// import helper functions
import { getSubData, calculateProfit, calculatePercentageChange, isValidProfitData  } from '../utils/UserDataUtils/buildPortfolioData';

// import typescript types
import { Profit, TimeframeData, TimeframesType, Quote } from '@/app/globalInterfaces';

// displayed data isn't exactly perfect. seems we should be displaying data at the open and close. right now, we include premarket data which is why performance is slightly off


export default function MasterChartClient({ data, ticker }: { data: Profit[] | TimeframeData , ticker: string | undefined}) {
	const chartData = useRef(data) // data is non-changing so there's no need to useState
	const [selected, setSelected] = useState<TimeframesType>("1m")
	const [subData, setSubData] = useState((): Profit[] | Quote[] | undefined  => {
		if (Array.isArray(chartData.current)) return getSubData(selected, chartData.current)
		if (ticker) return chartData.current[selected]?.bars[ticker]
	})

	const [stats, setStats] = useState({
		profit: calculateProfit(subData), 
		percentageChange: calculatePercentageChange(subData)
	})

	const updateSubData = (timeframe: TimeframesType) => {
		// check if chartData is an array. If it is, then we know we're working with Profit[]
		let updatedData;
		if (Array.isArray(chartData.current)) updatedData = getSubData(timeframe, chartData.current) 
		if (ticker && !Array.isArray(chartData.current)) updatedData = chartData.current[timeframe]?.bars[ticker]

		setSubData(updatedData)
		setStats({
			profit: calculateProfit(updatedData),
			percentageChange: calculatePercentageChange(updatedData)
		})

		setSelected(timeframe)
	}

	return (
		<div className="mb-2">
				<div className="text-2xl">
						{ticker && <h1 className={`${stats.profit > 0 ? "text-green" : "text-red"}`}>{ticker}</h1>}
						{ticker && subData && !isValidProfitData(subData) && <h1 className={`${stats.profit > 0 ? "text-green" : "text-red"}`}>{subData[subData.length-1].c}</h1>}
						<p className={`${stats.profit > 0 ? "text-green" : "text-red"} text-base`}>${stats.profit} in {selected}</p>
						<p className={`${stats.profit > 0 ? "text-green" : "text-red"} text-base`}>{stats.percentageChange}% in {selected}</p>
				</div>
				<div className="flex flex-col justify-center h-[18rem] w-full">
					{/* checking if subData exists remove the potential for undefined data to be displayed */}
					{subData && <Graph data={subData} profit={stats.profit}/>}
				</div>
				<Timeframes selected={selected} updateSubData={updateSubData} ticker={ticker}/>
		</div>
	)
}

