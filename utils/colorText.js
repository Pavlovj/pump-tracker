/**
 * Add color to negative/positive values
 * @param {number} value 
 * @returns 
 */
export const colorPercentage = (value, symbol = '%', { isTrue = 'text-green-500', isFalse = 'text-red-600' } = {}) => {
    const profit = value > 0
    return (
        <span className={profit ? isTrue : isFalse}>
            {profit ? `+${value}` : value}{symbol}
        </span>
    )
}
