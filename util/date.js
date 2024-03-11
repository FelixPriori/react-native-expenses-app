export const getFormattedDate = (date) => date.toISOString().slice(0, 10)

export const getDateMinusDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);