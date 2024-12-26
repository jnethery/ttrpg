import { arrayToRandomList } from 'lib/lists/util'

const color = arrayToRandomList(['red', 'green'])
const fruit = arrayToRandomList(['[color] apple', 'orange'])

export type ConfigKey = keyof typeof config
export const isConfigKey = (value: string): value is ConfigKey => {
  return value in config
}
export const config = {
  color,
  fruit,
  mundane: [{ value: 'I want a [fruit]' }],
}
