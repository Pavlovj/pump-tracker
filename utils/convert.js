/**
 * Add commas to big nummers
 * @param {Number} value 
 * @returns  {Number}
 */
export const numberWithCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
