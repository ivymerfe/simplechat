
function subDays(date: Date, days: number) {
    const result = new Date(date.getTime());
    result.setDate(date.getDate() - days)
    return result;
}

export default function formatDate(date: Date, short: boolean): string {
    const today = new Date();
    const hoursMinutes = date.toLocaleString(undefined, {hour:"numeric", minute:"numeric"});
    if (date.toDateString() === today.toDateString()) {
        return hoursMinutes;
    }
    const yesterday = subDays(today, 1);
    const bYesterday = subDays(today, 2);
    let shortName = "";
    if (date.toDateString() === yesterday.toDateString()) {
        shortName = "Вчера";
    } else if (date.toDateString() === bYesterday.toDateString()) {
        shortName = "Позавчера";
    }
    if (shortName) {
        if (short) {
            return shortName;
        } else {
            return `${shortName}, в ${hoursMinutes}`;
        }
    }

    if (short) {
        return date.toLocaleString(undefined, {day:"numeric", month:"short"});
    } else {
        return date.toLocaleString(undefined, {day:"numeric", month:"long", hour:"numeric", minute:"numeric"})
    }
}
