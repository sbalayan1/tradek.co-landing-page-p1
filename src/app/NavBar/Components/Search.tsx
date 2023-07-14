"use client" // this is a client component
import Link from 'next/link'
import React, { useState } from 'react'

export default function Search({ assets }: { assets: string[] }) {
	const [search, setSearch] = useState("")

	const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)		
	}
	
	const stocksToDisplay = assets.filter(stock => {
		if (search === '') return false
		return stock.toLowerCase().includes(search.toLowerCase())
	})

	return(
		<div className='w-1/4'>
			<input className="w-full p-2 border bg-black text-white hover:bg-gray-700" placeholder="Search" value={search} onChange={handleUpdate}/>
			{stocksToDisplay.length > 0 && 
				<ul className={`${search.length > 0 && 'border-b border-l border-r'} rounded-b-md w-1/4 absolute bg-black`}>
					{stocksToDisplay.slice(0,5).map((stock, idx)=> {
						return (
							<li key={idx} className='w-full px-2 py-1 hover:bg-gray-700'>
								<Link href={`/stock/${stock}`} onClick={() => setSearch('')}>
									<div className='flex w-full'>
										{stock}
										{/* need to display full stock name */}
									</div>
								
								</Link>
							</li>
						)
					})}
				</ul>
			}
		</div>
	)
}