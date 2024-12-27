const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getActivates(language = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetAllWebPage?Language=${language}&Slug=aktiviteler`)
    const data = await response.json()
    return data
}

async function getActivate({ slug, language = 'tr' }) {
    const response = await fetch(`${apiUrl}/Clients/GetWebPage?Slug=${slug}&Language=${language}`)
    const data = await response.json()
    return data
}

export { getActivates, getActivate }