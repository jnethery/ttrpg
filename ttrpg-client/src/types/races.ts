export const races = [
  'dragonborn',
  'dwarf',
  'elf',
  'gnome',
  'halfElf',
  'halfOrc',
  'halfling',
  'human',
  'tiefling',
] as const

export const subraces = {
  dragonborn: ['standard'],
  dwarf: ['hill', 'mountain'],
  elf: ['high', 'wood', 'dark'],
  gnome: ['forest', 'rock'],
  halfElf: ['standard'],
  halfOrc: ['standard'],
  halfling: ['lightfoot', 'stout'],
  human: ['standard'],
  tiefling: ['standard'],
} as const

export type Race = (typeof races)[number]
export type Subrace<R extends Race> = (typeof subraces)[R][number]
