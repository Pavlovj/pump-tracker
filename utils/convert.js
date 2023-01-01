import { sub, getUnixTime } from 'date-fns'


/**
 * Formats a number with commas as thousands separators.
 * @param {number} value - The number to be formatted.
 * @return {string} - The formatted number as a string.
 */
export const numberWithCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Abbreviates a number by adding a suffix (K, M, B, T, or Z) representing thousands, 
 * millions, billions, trillions, or zillions.
 * 
 * @param {number} value - The value to be abbreviated.
 * @param {number} [precision=4] - The number of decimal places to show.
 * @param {string[]} [custom_suffixes] - An optional array of custom suffixes to use 
 * instead of the default suffixes ("", "K", "M", "B", "T", "Z").
 * @return {string} - The abbreviated number as a string.
 */
export const abbreviateNumber = (value, precision = 4, custom_suffixes) => {
    let newValue = value;
    let suffixes = ["", "K", "M", "B", "T", 'Z'];

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

/**
 * Subtracts a duration from a given date and returns the resulting Unix timestamp. 
 * @param {Duration} duration - The duration to subtract.
 * @param {Date} [beginDate=Date.now()] - The starting date. Defaults to the current date.
 * @return {number} - The resulting Unix timestamp.
 */
export const subUnixTimestamp = (duration, beginDate = Date.now()) => {
    return getUnixTime(sub(beginDate, duration));
}

/**
 * Shortens a number by removing trailing zeros after the decimal point.
 * 
 * @param {number} number - The number to be shortened.
 * @return {number} - The shortened number as a number.
 */
export const shortenNumber = (number) => {
    // Split the number into an array of characters
    const characters = number.toString().split('');

    // Flag to indicate whether the decimal point has been passed
    let passedDecimalPoint = false;

    // Iterate over the array of characters
    for (let i = 0; i < characters.length; i++) {
        // Constant to hold the decimal point character
        const DECIMAL_POINT = '.';

        // If the current character is the decimal point, set the flag to true
        if (characters[i] === DECIMAL_POINT) passedDecimalPoint = true;

        // If the decimal point has been passed and the current character is not a zero or the decimal point,
        // return the original string up to that point as a float
        if (passedDecimalPoint && !['0', DECIMAL_POINT].includes(characters[i])) {
            return parseFloat(number.toString().substring(0, ++i));
        }
    }

    // If no non-zero digits were found after the decimal point, return 0
    return 0;
}
