import { RandomListItem } from 'types/lists'

interface ShelterProps {
  probability: number
  sizeList?: RandomListItem[]
  exposureList?: RandomListItem[]
  visibilityList?: RandomListItem[]
  occupancyList?: RandomListItem[]
}

export interface LocationProps {
  description: string
  smell?: string
  sound?: string
  discovery?: {
    skill: string
    dc: number
    description: string
  }
  identification?: {
    skill: string
    dc: number
    description: string
  }
  effect?: string
  shelterLists: ShelterProps
}

export { locationValueFunction } from './valueFunction'
export { bubblingPool } from './bubblingPool'
export { crystalPool } from './crystalPool'
export { magicPortal } from './magicPortal'
export { naturalSwampLocations } from './naturalSwampLocations'
export { manmadeSwampLocations } from './manmadeSwampLocations'
