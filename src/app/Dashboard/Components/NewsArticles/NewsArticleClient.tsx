'use client'

import Image from 'next/image'
import React from 'react'
import { Article } from '@/app/globalInterfaces'


export default function NewsArticleClient({ article }: { article: Article }) {
		const currentTime = new Date().getTime()
		const articleTime = new Date(article.updated_at).getTime() // returns article time in milliseconds
		const timeDiff = Math.floor(((currentTime - articleTime)/1000)/60) // calculate time diff and converts from milliseconds to seconds and finally to minutes
		const title = article.source[0].toUpperCase() + article.source.slice(1) // capitalize source

		return (
			<li key={article.id} className="flex w-full h-40 justify-between p-4 border-b items-center hover:bg-gray-800">
				<div className="mr-8 h-full flex flex-col justify-evenly">
					<div className="flex items-center">
						<h2>{title}</h2>
						{/* the below is causing text content rendered on the server not to match client side html */}
						<h2 className='text-xs ml-2'>{timeDiff}m ago</h2> 
					</div>
					<p className="text-xs">{article.headline}</p>
					{article.symbols.length > 0 && 
						<ul className="flex text-xs">
							{article.symbols.map(symbol => <li className="mr-2" key={symbol}>{symbol}</li>)}
						</ul>
					}
				</div>
				{article.images.length > 0 && <Image className="w-1/6 h-4/5 rounded-md" src={article.images[0].url} alt={article.headline} height={96} width={96} />}
			</li>
		)
}