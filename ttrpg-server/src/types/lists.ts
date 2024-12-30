export const DEFAULT_KEY = 'main'
export type ValueFunction = (context?: any) => string
export type ProbabilityFunction = (context?: any) => number
export interface RandomListItem {
  value: string | ValueFunction
  probability: number | ProbabilityFunction
  debug?: boolean
}
export type RandomList = RandomListItem[]
