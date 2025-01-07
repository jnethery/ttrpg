export const light = ['bright', 'dim', 'dark'] as const

export const visibility = [
  'clear',
  'overcast',
  'cloudy',
  'misty',
  'foggy',
] as const
export const precipitationSize = ['light', 'heavy'] as const
export const precipitationAmount = [
  'dry',
  'slight',
  'moderate',
  'heavy',
] as const
export const lightPrecipitation = [
  'dry',
  'drizzling',
  'raining',
  'pouring',
] as const
export const heavyPrecipitation = [
  'dry',
  'raining',
  'pouring',
  'pelting',
] as const
export const lightFreezingPrecipitation = [
  'dry',
  'flurrying',
  'snowing',
  'blizzarding',
] as const
export const heavyFreezingPrecipitation = [
  'dry',
  'snowing',
  'blizzarding',
  'hailing',
] as const
export const getPrecipitationString = (
  size: PrecipitationSize,
  amount: PrecipitationAmount,
  heat: HeatCondition,
) => {
  const index = precipitationAmount.indexOf(amount)
  if (heat === 'freezing') {
    return size === 'light'
      ? lightFreezingPrecipitation[index]
      : heavyFreezingPrecipitation[index]
  }
  return size === 'light'
    ? lightPrecipitation[index]
    : heavyPrecipitation[index]
}
export const heat = [
  'freezing',
  'cold',
  'cool',
  'warm',
  'hot',
  'sweltering',
] as const

export type LightCondition = (typeof light)[number]
export type VisibilityCondition = (typeof visibility)[number]
export type LightPrecipitationCondition = (typeof lightPrecipitation)[number]
export type HeavyPrecipitationCondition = (typeof heavyPrecipitation)[number]
export type PrecipitationSize = (typeof precipitationSize)[number]
export type PrecipitationAmount = (typeof precipitationAmount)[number]
export type LightFreezingPrecipitationCondition =
  (typeof lightFreezingPrecipitation)[number]
export type HeavyFreezingPrecipitationCondition =
  (typeof heavyFreezingPrecipitation)[number]
export type HeatCondition = (typeof heat)[number]

export const conditions = [
  ...light,
  ...visibility,
  ...lightPrecipitation,
  ...heavyPrecipitation,
  ...lightFreezingPrecipitation,
  ...heavyFreezingPrecipitation,
  ...heat,
] as const
export type EnvironmentalCondition =
  | LightCondition
  | VisibilityCondition
  | LightPrecipitationCondition
  | HeavyPrecipitationCondition
  | LightFreezingPrecipitationCondition
  | HeavyFreezingPrecipitationCondition
  | HeatCondition
