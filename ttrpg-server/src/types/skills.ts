import { Ability } from 'types/abilities'

export interface Skill {
  ability: Ability
  description: string
}

const skillNames = ['intimidation'] as const
export type SkillName = (typeof skillNames)[number]

export const skills: Record<SkillName, Skill> = {
  intimidation: {
    ability: 'charisma',
    description: 'The ability to scare people',
  },
}
