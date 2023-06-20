"use server"
import "server-only"

export async function getUserData(tgt: string) {
    "use server"
    const res = await fetch(`http://localhost:4000/${tgt}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('turn on your database')
    return res.json()
}

export async function postWatchListData() {
    "use server"
    const res = await fetch('http://localhost:4000/watchlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                name: 'FAANG',
                icon: '/next.svg',
                stocks: ['msft', 'googl', 'meta', 'amzn']
            })
    })

    if (!res.ok) throw new Error('POST request failed')
    return res.json()
}