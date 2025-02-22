import { arrayToRandomList } from 'lib/lists/util'
import arrays from 'lib/lists/arrays'
import { generateEvent } from 'lib/lists/events'

// TODO: Move to /arrays
const color = arrayToRandomList(['red', 'green'])
const fruit = arrayToRandomList(['[color] apple', 'orange'])
const main = [{ value: generateEvent, probability: 1 }]

export type ConfigKey = keyof typeof config
export const isConfigKey = (value: string): value is ConfigKey => {
  return value in config
}
export const config = {
  color,
  fruit,
  ...arrays,
  main,
}
