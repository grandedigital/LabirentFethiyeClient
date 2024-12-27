//import { SendMail } from "@/utils/sendMail";
//import { dateToDotFormat } from "@/utils/date";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

//sonuc false dönerse villa müsait demek oluyor, true dönerse müsait değil
//type 0 ise villa, 1 ise apart
async function isVillaAvailable(slug, checkInDate, checkOutDate) {
  const response = await fetch(`${apiUrl}/Clients/ReservationIsAvailible?Slug=${slug}&CheckIn=${checkInDate}&CheckOut=${checkOutDate}`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data
}

async function getPricesBySelectedDate(slug, checkInDate, checkOutDate) {
  const response = await fetch(`${apiUrl}/Clients/ReservationGetPrice?CheckIn=${checkInDate}&CheckOut=${checkOutDate}&Slug=${slug}`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data
}

//type 0 ise villa, 1 ise apart
async function createReservation(type = 0,
  reservationData,
  personData,
  villaName
) {
  // ReservationCreate.Begin

  const reservation = {
    Slug: reservationData?.villaSlug || reservationData?.roomSlug,
    CheckIn: reservationData.checkIn,
    CheckOut: reservationData.checkOut,
    IdNo: personData.idNo,
    Name: personData.name,
    Surname: personData.surname,
    Phone: personData.phone,
    Email: personData.email
  };

  const formData = new FormData();

  Object.entries(reservation).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await fetch(`${apiUrl}/Clients/ReservationCreate`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    return response.json()
  }

  //const mailResult = await SendMail('template_n90pb1d', { villaName: villaName, nameAndSurname: personData.name + ' ' + personData.surname, email: personData.email, phone: personData.phone, startDate: dateToDotFormat(reservationData.checkIn), endDate: dateToDotFormat(reservationData.checkOut), to_email: "bbarisguness@gmail.com" })
  // ReservationCreate.End

  return response.json();
}

async function searchReservation({ reservationNumber }) {
  const response = await fetch(`${apiUrl}/Clients/GetReservation/?Language=tr&ReservationNumber=${reservationNumber}`, {
    cache: 'no-store'
  })
  const data = await response.json()
  return data
}

export { createReservation, searchReservation, isVillaAvailable, getPricesBySelectedDate };
