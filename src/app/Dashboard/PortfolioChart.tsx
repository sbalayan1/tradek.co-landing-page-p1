"use client"
import React, { useEffect, useRef, useState } from 'react'
import PortfolioGraph from "./Components/PortfolioChart/PortfolioGraph";
import Timeframes from "./Components/PortfolioChart/Timeframes";

// import helper functions
import { buildData, getSubData, calculateProfit } from './Dashboard';

export default function PortfolioChart() {
    const data = useRef(buildData())
    const [selected, setSelected] = useState("1m")
    const [subData, setSubData] = useState(getSubData(selected, data.current))
    const [stats, setStats] = useState({
        profit: 0,
        percentageChange: 0
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

    useEffect(() => {
        setStats({
            profit: calculateProfit(subData),
            percentageChange: Math.floor((subData[subData.length - 1].balance - subData[0].balance)/subData.length)
        })
    }, [subData])

    return (
        <div className="mb-2">
            {/* Client component */}
            <div className="text-2xl">
                <h1 className={`${stats.profit > 0 ? "text-green-500" : "text-red-500"}`}>${stats.profit} in {selected}</h1>
                <h3 className={`${stats.profit > 0 ? "text-green-500" : "text-red-500"}`}>{stats.percentageChange}% in {selected}</h3>
            </div>
            {/* client component */}
            <div className="flex flex-col justify-center h-[32rem]">
                <PortfolioGraph data={subData} />
            </div>
            {/* client component */}
            <Timeframes selected={selected} updateSubData={updateSubData}/>
        </div>
    )
}