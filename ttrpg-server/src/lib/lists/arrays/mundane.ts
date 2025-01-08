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
  {
    value: mundaneValueFunction,
    probability: () => 0.9,
    props: () => {
      return {
        description: 'You feel an unseen dark energy.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.8,
    props: () => {
      return {
        description: 'You hear distant cries of an unknown creature.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.7,
    props: () => {
      return {
        description: 'The wind picks up slightly, rustling your surroundings.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.6,
    props: () => {
      return {
        description: 'A faint, rhythmic tapping echoes in the distance.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.8,
    props: () => {
      return {
        description: 'The area is eerily quiet, with not even a breeze.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.7,
    props: () => {
      return {
        description: 'You feel a slight vibration beneath your feet.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.8,
    props: () => {
      return {
        description: 'A sudden gust of wind sends a chill through the air.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.7,
    props: () => {
      return {
        description: 'A strange, almost metallic scent lingers in the air.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.9,
    props: () => {
      return {
        description: 'You hear the faint sound of trickling water.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.6,
    props: () => {
      return {
        description: 'The temperature suddenly drops for a moment.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.7,
    props: () => {
      return {
        description: 'You hear faint whispers, though no one is around.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.8,
    props: () => {
      return {
        description: 'The air feels unusually heavy and humid.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.6,
    props: () => {
      return {
        description: 'A soft glow appears on the horizon, then fades.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.7,
    props: () => {
      return {
        description: 'A distant rumble suggests an approaching storm.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.5,
    props: () => {
      return {
        description: 'The ground feels slightly warm beneath your feet.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.8,
    props: () => {
      return {
        description: 'A bird or animal calls out briefly, then falls silent.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.7,
    props: () => {
      return {
        description: 'The area smells faintly of sulfur.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.6,
    props: () => {
      return {
        description: 'You notice the hairs on your arms standing on end.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.9,
    props: () => {
      return {
        description: 'The light dims for a moment, as if obscured by clouds.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.7,
    props: () => {
      return {
        description: 'A sharp crack echoes, like a distant tree breaking.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.6,
    props: () => {
      return {
        description: 'The area feels unusually warm, as if from a nearby fire.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.5,
    props: () => {
      return {
        description: 'A buzzing sound grows louder, then fades away.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.8,
    props: () => {
      return {
        description: 'You feel as though you are being watched.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.6,
    props: () => {
      return {
        description: 'A faint hum seems to emanate from the ground.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.5,
    props: () => {
      return {
        description: 'The scent of flowers briefly fills the air.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.9,
    props: () => {
      return {
        description: 'A single droplet of water lands on your face.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.7,
    props: () => {
      return {
        description: 'You hear a distant horn or similar sound.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.6,
    props: () => {
      return {
        description: 'The area feels oddly charged, like before a storm.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.8,
    props: () => {
      return {
        description: 'A shadow moves briefly across the landscape.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.5,
    props: () => {
      return {
        description: 'You hear faint, muffled laughter.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.7,
    props: () => {
      return {
        description: 'The ground emits a faint, almost imperceptible tremor.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.9,
    props: () => {
      return {
        description: 'A cold breeze brushes the back of your neck.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.8,
    props: () => {
      return {
        description: 'The sound of wings flapping overhead startles you.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.7,
    props: () => {
      return {
        description: 'A faint light pulses once, then disappears.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.8,
    props: () => {
      return {
        description: 'The sensation of being followed persists briefly.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.6,
    props: () => {
      return {
        description: 'You hear a soft, distant melody carried on the wind.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.7,
    props: () => {
      return {
        description: 'A sudden flash of color catches your eye, then fades.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.6,
    props: () => {
      return {
        description:
          'A pebble or small object rolls across the ground unnaturally.',
      }
    },
  },
  {
    value: mundaneValueFunction,
    probability: () => 0.9,
    props: () => {
      return {
        description: 'The air grows briefly warmer, then cooler again.',
      }
    },
  },
]
