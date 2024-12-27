const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getRegions(language = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetAllWebPage?Language=${language}&Slug=bolgeler`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getRegion({ slug, language = 'tr' }) {
    const response = await fetch(`${apiUrl}/Clients/GetWebPage?Slug=${slug}&Language=${language}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getRegions, getRegion }