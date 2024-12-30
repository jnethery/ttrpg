export const DEFAULT_KEY = 'main'
export type ValueFunction = (context?: object) => string
export type ProbabilityFunction = (context?: object) => number
export interface RandomListItem {
  value: string | ValueFunction
  probability: number | ProbabilityFunction
  debug?: boolean
}
export type RandomList = RandomListItem[]
