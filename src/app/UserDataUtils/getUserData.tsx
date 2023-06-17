import "server-only"

export async function getUserData(tgt: string) {
    const res = await fetch(`http://localhost:3001/${tgt}`)
    if (!res.ok) throw new Error('turn on your database')
    return res.json()
}