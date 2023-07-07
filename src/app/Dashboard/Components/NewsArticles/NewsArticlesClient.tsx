'use client'
import React from 'react'
import Image from 'next/image'

import { Article } from '../../../globalInterfaces'

export default function NewsArticlesClient({ data }: { data: Article[] }) {
		const newsArticlesToDisplay = data.map(article => {
			return (
				<li key={article.id} className="flex w-full h-40 justify-between p-4 border-b items-center">
					<div className="mr-8 h-full flex flex-col justify-evenly">
						<h2>{article.source} {article.updated_at}</h2>
						<p className="text-xs">{article.headline}</p>
						{article.symbols.length > 0 && 
							<ul className="flex text-xs">
								{article.symbols.map(symbol => <li className="mr-2" key={symbol}>{symbol}</li>)}
							</ul>
						}
					</div>
					<Image className="w-1/6 h-4/5 rounded-md" src={article.images[0].url} alt={article.headline} height={96} width={96}/>
				</li>
			)
		})

	return (
		<ul className="w-full">
			{newsArticlesToDisplay}
		</ul>
	)
}