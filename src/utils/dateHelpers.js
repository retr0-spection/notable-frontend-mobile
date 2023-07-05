export const getMonthAsString = (dateObj) => {
    return dateObj.toLocaleString('default', { month: 'long' });
}
export const getShortMonthAsString = (dateObj) => {
    return dateObj.toLocaleString('default', { month: 'short' });
}

export const getDateAsString = (dateObj) => {
    return dateObj.toLocaleString('default', { day: 'numeric' });
}


export const getTimeAsString = (dateObj) => {
    return dateObj.toLocaleString('default', { hour: 'numeric', minute:'numeric',hour12:false});
}

export const getTimeOfDay = (dateObj) => {
    if (dateObj.getHours() < 12){
        return 'Morning'
    }else if (dateObj.getHours() >= 12 && dateObj.getHours() < 18){
        return 'Afternoon'
    }else if (dateObj.getHours() >= 18){
        return 'Evening'
    }
}