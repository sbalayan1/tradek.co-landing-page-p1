"use server"
import "server-only"

export async function getUserData(tgt: string) {
    "use server"
    const res = await fetch(`http://localhost:4000/${tgt}`, { next: { revalidate: 10 } })
    if (!res.ok) throw new Error('turn on your database')
    return res.json()
}

export async function postWatchListData(name: string) {
	"use server"
	if (!name) throw new Error('Watchlist must have a name!')

	const res = await fetch('http://localhost:4000/watchlists', {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json',

					},
					body: JSON.stringify({
							name: name,
							icon: '/next.svg',
							stocks: []
					})
	})

    if (!res.ok) throw new Error('POST request failed')
    return res.json()
}