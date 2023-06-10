"use client" // this is a client component
import React, { useState } from 'react'

export default function Search() {
    const [search, setSearch] = useState("")

    return(
        <div className='border-2 w-1/3'>
            <input className="w-full h-full p-2 text-black" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
    )
}