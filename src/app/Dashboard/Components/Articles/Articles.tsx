"use client"
import { useState } from 'react'
import Image from 'next/image'


export default function Articles() {
    const [selected, setSelected] = useState(0)
    const [articles, setArticles] = useState([
        {
            title: "Stock Lending",
            image: "/vercel.svg",
            url:"https://robinhood.com/?applink=stock_loan_income_program%3Fsource%3Dcard",
            buttonTxt: "Get started",
        }, 
        {
            title: "New to Robinhood",
            image: "/next.svg",
            url:"https://robinhood.com/account/reports-statements/activity-reports",
            buttonTxt: "Generate report",
        }, 
        {
            title: "New feature",
            image: "/icons8-feather-50.png",
            url:"https://robinhood.com/?applink=equity_advanced_alerts_onboarding",
            buttonTxt: "Get started",
        }, 
        {
            title: "New feature",
            image: "/icons8-feather-50.png",
            url: "https://robinhood.com/screener/new/?source=home_card", 
            buttonTxt: "Create a screener",
        }
    ])


    const articleToDisplay = articles.slice(selected, selected+1).map((a, idx) => {
        return (
            <article key={idx + 1} className="p-2 flex">
                <Image className="rounded-xl bg-white w-40 h-40" src={`${a.image}`} width={40} height={40} alt="robinhood logo"/>
                <div className="ml-4 h-36 w-full flex flex-col justify-between items-start p-2">
                    <div className="w-full">
                        <div className="flex justify-between items-center w-full">
                            <h2 className="text-sm text-gray-500">{a.title}</h2>
                            <button className="" onClick={() => setArticles(articles.filter((filA, filIdx) => filIdx !== idx))}>X</button>
                        </div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, vel!</p>
                    </div>
                    <a className="text-red-500" href={a.url} target='_blank'>{a.buttonTxt}</a>
                </div>
            </article>
        )
    })


    const handleDir = (direction: string) => {
        if (articles.length > 2) {
            if (direction === "left") setSelected(selected === 0 ? articles.length - 1 : selected - 1)
            if (direction === "right") setSelected(selected === articles.length - 1 ? 0 : selected + 1)
        }
    }

    return (
        <div className="w-full">
            <div className="border">{articleToDisplay}</div>
            <div className="w-full flex justify-center p-2">
                <div className="w-1/6 flex justify-between">
                    <button onClick={() => handleDir("left")}>{'<'}</button>
                    <h3>{`${articles.length > 0 ? selected + 1 : 0} of ${articles.length}`}</h3>
                    <button onClick={() => handleDir("right")}>{'>'}</button>
                </div>
            </div>
        </div>
    )
}