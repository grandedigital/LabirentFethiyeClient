const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getVillas(page = 1) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVilla?Language=tr&Pagination.Size=20&Pagination.Page=${page}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getHotels(page = 0, size = 20, language = "tr") {
    const response = await fetch(`${apiUrl}/Clients/GetAllHotel?Language=${language}&Pagination.Size=${size}&Pagination.Page=${page}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getHotel(hotelId) {
    const response = await fetch(`${apiUrl}/Clients/GetHotel?Slug=${hotelId}&Language=tr`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getAllVillaByCategorySlug(language, categorySlug, page = 0, size = 20) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVillaByCategorySlug?Language=${language}&Slug=${categorySlug}&Pagination.Page=${page}&Pagination.Size=${size}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getVillasForSale(page = 0, size = 20) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVillaSale?Language=tr&Pagination.Page=${page}&Pagination.Size=${size}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getVillasHome(size = 8, page = 0, categorySlug, language) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVillaByCategorySlug?Language=${language}&Slug=${categorySlug}&Pagination.Page=${page}&Pagination.Size=${size}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getVillaBySlug(villaSlug, language = 'tr') {
    const response = await fetch(`${apiUrl}/Clients/GetVillaBySlug?Language=${language}&Slug=${villaSlug}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getRoom(roomSlug) {
    const response = await fetch(`${apiUrl}/Clients/GetRoom?Slug=${roomSlug}&Language=tr`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

//type 0 ise VillaId, 1 ise HotelId
async function createComment(type = 0,
    data
) {
    // ReservationCreate.Begin

    const reservation = {
        [type == 0 ? 'VillaId' : 'HotelId']: data?.id,
        Title: "",
        CommentText: data?.form_message,
        Rating: data?.form_rating,
        Name: data?.form_name,
        Surname: data?.form_surname,
        Phone: data?.form_phone,
        Email: data?.form_email
    };

    const formData = new FormData();

    Object.entries(reservation).forEach(([key, value]) => {
        formData.append(key, value);
    });

    const response = await fetch(`${apiUrl}/Clients/CreateComment`, {
        method: "POST",
        body: formData,
    });
    return response.json()
    // ReservationCreate.End
}

async function getRandomFourVilla(data, currentVillaId) {
    let withoutCurrentVillaData = data.data.filter(item => item.id != currentVillaId)
    if (withoutCurrentVillaData.length <= 4) {
        return withoutCurrentVillaData
    }

    let randomFourVilla = []

    for (let index = 0; index < 4; index++) {
        let randomIndex = Math.floor(Math.random() * withoutCurrentVillaData.length)
        randomFourVilla.push(withoutCurrentVillaData[randomIndex])
        withoutCurrentVillaData.splice(randomIndex, 1)
    }

    return {
        data: randomFourVilla
    }
}

async function getNearVillas(townId, currentVillaId) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVillaNearby&Language=tr&TownId=${townId}&Pagination.Size=4`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return await getRandomFourVilla(data, currentVillaId)
}

async function getVillasByFilter({ villaSearchText = "", checkIn = "", checkOut = "", person = 0, page = 0, size = 10 }) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVillaSearch?Language=tr${checkIn !== '' ? `&CheckIn=${checkIn}` : ''}${checkOut !== '' ? `&CheckOut=${checkOut}` : ''}${villaSearchText !== '' ? `&Name=${villaSearchText}` : ''}${person !== 0 ? `&Person=${person}` : ''}&Pagination.Page=${page}&Pagination.Size=${size}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getVillasByName({ villaSearchText = "", page = 0, size = 500 }) {
    const response = await fetch(`${apiUrl}/Clients/GetAllVillaSearch?Language=tr&Name=${villaSearchText}&Pagination.Size=${size}&Pagination.Page=${page}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getVillas, getVillaBySlug, getNearVillas, getVillasByFilter, getVillasHome, getVillasForSale, getAllVillaByCategorySlug, getHotels, getHotel, getRoom, createComment, getVillasByName }