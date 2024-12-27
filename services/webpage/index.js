const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getFrequentlyAskedQuestions(page = 1, lang = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetAllWebPage?Language=${lang}&Slug=sss`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}


export { getFrequentlyAskedQuestions }