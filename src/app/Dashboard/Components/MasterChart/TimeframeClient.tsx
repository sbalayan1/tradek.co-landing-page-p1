"use client"

export default function Timeframe({t, selected, updateSubData }: {t: string, selected: string, updateSubData: Function}) {
    return(<h2 key={t} className={`${selected === t ? "text-red underline" : ""} mr-6 text-lg`} onClick={() => updateSubData(t)}>{t}</h2>)
}