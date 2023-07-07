import { getUserData } from '../../../utils/UserDataUtils/userData'
import { getLatestNews } from '@/app/utils/MarketDataUtils/getLatestNews'
import { News, WatchList } from '../../../globalInterfaces'
import NewsArticleClient from './NewsArticleClient'

export default async function NewsArticlesClient() {
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

	const res: string[] = [...userStocks] // spread set into an array
	const data: News = await getLatestNews(res)
	const newsArticlesToDisplay = data.news.map(article => <NewsArticleClient key={article.id} article={article}/>)

	return (
		<ul className="w-full">
			{newsArticlesToDisplay}
		</ul>
	)
}