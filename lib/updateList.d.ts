/**
 * Updates array with a new array by compare, and compete between records
 * @param {array} listOld - The old array
 * @param {array} listNew - The new array
 * @param {function} compareFn - The function to compare old array items with new ones to check they are the same records (for example by id field)
 * @param {function} [competeFn] - The function to compare new items with old ones to check they are exactly newest (for example by updatedAt field)
 * @return {array} The updated and merged array
 */
export declare function updateList<T>(listOld: T[], listNew: T[], compareFn: (itemOld: T, nitemNew: T) => boolean, competeFn?: (itemOld: T, itemNew: T) => boolean): T[];
