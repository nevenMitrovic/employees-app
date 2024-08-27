export function dateFormater(date: string) {
    const newDateFormat = date.split('/')[1] + '.' + date.split('/')[0]
    return newDateFormat.split(',')[0]
}