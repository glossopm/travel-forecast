export const formatDateToCustomFormat = (date: Date | string) => {
    const newDate = new Date(date)
    const formattedDate = newDate.toLocaleDateString(undefined, { month: 'short', year: '2-digit' })
    const day = newDate.getDate()
    const suffix = getDaySuffix(day)
    return `${day}${suffix} ${formattedDate}`
}

function getDaySuffix(day: number) {
    if (day >= 11 && day <= 13) {
        return 'th'
    }
    const lastDigit = day % 10
    switch (lastDigit) {
        case 1:
            return 'st'
        case 2:
            return 'nd'
        case 3:
            return 'rd'
        default:
            return 'th'
    }
}
