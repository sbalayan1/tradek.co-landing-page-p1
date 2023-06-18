"use server"
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