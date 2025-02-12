import moment from "moment"

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

export function dateDiff(_startDate, _endDate) {
    return (moment.duration(moment(_startDate, "YYYY-MM-DD").diff(moment(_endDate, "YYYY-MM-DD"))).asDays())
}

// _date must be date object
export function formatDateByCustomSeperator(_date, _format = 'ymd', seperator = '-') {
    const date = new Date(_date);
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`, month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`, year = date.getFullYear()

    switch (_format) {
        //2025-06-20
        case 'ymd':
            return (`${year}${seperator}${month}${seperator}${day}`)
            break;
    }
}