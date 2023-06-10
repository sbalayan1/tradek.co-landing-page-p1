"use client"
import { useEffect, useRef, useState } from 'react'
import PortfolioGraph from "./Components/PortfolioChart/PortfolioGraph";
import Timeframes from "./Components/PortfolioChart/Timeframes";

interface Profit {
    date: Date
    balance: number
}

const createProfitLoss = (balance: number) => {
    const direction = Math.random()
    const amount = Math.floor(Math.random() * 100)
    balance = direction >= 0.5 ? balance + amount : balance - amount
    return balance
}

const buildData = () => {
    const result: Profit[] = [{date: new Date('9/13/2020'), balance: 0}]
    const start: any = new Date('1/1/1970')
    const today: any = new Date()
    const oneDay = 1000*60*60*24 // calculates the number of milliseconds in one day

    for (let i = 0; i < 1000; i++) {
        const current = result[i]
        const daysPrior = oneDay * (1000 - i - 1)
        const pastDate = new Date(today - start - daysPrior)

        // creates the NEXT obj in the list
        const obj: Profit = {
            date: pastDate,
            balance: createProfitLoss(current.balance)
        }
        result.push(obj)
    }

    return result
}

const getSubData = (tgt: string, arr: Profit[]) => {
    if (tgt === "1d") return arr.slice(-1)
    if (tgt === "1w") return arr.slice(-7)
    if (tgt === "1m") return arr.slice(-30)
    if (tgt === "3m") return arr.slice(-90)
    if (tgt === "YTD") return arr.slice(-266)
    if (tgt === "1y") return arr.slice(-365)
    return arr.slice()
}

const calculateProfit = (arr: Profit[]) => {
    let result = 0
    for (let i = 1; i<arr.length; i++) {
        const curr = arr[i]
        const prev = arr[i-1]
        result += curr.balance - prev.balance 
    }

    return result
}


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
            <div className="">
                <h1>${stats.profit} in {selected}</h1>
                <h3>{stats.percentageChange}% in {selected}</h3>
            </div>
            {/* client component */}
            <div className="border-2">
                <PortfolioGraph data={subData}/>
            </div>
            {/* client component */}
            <Timeframes selected={selected} updateSubData={updateSubData}/>
        </div>
    )
}