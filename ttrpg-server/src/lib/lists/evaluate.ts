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

export const evaluateListFromKey = (key: ConfigKey = DEFAULT_KEY) => {
  // Select a random item from the list corresponding to the DEFAULT_KEY.
  return evaluateList([...config[key]])
}

const evaluateItem = (item: RandomListItem, context?: object) => {
  const value =
    typeof item.value === 'string' ? item.value : item.value(context)
  return evaluate(value)
}

export const evaluateList = (list: RandomList, context?: object): string => {
  const randNum = Math.random()
  let cumulative = 0
  const debuggableList = list.filter((item) => item.debug)
  if (debuggableList.length && list.length !== debuggableList.length) {
    return evaluateList(debuggableList, context)
  }
  for (const item of list) {
    if (item.debug) {
      cumulative = 1
    } else if (typeof item.probability === 'number') {
      cumulative += item.probability
    } else if (typeof item.probability === 'function') {
      const evaluatedProbability = item.probability(context)
      cumulative += evaluatedProbability
    }
    if (randNum <= cumulative) {
      return evaluateItem(item)
    }
  }
  return ''
}
