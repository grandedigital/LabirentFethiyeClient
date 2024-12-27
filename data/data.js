export const stockData = [
  {
    id: 1,
    type: "populer",
    name: "Villa Vedo",
    location: "Fethiye / Ölüdeniz",
    price: "1.500 - 5.900",
    feature1: "Popüler Villa",
    feature2: "2 Odası Jakuzili",
    feature3: "Erken Rezervasyon",
    numberOfPeople: 5,
    numberOfRoom: 3,
    numberOfBath: 4,
    imageSrc: ["asd", "bbb", "aaa"],
  },
  {
    id: 2,
    type: "populer",
    name: "Villa Star",
    location: "Fethiye / Ölüdeniz",
    price: "1.500 - 5.900",
    feature1: "Popüler Villa",
    feature2: "2 Odası Jakuzili",
    feature3: "Erken Rezervasyon",
    numberOfPeople: 5,
    numberOfRoom: 3,
    numberOfBath: 4,
  },
  {
    id: 3,
    type: "populer",
    name: "Villa Aku",
    location: "Fethiye / Ölüdeniz",
    price: "1.500 - 5.900",
    feature1: "Popüler Villa",
    feature2: "2 Odası Jakuzili",
    feature3: "Erken Rezervasyon",
    numberOfPeople: 5,
    numberOfRoom: 3,
    numberOfBath: 4,
  },
  {
    id: 4,
    type: "populer",
    name: "Villa Almina",
    location: "Fethiye / Ölüdeniz",
    price: "1.500 - 5.900",
    feature1: "Popüler Villa",
    feature2: "2 Odası Jakuzili",
    feature3: "Erken Rezervasyon",
    numberOfPeople: 5,
    numberOfRoom: 3,
    numberOfBath: 4,
  },
  {
    id: 5,
    type: "ekonomik",
    name: "Villa Desen",
    location: "Fethiye / Ölüdeniz",
    price: "1.500 - 5.900",
    feature1: "Ekonomik Villa",
    numberOfPeople: 6,
    numberOfRoom: 3,
    numberOfBath: 3,
  },
  {
    id: 6,
    type: "balayı",
    name: "Villa Makri",
    location: "Fethiye / Ölüdeniz",
    price: "3.500 - 7.900",
    feature1: "Balayı Villası",
    feature2: "Isıtmalı Havuz",
    feature3: "Erken Rezervasyon",
    numberOfPeople: 2,
    numberOfRoom: 2,
    numberOfBath: 1,
  },
  {
    id: 7,
    type: "cocukHavuzlu",
    name: "Villa Tefo",
    location: "Fethiye / Ölüdeniz",
    price: "3.700 - 6.300",
    feature1: "Çocuk Havuzlu",
    feature2: "Güzel Bahçeli",
    numberOfPeople: 2,
    numberOfRoom: 6,
    numberOfBath: 5,
  },
  {
    id: 8,
    type: "korunaklı",
    name: "Villa Abuzel",
    location: "Fethiye / Ölüdeniz",
    price: "2.800 - 4.300",
    feature1: "Korunaklı Villa",
    numberOfPeople: 2,
    numberOfRoom: 2,
    numberOfBath: 4,
  },
  {
    id: 9,
    type: "kış",
    name: "Villa Makita",
    location: "Fethiye / Ölüdeniz",
    price: "4.500 - 6.500",
    feature1: "Kış Aylarına Uygun Villa",
    feature2: "Isıtmalı Havuz",
    numberOfPeople: 1,
    numberOfRoom: 4,
    numberOfBath: 5,
  },
];

export const regions = [
  {
    title: "Ölüdeniz Bölgesi",
    desc: "Türkiye'nin en güzel kumsallarından birisi olan Ölüdeniz doğası, denizi, koyları ile gerek yerli gerekse yabancı turistlerin ilgi noktası olmaktadır.",
    src: "images/regions-2.png",
  },
  {
    title: "Çalış Bölgesi",
    desc: "Fethiye ülkemizin tatil cennetlerinden birisidir ve Fethiye'nin her bölgesi kendine has dokusuyla misafirlerinin cezbetmeyi başarmaktadır.",
    src: "images/regions-1.png",
  },
  {
    title: "Kayaköy Bölgesi",
    desc: "Kayaköy Muğla'nın Fethiye ilçesinde yer alan, her köşesi tarihi bir doku taşıyan mekandır. Etkileyici bir görüntüsü olan Kayaköy'ün bir o kadar da hazin bir hikayesi vardır.",
    src: "images/regions-3.png",
  },
  {
    title: "Çiftlik Bölgesi",
    desc: "Çiftlik kiralık villa tercihi yaparak tatili burada geçirmek isteyenlerin sayısı her geçen gün artmaktadır.",
    src: "images/regions-4.png",
  },
];

export const menu = [
  {
    name: "Anasayfa",
    lang: "tr",
  },
  {
    name: "Home",
    lang: "en",
  },
];

export const priceTypes = [
  {
    type: 1,
    text: "₺",
    tag: "TL",
    key: "tl",
    lang: "tr"
  },
  {
    type: 2,
    text: "$",
    tag: "DOLAR",
    key: "usd",
  },
  {
    type: 3,
    text: "€",
    tag: "EURO",
    key: "eur",
  },
  {
    type: 4,
    text: "£",
    tag: "POUNT",
    key: "gbp",
    lang: "en"
  },
];

export const getPriceTypeDetail = (priceTypeNumber) => {
  return priceTypes?.find(item => item?.type == priceTypeNumber)
}

// export const google301 = [
//   {
//     link1: "/b/bloglar",
//     link2: "bloglar",
//   },
//   {
//     link1: "/v/balayi-villalari",
//     link2: "/villalar/balayi-villalari",
//   },
//   {
//     link1: "/v/ekonomik-villalar",
//     link2: "/villalar/ekonomik-villalar",
//   },
//   {
//     link1: "/p/dolandiricilara-dikkat",
//     link2: "/dolandiricilara-dikkat",
//   },
// ];