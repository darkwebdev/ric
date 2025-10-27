export function minutesToHoursMinutes(minutes) {
    if (!Number.isFinite(minutes)) return '';

    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);

    return `${h}h ${m}m`;
}

export function calculateReadingTimeLeft(currentProgress, scenes, readingTime) {
    const totalScenes = scenes?.length || 1;
    const progressPercentage = Math.min(currentProgress / totalScenes, 1);
    return readingTime ? Math.max(0, Math.ceil(readingTime.minutes * (1 - progressPercentage))) : 0;
}