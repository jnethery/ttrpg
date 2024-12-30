import { config, ConfigKey, isConfigKey } from 'lib/lists'
import { DEFAULT_KEY, RandomList, RandomListItem } from 'types/lists'

const extractNestedListKeys = (item: string) => {
  const listPattern = /\[(.*?)\]/g
  const matches: string[] = []
  let match: RegExpExecArray | null

  while ((match = listPattern.exec(item)) !== null) {
    matches.push(match[1])
  }
  return matches
}

const evaluate = (item: string) => {
  let evaluatedItem = item
  const nestedListKeys = extractNestedListKeys(item)

  for (const listKey of nestedListKeys) {
    if (isConfigKey(listKey)) {
      const evaluatedList = evaluateListFromKey(listKey)
      evaluatedItem = evaluatedItem.replace(`[${listKey}]`, evaluatedList)
    }
  }

  return evaluatedItem
}

export const evaluateListFromKey = (key: ConfigKey = DEFAULT_KEY): string => {
  // Select a random item from the list corresponding to the DEFAULT_KEY.
  const item = evaluateList([...config[key]])
  return item ? evaluateItem(item) : ''
}

export const evaluateItem = (item: RandomListItem, context?: any) => {
  const value =
    typeof item.value === 'string' ? item.value : item.value(context)
  return evaluate(value)
}

const evaluateProbabilityFunctions = (list: RandomList, context?: any) => {
  return list.map((item) => {
    return {
      ...item,
      probability:
        typeof item.probability === 'number'
          ? item.probability
          : item.probability(context),
    }
  })
}

const normalizeListProbabilities = (list: RandomList, context?: any) => {
  const evaluatedList = evaluateProbabilityFunctions(list, context)
  const totalProbability = evaluatedList.reduce(
    (total, item) => total + (item.probability as number),
    0,
  )
  return evaluatedList.map((item) => {
    return {
      ...item,
      probability: (item.probability as number) / totalProbability,
    }
  })
}

export const evaluateList = (
  list: RandomList,
  context?: any,
): RandomListItem | null => {
  const randNum = Math.random()
  let cumulative = 0
  const normalizedList = normalizeListProbabilities(list, context)
  const debuggableList = normalizedList.filter((item) => item.debug)
  if (
    debuggableList.length &&
    normalizedList.length !== debuggableList.length
  ) {
    return evaluateList(debuggableList, context)
  }
  for (const item of normalizedList) {
    if (item.debug) {
      cumulative = 1
    } else if (typeof item.probability === 'number') {
      cumulative += item.probability
    }
    if (randNum <= cumulative) {
      return item
    }
  }
  return null
}
