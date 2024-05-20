export function isLeapYear(date: Date) {
    const y = date.getFullYear();
    return (!(y % 4) && y % 100) || y % 400 === 0;
}
