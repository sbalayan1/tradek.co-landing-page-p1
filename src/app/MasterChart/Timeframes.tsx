import Timeframe from "./TimeframeClient"

export default function Timeframes({ selected, updateSubData, ticker }: { selected: string, updateSubData: Function, ticker: string | undefined } ) {
    const timeframes = ["1d", "1w", "1m", "3m"]
		const stockTimeframes = ["1y", "5y"]
		const portfolioTimeframes = ["YTD", "1y", "ALL"]
		if (ticker) stockTimeframes.forEach(t => timeframes.push(t))
		if (!ticker) portfolioTimeframes.forEach(t => timeframes.push(t))

    return (
			<div className="flex w-1/2">
				{timeframes.map(t => <Timeframe key={t} t={t} selected={selected} updateSubData={updateSubData}/>)}
			</div>
    )
}