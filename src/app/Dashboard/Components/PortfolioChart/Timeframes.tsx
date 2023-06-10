"use client"

export default function Timeframes({ selected, setSelected }: { selected: string, setSelected: Function } ) {
    // const [selected, setSelected] = useState("1d")
    const timeframes = ["1d", "1w", "1m", "3m", "YTD", "1y", "ALL"]


    return (
        <div className="flex w-1/2">
            {timeframes.map(t => <h2 key={t} className={`${selected === t ? "text-red-500 underline" : ""} mr-6 text-lg`} onClick={() => setSelected(t)}>{t}</h2>)}
        </div>
    )
}