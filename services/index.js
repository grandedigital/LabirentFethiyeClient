const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getCurrencies() {
    const response = await fetch(`${apiUrl}/Clients/GetCurrencies`)
    const data = await response.json()
    return data
}

export { getCurrencies }