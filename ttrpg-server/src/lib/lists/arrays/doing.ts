export const doing = [
  {
    value: 'in their lair',
    probability: 0.5,
  },
  {
    value: 'at their camp',
    probability: 0.5,
  },
  {
    value: 'hunting',
    probability: 0.5,
  },
  {
    value: 'raiding',
    probability: 0.5,
  },
  {
    value: 'fighting',
    probability: 1,
  },
  {
    value: 'stuck',
    probability: 1 / 3,
  },
  {
    value: 'trapped',
    probability: 1 / 3,
  },
  {
    value: 'hurt',
    probability: 1 / 3,
  },
  {
    value: 'fleeing',
    probability: 0.5,
  },
  {
    value: 'lost',
    probability: 0.5,
  },
  {
    value: 'patrolling',
    probability: 0.5,
  },
  {
    value: 'guarding',
    probability: 0.5,
  },
  {
    value: 'travelling somewhere else',
    probability: 1,
  },
  {
    value: 'exploring',
    probability: 1,
  },
]

// wants
//   to {rest|shelter|have leisure}
//   to find [object_wants]
//     rob=true
//   to {find territory|assert dominance|prove themselves}
//     rob=true
//   to go somewhere else
//   to avoid contact
//   to {destroy|kill|take something|take someone}
//   to help allies [wants]
//   to find {item|place|person|knowledge}

// object_wants
//   {food|valuables} ^[f != 'ratfolk']
//   {tasties|shinies} ^[f == 'ratfolk']
