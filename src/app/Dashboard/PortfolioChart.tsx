"use client"
import { useState } from 'react'
import PortfolioGraph from "./Components/PortfolioChart/PortfolioGraph";
import Timeframes from "./Components/PortfolioChart/Timeframes";

export default function PortfolioChart() {
    const [selected, setSelected] = useState("1m")

    return (
        <div className="mb-2">
            {/* Client component */}
            <div className="">
                <h1>$300 Today</h1>
                <h3>$10.00 (3%) After-hours</h3>
            </div>
            {/* client component */}
            <div className="h-96 border-2">
                <PortfolioGraph selected={selected}/>
            </div>
            {/* client component */}
            <Timeframes selected={selected} setSelected={setSelected}/>
        </div>
    )
}