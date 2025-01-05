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
 * Retrieves an evaluated list item from the configuration by key.
 * @param key - The configuration key.
 * @returns The evaluated list item as a string or null if not found.
 */
export const getEvaluatedListItemFromKey = async (
  key: ConfigKey = DEFAULT_KEY,
): Promise<string | null> => {
  const listItem = getListItemFromKey(key)
  return listItem ? await evaluateItem(listItem) : null
}

export const getEvaluatedListItem = async (
  list: RandomList,
): Promise<string | null> => {
  const listItem = getListItem(list)
  return listItem ? await evaluateItem(listItem) : null
}

/**
 * Retrieves a list item based on normalized probabilities.
 * @param list - The list of items.
 * @param context - Optional context for retrieval.
 * @returns The selected list item or null if not found.
 */
export const getListItem = (list: RandomList): RandomListItem | null => {
  const randNum = Math.random()
  let cumulativeProbability = 0
  const normalizedList = normalizeProbabilities(list)
  const debugItems = normalizedList.filter((item) => item.debug)

  if (debugItems.length && normalizedList.length !== debugItems.length) {
    return getListItem(debugItems)
  }

  for (const item of normalizedList) {
    if (typeof item.probability === 'number') {
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
export const evaluateItem = async (item: RandomListItem): Promise<string> => {
  const itemValue =
    typeof item.value === 'string' ? item.value : await item.value()
  return evaluate(itemValue)
}

/**
 * Evaluates a string by replacing nested list keys with their corresponding values.
 * @param input - The input string to evaluate.
 * @returns The evaluated string.
 */
const evaluate = async (input: string): Promise<string> => {
  let result = input
  const nestedKeys = extractNestedListKeys(input)

  for (const key of nestedKeys) {
    if (isConfigKey(key)) {
      const listItem = getListItemFromKey(key)
      if (listItem) {
        const value = await evaluateItem(listItem)
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
const resolveProbabilities = (list: RandomList): RandomList => {
  return list.map((item) => {
    const resolvedProbability =
      typeof item.probability === 'number'
        ? item.probability
        : item.probability()

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
export const normalizeProbabilities = (list: RandomList): RandomList => {
  const resolvedList = resolveProbabilities(list)
  const totalProbability = resolvedList.reduce(
    (total, item) => total + (item.probability as number),
    0,
  )

  return resolvedList
    .map((item) => ({
      ...item,
      probability: (item.probability as number) / totalProbability,
    }))
    .filter((item) => item.probability > 0)
}
