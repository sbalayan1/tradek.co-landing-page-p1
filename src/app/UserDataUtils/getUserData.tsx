import "server-only"

export async function getUserData(tgt: string) {
    const res = await fetch(`http://localhost:4000/${tgt}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('turn on your database')
    return res.json()
}