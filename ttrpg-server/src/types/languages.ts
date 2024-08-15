export const languages = [
  'common',
  'draconic',
  'dwarvish',
  'elvish',
  'gnomish',
  'halfling',
  'infernal',
  'orc',
] as const
export type Language = (typeof languages)[number]
