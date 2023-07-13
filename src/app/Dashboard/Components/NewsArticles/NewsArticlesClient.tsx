import { getUserData } from '../../../utils/UserDataUtils/userData'
import { getLatestNews } from '@/app/utils/MarketDataUtils/getLatestNews'
import { News, WatchList } from '../../../globalInterfaces'
import NewsArticleClient from './NewsArticleClient'

export default async function NewsArticlesClient({ target }: { target: string }) {
	const buildAndFilterUserData = async (): Promise<string[]> => {
		const userPositions: Promise<string[]> = getUserData('positions')
		const userWatchLists: Promise<WatchList[]> = getUserData('watchlists')
		const userData: [string[], WatchList[]] = await Promise.all([userPositions, userWatchLists])
		const userStocks: Set<string> = new Set()
		userData[0].forEach(stock => userStocks.add(stock)) // iterate through positions and add to set
		
		// iterate through watchlists. Add each stock to the set within each stocks list
		userData[1].forEach(watchlistObj => {
			watchlistObj.stocks.forEach(stock => {
				userStocks.add(stock)
			})
		})

		return [...userStocks] // spread set into an array and return
	}

	const res: string[] | string = target === '' ? await buildAndFilterUserData() : target
	const data: News = await getLatestNews(res)
	const newsArticlesToDisplay = data.news.map(article => <NewsArticleClient key={article.id} article={article}/>)

	return (
		<ul className="w-full">
			{newsArticlesToDisplay}
		</ul>
	)
}