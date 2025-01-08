import { getContext } from 'lib/lists/context'
import { RandomListItem } from 'types/lists'

export interface MundaneProps {
  description: string
}

export interface RandomMundaneListItem extends RandomListItem {
  props: () => MundaneProps
}

export type RandomMundaneList = RandomMundaneListItem[]

export const mundaneValueFunction = async (
  props: MundaneProps,
): Promise<string> => {
  return `
    <ul>
      <li>${props.description}</li>
    </ul>
  `
}

const swampEvents: RandomMundaneList = [
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'A mosquito buzzes annoyingly near your ear.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'The ground squelches underfoot with every step.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'A faint, unpleasant smell of decay lingers in the air.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'A frog croaks loudly, startling you.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'A trail of bubbles rises from the murky water.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'The sound of distant splashing draws your attention.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'A cloud of gnats hovers annoyingly around your face.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'A heron takes flight from a patch of reeds.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description:
          'A branch cracks loudly underfoot, echoing in the stillness.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description:
          'The water ripples as something unseen moves beneath the surface.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'A patch of mist drifts lazily across the swamp.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'The call of a distant bird echoes through the swamp.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description:
          'A vine brushes against you, sticky and damp to the touch.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'The faint smell of sulfur wafts through the air.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'The low croak of a toad vibrates through the humid air.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description:
          'The distant splash of a large animal interrupts the silence.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'A sudden breeze sets the reeds swaying and whispering.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description:
          'The murmur of flowing water draws your attention to a nearby stream.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description:
          'A spider web stretches across the path, glistening with dew.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description:
          'The wet squish of mud clinging to your boots is unrelenting.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'The air feels thick and damp, clinging to your skin.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description: 'A cluster of fireflies dances in the growing twilight.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description:
          'A snake slithers silently through the reeds, barely visible.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => {
      const { areas } = getContext()
      if (areas) {
        const applicableAreas = ['swamp']
        return areas.some((area) => applicableAreas.includes(area)) ? 1 : 0
      }
      return 0
    },
    props: () => {
      return {
        description:
          'The faint scent of blooming lilies cuts through the swamp’s musk.',
      }
    },
  },
]

export const mundane: RandomMundaneList = [
  {
    value: mundaneValueFunction,
    probability: () => 1,
    props: () => {
      return {
        description: 'It feels calm and peaceful.',
      }
    },
  },
  ...swampEvents,
]
