export function pluralize(count: number, noun: string, suffix = "s") {
  return `${noun}${count !== 1 ? suffix : ""}`;
}



function getEntriesSortedByField<T>(
  map: Record<string | number | symbol, T>,
  field: keyof T
) {
  return Object.entries(map).sort(([keyA, valueA], [keyB, valueB]) => {
    if (
      typeof valueA[field] === "number" &&
      typeof valueB[field] === "number"
    ) {
      return (valueA[field] as number) - (valueB[field] as number);
    }

    if (
      typeof valueA[field] === "string" &&
      typeof valueB[field] === "string"
    ) {
      return (valueA[field] as string).localeCompare(valueB[field] as string);
    }

    return 0;
  });
}

/**
 * Returns object keys sorted by value field.
 * Value field shoud be number or string.
 */
export function getKeysSortedByField<T>(map: Record<string, T>, field: keyof T) {
  return getEntriesSortedByField(map, field).map(([key]) => key);
}

/**
 * Returns object keys sorted by value field.
 * Value field shoud be number or string.
 */
export function getValuesSortedByField<T>(
  map: Record<string, T>,
  field: keyof T
) {
  return getEntriesSortedByField(map, field).map(([_, value]) => value);
}
