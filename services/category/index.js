const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getCategories(language = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetAllCategory?Language=${language}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getCategories }