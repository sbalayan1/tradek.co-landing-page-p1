"use client" // this is a client component
import React, { useState } from 'react'

export default function Search({ assets }: { assets: string[] }) {
	const [submitButtonOn, setSubmitButtonOn] = useState(false)
  const [searchedStocks, setSearchedStocks] = useState<string[]>([])  
	const [search, setSearch] = useState("")

	const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSubmitButtonOn(false) // hide the submit button while user types
		setSearch(e.target.value)
		if (e.target.value !== '') setSubmitButtonOn(true) // once the user is done typing and the prompt is not empty, turn the submit button on
		if (e.target.value === '') setSearchedStocks([]) // reset searched stocks if search bar is empty
	}
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const stocksToDisplay = assets.filter(stock => {
			if (search === '') return false
			return stock.toLowerCase().includes(search.toLowerCase())
		})

		setSearchedStocks(stocksToDisplay)
	}

	return(
		<div className='border-2 w-1/3'>
			<form className='flex justify-between' onSubmit={handleSubmit}>
				<input className="w-full h-full p-2 text-black" placeholder="Search" value={search} onChange={handleUpdate}/>
				{submitButtonOn && <button type='submit' className='bg-white text-gray-600'>Submit</button>}
			</form>
			<ul>
				{searchedStocks.map((stock, idx)=> <li key={idx}>{stock}</li>)}
			</ul>
		</div>
	)
}