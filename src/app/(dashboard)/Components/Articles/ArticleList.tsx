"use client"
import { useState } from 'react'
import Image from 'next/image'


export default function ArticleList() {
    const [selected, setSelected] = useState(0)

    const articles = [{
            title: "Stock Lending",
            url:"https://robinhood.com/?applink=stock_loan_income_program%3Fsource%3Dcard",
            buttonTxt: "Get started",
        }, 
        {
            title: "New to Robinhood",
            url:"https://robinhood.com/account/reports-statements/activity-reports",
            buttonTxt: "Generate report",
        }, 
        {
            title: "New feature",
            url:"https://robinhood.com/?applink=equity_advanced_alerts_onboarding",
            buttonTxt: "Get started",
        }, 
        {
            title: "New feature",
            url: "https://robinhood.com/screener/new/?source=home_card", 
            buttonTxt: "Create a screener",
        }
    ]

    const articleToDisplay = articles.slice(selected, selected+1).map((a, idx) => {
        return (
            <article key={idx + 1} className="p-4 flex">
                <Image className="bg-green-600 rounded-xl" src="/icons8-feather-50.png" width={60} height={60} alt="robinhood logo"/>
                <div className="ml-4 h-36 w-full flex flex-col justify-between items-start p-2">
                    <div className="w-full">
                        <div className="flex justify-between items-center w-full">
                            <h2 className="text-sm text-gray-500">{a.title}</h2>
                            <button className="">X</button>
                        </div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, vel!</p>
                    </div>
                    <button className="text-red-500">{a.buttonTxt}</button>
                </div>
            </article>
        )
    })


    return (
        <div className="w-full">
            <div className="border-2">{articleToDisplay}</div>
            <div className="w-full flex">
                <div className="w-1/5">
                    <button>L</button>
                    <button>R</button>
                </div>
            </div>
        </div>
    )
}