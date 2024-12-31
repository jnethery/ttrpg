const light = ['bright', 'dim', 'dark'] as const

const visibility = ['clear', 'overcast', 'cloudy', 'misty', 'foggy'] as const
const precipitation = ['drizzling', 'raining', 'pouring'] as const
const heat = ['freezing', 'cold', 'cool', 'warm', 'hot', 'sweltering'] as const

type LightCondition = (typeof light)[number]
type VisibilityCondition = (typeof visibility)[number]
type PrecipitationCondition = (typeof precipitation)[number]
type HeatCondition = (typeof heat)[number]
export type EnvironmentalCondition =
  | LightCondition
  | VisibilityCondition
  | PrecipitationCondition
  | HeatCondition
