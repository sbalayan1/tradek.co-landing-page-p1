// this is a server component

import Link from 'next/link'
import Image from 'next/image'
import Search from './Client Components/Search'

export default function NavBar() {
    // other links include "Spending", "Retirement", "Notifications"
    const links = ["Rewards", "Investing", "Spending", "Retirement", "Notifications", "Account"]
    const linksToDisplay = links.map(link => {
        return <Link key={link} href={{pathname: link}} className='pl-4'>{link}</Link>
    })

    return(
        <div className="flex justify-between p-4 h-50 w-full">
            <div className="flex items-center">
                <Link href="/" className="mr-4"><Image className="bg-green-600 rounded-xl" src="/icons8-feather-50.png" width={50} height={50} alt="robinhood logo"/></Link>
                <h1>RobTheRich</h1>
            </div>
            <Search /> 
            <div>
                {linksToDisplay}
            </div>
        </div>
    )
}