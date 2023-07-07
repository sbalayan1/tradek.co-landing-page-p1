'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { DiscoverMoreData } from '@/app/globalInterfaces'

export default function DiscoverMoreClientComponent({ data }: { data: DiscoverMoreData[]}) {
	const [start, setStart] = useState(0)
	
	return (
		<div className="flex w-full justify-center">
			{start !== 0 &&
				<div className='flex flex-col justify-center -mr-6 '>
					<button className="border relative rounded-md p-4 bg-white text-black" onClick={() => setStart(start-1)}>{'<'}</button>
				</div>
			}
			{data.slice(start, start+5).map(obj => {
				return (
					<div key={obj.title} className="p-4 text-xs">
						<div className="h-36 w-full bg-white p-6 flex flex-col justify-center items-center">
							<Image className="w-32" alt="temp logo" src={obj.img} height={40} width={32}/>
						</div>
						<h2 className="text-sm">{obj.title}</h2>
						<p>{obj.description}</p>
					</div>
				)
			})}
			{start + 5 !== data.length - 1 &&
				<div className='flex flex-col justify-center -ml-8'>
					<button className="border rounded-md p-4 bg-white text-black" onClick={() => setStart(start+1)}>{'>'}</button>
				</div>
			}
		</div>
	)
}