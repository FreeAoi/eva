/**
 * Determines if obj1 is a subset of obj2
 * @param obj1 - Object to check if it is a subset of obj2
 * @param obj2 - Object to check if it is a superset of obj1
 * @returns {boolean} - True if obj1 is a subset of obj2, false otherwise
 */
function isSubset(obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean {
    return Object.entries(obj1).every(
        ([key, value]) => Object.prototype.hasOwnProperty.call(obj2, key) && obj2[key] === value
    );
}

export { isSubset };
