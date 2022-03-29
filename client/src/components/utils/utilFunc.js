export function parseDate(date,delimiter='-') {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (!year || !month || !day) {
        return ''
    }
    return `${year}${delimiter}${month < 10 ? `0${month}` : month}${delimiter}${day < 10 ? `0${day}` : day}`
}

export function getTime(dateInput) {
    const month = (dateInput.getMonth() + 1) * 2629743;
    const year = dateInput.getFullYear() * 31556926;
    const date = dateInput.getDate() * 86400;
    return year + month + date;
}