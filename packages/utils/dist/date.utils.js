export function formatDate(date, format = 'short') {
    const options = format === 'long'
        ? { year: 'numeric', month: 'long', day: 'numeric' }
        : { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}
export function isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}
export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
