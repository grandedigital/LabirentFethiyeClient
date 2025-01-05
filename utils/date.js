//2024-05-13 to 13.05.2024
export function dateToDotFormat(dateString) {
    const arr = dateString?.split('-')
    return `${arr[arr.length - 1]}.${arr[1]}.${arr[0]}`
}

export function timeStringToDate(timeString) {
    //2023-10-20T13:55:48.0208546 to 2023-10-20
    let index = timeString.indexOf("T")
    return timeString.substr(0, index)
}

// "2024-10-08T16:37:27.9603045" to "en: January 8, 2025, tr: 8 Ocak 2025"
export function formatDate(input, lang) {
    const date = new Date(input);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const formattedDate = date.toLocaleString(lang, options);
    return formattedDate;
}