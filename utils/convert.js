/**
 * Add commas to big nummers
 * @param {Number} value 
 * @returns  {Number}
 */
export const numberWithCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const abbreviateNumber = (value, precision = 4, custom_suffixes) => {
    let newValue = value;
    let suffixes = ["", "K", "M", "B", "T",'Z'];
    
    // if (custom_suffixes?.length) {
    //     suffixes = Object.assign(suffixes, custom_suffixes)
    // }

    let suffixNum = 0;
    while (newValue >= 1000) {
        newValue /= 1000;
        suffixNum++;
    }   

    newValue = newValue.toPrecision(precision);

    newValue += suffixes[suffixNum];
    return `${newValue}`;
}

import { sub, getUnixTime } from 'date-fns'
export const subUnixTimestamp = (duration, beginDate = Date.now()) => {
    return getUnixTime(sub(beginDate, duration));
}