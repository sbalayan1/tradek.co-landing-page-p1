// want this to be a server component that renders client components. Look into passing state from server to client 


"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function BuyingPower() {
    const [isOpen, setIsOpen] = useState(false)
    // fetch buying power amt and render

    return (
        <div className="mb-10">
            <div className="border-t-2 border-b-2 h-16 flex justify-between items-center text-xl" onClick={() => setIsOpen(!isOpen)}>
                <h1>Buying Power</h1>
                <h1>$100</h1>
            </div>
            {isOpen &&
                <div className="flex justify-between p-2">
                    <div className="w-1/2 p-2">
                        <div className="flex justify-between border-b-2 h-12">
                            <h2>Brokerage Cash</h2>
                            <h2>$100</h2>
                        </div>
                        <div className="flex justify-between h-12 mt-4">
                            <h2>Buying Power</h2>
                            <h2>$100</h2>
                        </div>
                        <button className="text-white bg-black w-full rounded-full h-12">Deposit Funds</button>
                    </div>
                    <div className="w-1/2 ml-2 p-4 ">
                        <p>
                            Buying power represents teh total value fo assets you can purchase. 
                            <Link href="/" className="text-green-500"> Learn more</Link>
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}