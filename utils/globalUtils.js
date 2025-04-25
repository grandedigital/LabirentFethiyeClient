import { priceTypes } from "@/data/data";

//villa detay ve otel detay sayfasında sağ yukarda Gecelik En Düşük fiyatın altına gelen fiyat aralıkları(minimum ve maximum)
export function getPriceRange(priceTablesArray = [], currentPriceTypeText, priceType, i18n, currencies) {

    const returnMinPrice = () => {
        let min = Math.min(...priceTablesArray?.map((o) => o.price));

        if (priceType != 1 && currencies) {
            //minDeğer tl değil ise tl ye çevirildi
            min = convertToTurkishLira(
                min,
                currencies?.[
                priceTypes?.find((item) => item?.type == priceType)
                    ?.key
                ]
            );
        }

        //kur hesaplama için aşağı if i aktif et
        //tl ücreti ilgili kura çevir
        // if (i18n.language != "tr") {
        //     min =
        //         min /
        //         currencies?.[
        //         priceTypes?.find((item) => item.lang == i18n.language)?.key
        //         ];
        // }

        return moneyFormat(min, false);
    };

    const returnMaxPrice = () => {
        let max = Math.max(...priceTablesArray?.map((o) => o.price));

        if (priceType != 1 && currencies) {
            //maxDeğer tl değil ise tl ye çevirildi
            max = convertToTurkishLira(
                max,
                currencies?.[
                priceTypes?.find((item) => item?.type == priceType)
                    ?.key
                ]
            );
        }

        //kur hesaplama için aşağı ifi aktif et
        //tl ücreti ilgili kura çevir
        // if (i18n.language != "tr") {
        //     max =
        //         max /
        //         currencies?.[
        //         priceTypes?.find((item) => item.lang == i18n.language)?.key
        //         ];
        // }

        return moneyFormat(max, false);
    };




    if (priceTablesArray.length == 0) {
        return <>
            {currentPriceTypeText}0
        </>
    }

    return <>
        {"₺"}
        {/* kur hesaplama için aşağıyı aktif et yukarıyı sil */}
        {/* {currentPriceTypeText} */}
        {returnMinPrice()} {" "}
        {/* - {currentPriceTypeText} */}
        {/* kur hesaplama için aşağıyı aktif et yukarıyı sil */}
        - {"₺"}
        {returnMaxPrice()} {" "}
    </>
}

export function scrolltoHash(element_id) {
    const element = document.getElementById(element_id);
    element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
    });
};

//"5.500.46" to "5.500,46"
export function replaceLastDotWithComma(input) {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }

    const lastDotIndex = input.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return input; // Nokta yoksa orijinal metni döndür
    }

    return input.slice(0, lastDotIndex) + ',' + input.slice(lastDotIndex + 1);
}

export function capitalizeWords(text) {
    return text
        .normalize('NFD') // Unicode karakterleri normalize et
        .split(' ') // Metni kelimelere ayır
        .map(word => word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR')) // Türkçe karakterler için uygun büyük/küçük harf dönüşümü
        .join(' '); // Kelimeleri birleştir
}

//"15924.000004" to "15.924"
export function moneyFormat(value, includeDecimals = true) {
    if (value) {
        // Sayıyı 1 haneli ondalıklı sayıya yuvarlayın
        const roundedValue = value.toFixed(1);

        // Tam sayı kısmını ve ondalık kısmı ayırın
        const [integerPart, decimalPart] = roundedValue.split(".");

        // Tam sayı kısmını 3'er haneli gruplara ayırın
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        // Eğer includeDecimals false veya ondalık kısım 0 ise sadece tam sayı kısmını döndürün
        if (!includeDecimals || decimalPart === "0") {
            return formattedInteger;
        }

        // Sonuç
        return `${formattedInteger},${decimalPart}`;
    }

}

export function calculatePriceType(language) {
    if (language == "tr") {
        return priceTypes.find(item => item.key == "tl").text
    }
    else if (language == "en") {
        return priceTypes.find(item => item.key == "gbp").text
    }
}

export function convertToTurkishLira(amount, cure) {

    return amount * cure
}

export function calculatePricetoTargetPriceType(price, priceType, currencies, lang) {
    let returnPrice = price

    //price'yi tl ye çevir
    if (priceType != 1) {
        returnPrice = convertToTurkishLira(
            returnPrice,
            currencies?.[
            priceTypes?.find((item) => item?.type == priceType)
                ?.key
            ]
        );
    }

    //tl ücreti ilgili kura çevir
    if (lang != "tr") {
        returnPrice =
            returnPrice /
            currencies?.[
            priceTypes?.find((item) => item.lang == lang)?.key
            ];
    }

    return price
    //kur hesaplama aktif etmek için aşağıyı aç yukarıdakini sil
    // return returnPrice
}