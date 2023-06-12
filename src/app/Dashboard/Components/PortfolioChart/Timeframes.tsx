import Timeframe from "./Timeframe-client"

export default function Timeframes({ selected, updateSubData }: { selected: string, updateSubData: Function } ) {
    const timeframes = ["1d", "1w", "1m", "3m", "YTD", "1y", "ALL"]

    return (
        <div className="flex w-1/2">
            {timeframes.map(t => <Timeframe key={t} t={t} selected={selected} updateSubData={updateSubData}/>)}
        </div>
    )
}