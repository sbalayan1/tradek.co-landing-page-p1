// this is a server component

import Link from 'next/link'
import Image from 'next/image'

import { getAllAssets } from '../utils/MarketDataUtils/getStocks'

import Search from './Components/Search'

import { Asset } from '../globalInterfaces'

export default async function NavBar() {
		const assets: Asset[] = await getAllAssets()
		const assetSymbols = assets.map(assetObj => assetObj.symbol)

    const links = ["Rewards", "Investing", "Spending", "Retirement", "Notifications", "Account"]
    const linksToDisplay = links.map(link => <Link key={link} href={{pathname: link}} className='pl-4'>{link}</Link>)

    return(
        <div className="flex justify-between p-4 h-50 w-full items-center">
            <div className="flex items-center">
                <Link href="/" className="mr-4"><Image className="bg-green rounded-xl p-1" src="/icons8-feather-50.png" width={50} height={50} alt="robinhood logo"/></Link>
                {/* <h1>RobTheRich</h1> */}
            </div>
            <Search assets={assetSymbols}/> 
            <div>
                {linksToDisplay}
            </div>
        </div>
    )
}