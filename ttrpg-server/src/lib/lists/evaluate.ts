import { config, ConfigKey, isConfigKey } from 'lib/lists'
import { DEFAULT_KEY, RandomList, RandomListItem } from 'types/lists'

/**
 * Utility Functions
 */

/**
 * Extracts keys from nested lists within a string.
 * @param input - The input string containing nested list keys.
 * @returns An array of extracted keys.
 */
const extractNestedListKeys = (input: string): string[] => {
  const pattern = /\[(.*?)\]/g
  const keys: string[] = []
  let match: RegExpExecArray | null

  while ((match = pattern.exec(input)) !== null) {
    keys.push(match[1])
  }

  return keys
}

/**
 * List Item Retrieval Functions
 */

/**
 * Retrieves a list item from the configuration by key.
 * @param key - The configuration key.
 * @returns The retrieved list item or null if not found.
 */
export const getListItemFromKey = (
  key: ConfigKey = DEFAULT_KEY,
): RandomListItem | null => {
  const list = config[key]
  return getListItem([...list])
}

/**
 * Retrieves a list item based on normalized probabilities.
 * @param list - The list of items.
 * @param context - Optional context for retrieval.
 * @returns The selected list item or null if not found.
 */
export const getListItem = (
  list: RandomList,
  context?: any,
): RandomListItem | null => {
  const randNum = Math.random()
  let cumulativeProbability = 0
  const normalizedList = normalizeProbabilities(list, context)
  const debugItems = normalizedList.filter((item) => item.debug)

  if (debugItems.length && normalizedList.length !== debugItems.length) {
    return getListItem(debugItems, context)
  }

  for (const item of normalizedList) {
    if (item.debug) {
      cumulativeProbability = 1
    } else if (typeof item.probability === 'number') {
      cumulativeProbability += item.probability
    }

    if (randNum <= cumulativeProbability) {
      return item
    }
  }

  return null
}

/**
 * Evaluation Functions
 */

/**
 * Evaluates the value of a list item.
 * @param item - The list item to evaluate.
 * @param context - Optional context for evaluation.
 * @returns The evaluated value as a string.
 */
export const evaluateItem = (item: RandomListItem, context?: any): string => {
  const itemValue =
    typeof item.value === 'string' ? item.value : item.value(context)
  return evaluate(itemValue)
}

/**
 * Evaluates a string by replacing nested list keys with their corresponding values.
 * @param input - The input string to evaluate.
 * @returns The evaluated string.
 */
const evaluate = (input: string): string => {
  let result = input
  const nestedKeys = extractNestedListKeys(input)

  for (const key of nestedKeys) {
    if (isConfigKey(key)) {
      const listItem = getListItemFromKey(key)
      if (listItem) {
        const value = evaluateItem(listItem)
        result = result.replace(`[${key}]`, value)
      }
    }
  }

  return result
}

/**
 * Probability Functions
 */

/**
 * Resolves the probabilities of items in a list.
 * @param list - The list of items.
 * @param context - Optional context for resolving probabilities.
 * @returns The list with resolved probabilities.
 */
const resolveProbabilities = (list: RandomList, context?: any): RandomList => {
  return list.map((item) => {
    const resolvedProbability =
      typeof item.probability === 'number'
        ? item.probability
        : item.probability(context)

    return {
      ...item,
      probability: resolvedProbability,
    }
  })
}

/**
 * Normalizes the probabilities of items in a list.
 * @param list - The list of items.
 * @param context - Optional context for normalization.
 * @returns The list with normalized probabilities.
 */
const normalizeProbabilities = (
  list: RandomList,
  context?: any,
): RandomList => {
  const resolvedList = resolveProbabilities(list, context)
  const totalProbability = resolvedList.reduce(
    (total, item) => total + (item.probability as number),
    0,
  )

  return resolvedList.map((item) => ({
    ...item,
    probability: (item.probability as number) / totalProbability,
  }))
}
