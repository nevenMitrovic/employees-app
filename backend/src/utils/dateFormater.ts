export function dateFormater(date: string) {
    const newDateFormat = date.split('/')[1] + '.' + date.split('/')[0] + '.' + date.split('/')[2]
    return newDateFormat.split(',')[0]
}