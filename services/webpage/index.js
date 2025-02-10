const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getFrequentlyAskedQuestions(page = 1, lang = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetAllWebPage?Language=${lang}&Slug=sss&Pagination.Page=0&Pagination.Size=50`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}


export { getFrequentlyAskedQuestions }