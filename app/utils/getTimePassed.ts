export function getTimePassed(createdAt: string): string {
    const created_at = new Date(createdAt);

    const now = new Date();
    const diffInMilliseconds = now.getTime() - created_at.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30); // تقريب للشهر بـ 30 يوم
    const diffInYears = Math.floor(diffInDays / 365); // تقريب للسنة بـ 365 يوم

    if (diffInMinutes < 60) {
        return `${diffInMinutes} munits ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour ago`;
    } else if (diffInDays < 7) {
        return `${diffInDays} day ago`;
    } else if (diffInWeeks < 4) {
        return `${diffInWeeks} week ago`;
    } else if (diffInMonths < 12) {
        return `${diffInMonths} mounth ago`;
    } else {
        return `${diffInYears} year ago`;
    }
}
