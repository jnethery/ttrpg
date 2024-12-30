export const DEFAULT_KEY = 'main'
// TODO: Can we tighten down the types here?
export type ValueFunction = (context?: any) => string
export type ProbabilityFunction = (context?: any) => number
export interface RandomListItem {
  value: string | ValueFunction
  probability: number | ProbabilityFunction
  // TODO: Can we tighten down the types here?
  props?: any
  debug?: boolean
}
export type RandomList = RandomListItem[]
