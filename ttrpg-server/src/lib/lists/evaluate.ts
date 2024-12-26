import { config, ConfigKey, isConfigKey } from 'lib/lists'
import { randomizeArray } from 'lib/random'
import { DEFAULT_KEY } from 'types/lists'

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
      const evaluatedList = evaluateList(listKey)
      evaluatedItem = evaluatedItem.replace(`[${listKey}]`, evaluatedList)
    }
  }

  return evaluatedItem
}

export const evaluateList = (key: ConfigKey = DEFAULT_KEY) => {
  // Select a random item from the list corresponding to the DEFAULT_KEY.
  // TODO: In the future, this will be from the `output` or `main` list.
  const baseList = [...config[key]]
  const randomItem = randomizeArray(baseList).pop()
  console.log({ baseList, randomItem })
  return randomItem ? evaluate(randomItem.value) : ''
}
