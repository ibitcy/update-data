/**
 * Updates array with a new array by compare, and compete between records
 * @param {array} listOld - The old array
 * @param {array} listNew - The new array
 * @param {function} compareFn - The function to compare old array items with new ones to check they are the same records (for example by id field)
 * @param {function} [competeFn] - The function to compare new items with old ones to check they are exactly newest (for example by updatedAt field)
 * @return {array} The updated and merged array
 */
export function updateList<T>(
  listOld: T[],
  listNew: T[],
  compareFn: (itemOld: T, nitemNew: T) => boolean,
  competeFn?: (itemOld: T, itemNew: T) => boolean,
): T[] {
  const result: T[] = [...listOld];

  listNew.forEach(itemNew => {
    const index = listOld.findIndex(itemOld => {
      return compareFn(itemOld, itemNew);
    });

    if (index >= 0) {
      if (competeFn ? competeFn(listOld[index], itemNew) : true) {
        result[index] = itemNew;
      }
    } else {
      result.push(itemNew);
    }
  });

  return [...result];
}
