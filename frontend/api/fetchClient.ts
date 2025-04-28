export async function get(url: string): Promise<any> {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (err) {
        console.log(`Error: ${err}`)
    }
};