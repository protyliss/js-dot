export function getTimezoneTime(date = new Date) {
    const offset = date.getTimezoneOffset();
    const fixedHour = (-offset / 60)
    return (offset < 0 ? '+' : '-') + (
        ('' + fixedHour).padStart(2, '0')
        + ':00'
    )
}