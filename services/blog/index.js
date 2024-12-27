const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getBlogs(Language = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetAllWebPage?Language=${Language}&Slug=bloglar`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getBlog({ slug, language }) {
    const response = await fetch(`${apiUrl}/Clients/GetWebPage?Language=${language}&Slug=${slug}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getBlogs, getBlog }