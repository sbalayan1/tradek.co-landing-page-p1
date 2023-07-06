'use client'
import React, { useState } from 'react'
import Image from 'next/image'

export default function DiscoverMoreClientComponent() {
	const [start, setStart] = useState(0)
	const discoverMoreImages = ['/vercel.svg', '/next.svg', '/icons8-feather-50.png']
		const discoverMoreTitles = [
			'Transfer accounts in',
			'Robinhood Gold',
			'Lend your stocks',
			'Retirement',
			'Reinvest dividends',
			'Recurring',
			'Earn up to 4.65% APY',
			'Crypto',
			'ETFs'
		]
		const discoverMoreDescriptions = [
			'Consolidate assets',
			'Get premium perks',
			'Potential to earn',
			'Get a 1% match',
			'Build investing habits',
			'Invest on a schedule',
			'On uninvested cash',
			'Browse coins'
		]

		const discoverMoreData = discoverMoreTitles.map((title, idx) => {
			const randomIdx = Math.floor(Math.random()*2)
			return (
				{
					title: title,
					description: discoverMoreDescriptions[idx],
					img: discoverMoreImages[randomIdx]
				}
			)
		})

	return (
		<div className="flex w-full justify-center">
			{start !== 0 &&
				<div className='flex flex-col justify-center -mr-6 '>
					<button className="border relative rounded-md p-4 bg-white text-black" onClick={() => setStart(start-1)}>{'<'}</button>
				</div>
			}
			{discoverMoreData.slice(start, start+5).map(obj => {
				return (
					<div key={obj.title} className="p-4 text-sm">
						<div className="h-36 w-52 bg-white flex justify-center">
							<Image className="h-40 w-32" alt="temp logo" src={obj.img} height={40} width={32}/>
						</div>
						<h2 className="text-lg">{obj.title}</h2>
						<p>{obj.description}</p>
					</div>
				)
			})}
			{start + 5 !== discoverMoreData.length - 1 &&
				<div className='flex flex-col justify-center -ml-8'>
					<button className="border rounded-md p-4 bg-white text-black" onClick={() => setStart(start+1)}>{'>'}</button>
				</div>
			}
		</div>
	)
}