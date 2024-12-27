/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const google301 = [
  {
    source: '/b/bloglar',
    destination: '/bloglar',
    permanent: false,
  },
  {
    source: '/b/6-oludeniz-kiralik-villa',
    destination: '/bloglar/oludeniz-kiralik-villa',
    permanent: false,
  },
  {
    source: '/b/2-oludeniz-nerededir-ve-nasil-gidilir',
    destination: '/bloglar/oludeniz-nerededir-ve-nasil-gidilir',
    permanent: false,
  },
  {
    source: '/b/3-fethiyede-terkedilmis-bir-cennet-kayakoy',
    destination: '/bloglar/fethiyede-terkedilmis-bir-cennet-kayakoy',
    permanent: false,
  },
  {
    source: '/b/4-fethiye-at-turu',
    destination: '/bloglar/fethiye-at-turu',
    permanent: false,
  },
  {
    source: '/b/5-fethiye-kiralik-villa',
    destination: '/bloglar/fethiye-kiralik-villa',
    permanent: false,
  },
  {
    source: '/b/9-yamac-parasutu-nasil-yapilir',
    destination: '/bloglar/yamac-parasutu-nasil-yapilir-',
    permanent: false,
  },
  {
    source: '/b/8-fethiyede-gormeniz-gereken-tarihi-yerler',
    destination: '/bloglar/fethiyede-gormeniz-gereken-tarihi-yerler',
    permanent: false,
  },
  {
    source: '/b/7-fethiyede-villa-tatili-icin-uygun-fiyatlar',
    destination: '/bloglar/fethiyede-villa-tatili-icin-uygun-fiyatlar',
    permanent: false,
  },
  {
    source: '/b/11-fethiye-merkezin-en-guzel-koy-ve-plajlari',
    destination: '/bloglar/fethiye-merkezin-en-guzel-koy-ve-plajlari',
    permanent: false,
  },
  {
    source: '/b/10-fethiye-villa-secimi',
    destination: '/bloglar/fethiye-villa-secimi',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari',
    destination: '/villalar/balayi-villalari',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar',
    destination: '/villalar/ekonomik-villalar',
    permanent: false,
  },
  {
    source: '/v/korunakli-villalar',
    destination: '/villalar/korunakli-villalar',
    permanent: false,
  },
  {
    source: '/v/cocuk-havuzlu-villalar',
    destination: '/villalar/cocuk-havuzlu-villalar',
    permanent: false,
  },
  {
    source: '/v/populer-villalar',
    destination: '/villalar/populer-villalar',
    permanent: false,
  },
  {
    source: '/v/kis-aylarina-uygun-villalar',
    destination: '/villalar/kis-aylarina-uygun',
    permanent: false,
  },
  {
    source: '/v/kiralik-apartlar',
    destination: '/apartlar',
    permanent: false,
  },
  {
    source: '/v/kiralik-villalar',
    destination: '/villalar',
    permanent: false,
  },
  {
    source: '/v/satilik-villalar',
    destination: '/satilik-villalar',
    permanent: false,
  },
  {
    source: '/p/dolandiricilara-dikkat',
    destination: '/dolandiricilara-dikkat',
    permanent: false,
  },
  {
    source: '/p/neden-labirent',
    destination: '/neden-labirent',
    permanent: false,
  },
  {
    source: '/p/arac-kiralama',
    destination: '/arac-kiralama',
    permanent: false,
  },
  {
    source: '/p/yemek-servisi',
    destination: '/yemek-servisi',
    permanent: false,
  },
  {
    source: '/p/sikayet-bildirimi',
    destination: '/sikayet-bildirimi',
    permanent: false,
  },
  {
    source: '/p/sikca-sorulan-sorular',
    destination: '/sss',
    permanent: false,
  },
  {
    source: '/p/kiralama-sartlari',
    destination: '/kiralama-sartlari',
    permanent: false,
  },
  {
    source: '/r/ciftlik-kiralik-villa',
    destination: '/bolgeler/ciftlik-bolgesi',
    permanent: false,
  },
  {
    source: '/r/calis-kiralik-villa',
    destination: '/bolgeler/calis-bolgesi',
    permanent: false,
  },
  {
    source: '/r/kayakoy-kiralik-villa',
    destination: '/bolgeler/kayakoy-bolgesi',
    permanent: false,
  },
  {
    source: '/r/oludeniz-kiralik-villa',
    destination: '/bolgeler/oludeniz-bolgesi',
    permanent: false,
  },
  {
    source: '/f/villanizi-kiraya-verin',
    destination: '/kiraya-ver',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/19-villa-root',
    destination: '/villalar/villa-root',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/108-villa-minerva',
    destination: '/villalar/villa-minerva',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/18-villa-moonshine',
    destination: '/villalar/villa-moonshine',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/96-villa-remzi',//villa alice bakılcak bizde yok(karşılığı yok)
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/226-capella-sirius',
    destination: '/villalar/capella-sirius',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/25-villa-alp', // karşılığı yok
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/255-villa-arda', // karşılığı yok
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/173-villa-sirius',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/107-villa-kimera',
    destination: '/villalar/villa-kimera',
    permanent: false,
  },
  {
    source: '/v/korunakli-villalar/15-villa-makri',
    destination: '/villalar/villa-makri',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/1-villa-almina',
    destination: '/villalar/villa-almina',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/28-villa-sudenaz',
    destination: '/villalar/villa-sudenaz',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/30-villa-meysa',
    destination: '/villalar/villa-meysa',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/34-villa-gumus',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/167-villa-zumrut',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/47-villa-yigit',
    destination: '/villalar/villa-yigit',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/201-villa-yade',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/189-villa-devin',
    destination: '/villalar/villa-devin',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/80-villa-adeley',
    destination: '/villalar/villa-adaley',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/46-villa-meyra',
    destination: '/villalar/villa-meyra',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/42-villa-miray',
    destination: '/villalar/villa-miray',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/106-villa-sedna',
    destination: '/villalar/villa-sedna',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/225-capella-vega',
    destination: '/villalar/capella-vega',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/168-villa-sargon',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/199-villa-lotus',
    destination: '/villalar/villa-lotus',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/155-villa-tila',
    destination: '/villalar/villa-tila',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/197-villa-moonshine-duo',
    destination: '/villalar/villa-moonshine-duo',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/224-capella-simal',
    destination: '/villalar/capella-simal',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/210-villa-ofelya-2',
    destination: '/villalar/villa-ofelya-2',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/27-villa-bella',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/korunakli-villalar/182-villa-elam',
    destination: '/villalar/villa-elam',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/211-villa-diamond',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/103-villa-kaya',
    destination: '/villalar/villa-kaya',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/16-villa-desen',
    destination: '/villalar/villa-desen',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/261-villa-akdag',
    destination: '/villalar/villa-akdag',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/155-villa-tila',
    destination: '/villalar/villa-tila',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/207-villa-yaz-2',
    destination: '/villalar/villa-yaz-2',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/156-villa-folia',
    destination: '/villalar/villa-folia',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/113-villa-paris',
    destination: '/villalar/villa-paris',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/141-villa-azmira',
    destination: '/villalar/villa-azmira',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/112-villa-toska',
    destination: '/villalar/villa-toska',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/109-villa-prenses',
    destination: '/villalar/villa-prenses',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/86-inn-house-oludeniz',
    destination: '/villalar/inn-house-oludeniz-2-1',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/23-villa-baris',
    destination: '/villalar/villa-baris',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/186-villa-ariessos-2',
    destination: '/villalar/villa-ariessos-2',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/269-villa-aroma-terapi',
    destination: '/villalar/villa-aroma-terapi',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/216-villa-lara-1',
    destination: '/villalar/villa-lara-1',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/115-villa-aydin',
    destination: '/villalar/villa-aydin',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/171-villa-pera',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/214-villa-felix',
    destination: '/villalar/villa-felix',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/206-villa-yaz-1',
    destination: '/villalar/villa-yaz-1',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/195-villa-alice-duo',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/53-villa-levissi-b-blok',
    destination: '/villalar/villa-levissi-b-blok',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/82-inn-house-oludeniz-suit',
    destination: '/villalar/inn-house-suite',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/82-inn-house-oludeniz-suit',
    destination: '/villalar/inn-house-suite',
    permanent: false,
  },
  {
    source: '/v/cocuk-havuzlu-villalar/203-villa-bella',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/190-villa-kaya-duo-1',
    destination: '/villalar/villa-kaya-duo-1',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/217-villa-lara-2',
    destination: '/villalar/villa-lara-2',
    permanent: false,
  },
  {
    source: '/v/cocuk-havuzlu/52-villa-levissi-a-blok',
    destination: '/villalar/villa-levissi-a-blok',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/153-villa-garden-city-c-blok',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/213-villa-cemal',
    destination: '/villalar/villa-cemal',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/97-villa-ata',
    destination: '/villalar/villa-ata',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/138-villa-olivin',
    destination: '/villalar/villa-olivin',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/41-villa-simay',
    destination: '/villalar/villa-simay',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/283-villa-cratos',
    destination: '/villalar/villa-cratos',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/300-villa-nazan',
    destination: '/villalar/villa-nazan',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/20-villa-dilara',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/140-villa-sasadi',
    destination: '/villalar/villa-sasadi',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/288-villa-alya',
    destination: '/villalar/villa-alya',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/116-villa-atlas',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/178-villa-hayal',
    destination: '/villalar/villa-hayal',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/231-galaksi-jupiter',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/105-umut-apart',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/303-villa-amalfi',
    destination: '/villalar/villa-amalfi',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/15-villa-makri',
    destination: '/villalar/villa-makri',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/136-villa-caglayan',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/133-villa-palmiye',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/244-villa-uzum',
    destination: '/villalar/villa-uzum',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/192-villa-muzzy',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/212-villa-nefes',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/194-sari-apart',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/229-galaksi-dunya',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/281-villa-lagertha',
    destination: '/villalar/villa-lagertha',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/205-villa-dove',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/74-pine-villa',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/94-villa-ezgi',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/202-villa-arna',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/277-villa-flora',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/299-villa-naz',
    destination: '/villalar/villa-naz',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/280-villa-ragnar',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/280-villa-ragnar',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/227-galaksi-venus',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/223-capella-sira',
    destination: '/villalar/villa-capella-sira',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/289-villa-kelebek',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/301-villa-ergun',
    destination: '/villalar/villa-ergun',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/287-villa-talya',
    destination: '/villalar/villa-talya',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/170-villa-golondrina',
    destination: '/villalar/villa-golondrina',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/36-villa-hera',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/270-villa-dilekli',
    destination: '/villalar/villa-dilekli',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/284-villa-doga',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/302-villa-inanc',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/246-villa-sidelya',
    destination: '/villalar/villa-sidelya',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/295-villa-sara',
    destination: '/villalar/villa-sara',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/296-villa-bilge',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/26-villa-adela',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/293-villa-alpine',
    destination: '/villalar/villa-alpine',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/96-villa-alice',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/279-villa-ihlara',
    destination: '/villalar/villa-ihlara',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/243-villa-esilya',
    destination: '/villalar/villa-esilya',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/14-villa-kose',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/209-villa-ofelya',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/215-villa-yavuz',
    destination: '/villalar/villa-yavuz',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/230-galaksi-mars',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/245-villa-eftelya',
    destination: '/villalar/villa-eftelya',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/80-villa-adaley',
    destination: '/villalar/villa-adaley',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/181-bungalov-larin',
    destination: '/villalar/bungalov-larin',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/193-villa-ozzy',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/166-villa-olivia',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/75-villa-probis',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/117-nevin-apart',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/208-villa-lilya',
    destination: '/villalar/villa-lilya',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/292-villa-rose-premium',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/272-villa-bling-2',
    destination: '/villalar/villa-bling-2',
    permanent: false,
  },
  {
    source: '/v/cocuk-havuzlu-villalar/177-villa-biberiye',
    destination: '/villalar/villa-biberiye',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/262-villa-semercioglu-1',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/163-villa-pine-6',
    destination: '/villalar/villa-pine-6',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/239-villa-kalkan-inci',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/118-villa-berka-a',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/291-villa-derin-su',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/129-villa-berka-c',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/297-villa-moonlight-1',
    destination: '/villalar/villa-moonlight-1-1',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/162-villa-tekin-2',
    destination: '/villalar/villa-tekin-2',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/127-villa-berka-b',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/204-villa-carya',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/271-villa-bling-1',
    destination: '/villalar/villa-bling-1',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/131-villa-berka-d',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/198-tas-villa-lina',
    destination: '/villalar/tas-villa-lina',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/274-villa-bling-excellence%C2%A02',
    destination: '/villalar/villa-bling-excellence-2',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/305-villa-tala-18',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/298-villa-moonlight-2',
    destination: '/villalar/villa-moonlight-2',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/263-villa-semercioglu-2',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/237-villa-kalkan-zumrut',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/45-villa-si-mi',
    destination: '/villalar/villa-si-mi',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/200-villa-leila-duo',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/185-villa-ariessos-1',
    destination: '/villalar/villa-ariessos-1',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/218-villa-lara-3',
    destination: '/villalar/villa-lara-3',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/159-tas-villa-sofia',
    destination: '/villalar/tas-villa-sofia',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/282-villa-nefes-2',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/134-villa-cinar-a',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/306-villa-ofelya-3',
    destination: '/villalar/villa-ofelya-3',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/266-villa-arslan-evi',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/160-tas-villa-poyraz',
    destination: '/villalar/tas-villa-poyraz',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/64-alcan-apart-7-numara',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/191-villa-kaya-duo-2',
    destination: '/villalar/villa-kaya-duo-2',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/61-labirent-apart-hotel-b4',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/99-alcan-apart-5-numara',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/146-labirent-apart-hotel-b6',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/49-alcan-apart-4-numara',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/308-villa-doruk-park-b',
    destination: '/villalar/villa-doruk-park-b',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/313-villa-doruk-park-g',
    destination: '/villalar/villa-doruk-park-g',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/311-villa-doruk-park-e',
    destination: '/villalar/villa-doruk-park-e',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/314-villa-doruk-park-h',
    destination: '/villalar/villa-doruk-park-h',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/315-villa-doruk-park-i',
    destination: '/villalar/villa-doruk-park-i',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/307-villa-doruk-park-a',
    destination: '/villalar/villa-doruk-park-a',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/309-villa-doruk-park-c',
    destination: '/villalar/villa-doruk-park-c',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/312-villa-doruk-park-f',
    destination: '/villalar/villa-doruk-park-f',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/188-villa-levis-duo-2',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/33-labirent-apart-hotel-a1',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/50-alcan-apart-6-numara',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/149-labirent-apart-hotel-a4',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/58-labirent-apart-hotel-b1',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/55-labirent-apart-hotel-a3',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/56-labirent-apart-hotel-g2',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/60-labirent-apart-hotel-b3',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/32-labirent-apart-hotel-a2',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/59-labirent-apart-hotel-b2',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/276-villa-casa-dei-cactus',
    destination: '/villalar/villa-casa-dei-cactus',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/63-labirent-apart-hotel-b8',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/54-villa-levissi-c-blok',
    destination: '/villalar/villa-levissi-c-blok',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/48-alcan-apart-3-numara',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/304-villa-inn-house-suite-1_1',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/152-villa-garden-city-b-blok',
    destination: '/villalar/villa-garden-city-b-blok',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/273-villa-bling-premium-1',
    destination: '/villalar/villa-bling-premium-1',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/145-labirent-apart-hotel-b5',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/57-labirent-apart-hotel-g3',
    destination: '/',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/142-villa-tekin-1',
    destination: '/villalar/villa-tekin-1',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/41-villa-simay',
    destination: '/villalar/villa-simay',
    permanent: false,
  }
]

const nextConfig = {
  i18n,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME,
        port: '',
        pathname: '/**',
      },
    ],
    domains: [
      process.env.NEXT_PUBLIC_IMAGE_HOSTNAME
    ],
  },
  async redirects() {
    return google301
  },
}

module.exports = nextConfig
