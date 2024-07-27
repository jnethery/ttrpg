function isObject(item: any): item is object {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export const deepMerge = <T extends object>(target: T, source: T): T => {
  for (const key of Object.keys(source) as Array<keyof T>) {
    const sourceValue = source[key]
    const targetValue = target[key]

    if (isObject(sourceValue) && isObject(targetValue)) {
      deepMerge(targetValue, sourceValue)
    } else {
      target[key] = sourceValue
    }
  }
  return target
}
