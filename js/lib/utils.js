/**
 * Return a random number within a range (left, right)
 * 
 * @param {number} min left
 * @param {number} max right
 * 
 * @returns {number} the chosen number
 */
export const random = (min, max) => {
  return Math.random() * (max - min) + min;
}

/**
 * Map a number from one range to another
 * 
 * @param {number} n Initial number
 * @param {number} start1 The min. of the initial range
 * @param {number} end1 The max. of the initial range
 * @param {number} start2 The min. of the second range
 * @param {number} end2 The max. of the second range
 * @returns {number} Clamped number
 */
export const map = (n, start1, end1, start2, end2) => {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}
