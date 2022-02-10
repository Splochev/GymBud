export function parseDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (!year || !month || !day) {
        return ''
    }
    return `${year}-${month}-${day}`
}