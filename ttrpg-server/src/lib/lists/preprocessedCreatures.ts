import { getContext } from 'lib/lists/context'
import { getRelationshipFilter } from 'lib/lists/relationships'
import {
  BaseRandomCreatureListItem,
  BaseCreatureProps,
  BaseRandomCreatureList,
  getSizesLt,
  getSizesLte,
  CreatureTag,
} from 'types/creatures'

// TODO: add Duergar
// TODO: add Goblins (and Hobgooblins) once they are ready

const defaultRatfolkProps: Omit<BaseCreatureProps, 'xp'> = {
  url: '', // TODO: Link to Notion or D&D Beyond
  tags: ['humanoid', 'mammal'],
  areas: [{ area: 'swamp', probability: 1 }],
  regions: [
    { region: 'Dreadmire Swamp', probability: 0.1 }, // They do not occupy much of the surface.
    { region: 'Grimmhold', probability: 1 }, // The ratfolk city. They are the dominant species here.
  ],
  predisposition: {
    distant: 0,
    nearby: -20,
  },
  enemies: [
    (creature: BaseRandomCreatureListItem) => {
      return getRelationshipFilter({
        operation: 'or',
        creature,
        diet: {
          dietTags: ['insect', 'fish', 'plant'],
          dietSizes: ['small', 'medium'],
        },
        moralAlignments: ['evil'],
      })
    },
  ],
  allies: [
    (creature: BaseRandomCreatureListItem) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        creatureNames: ['ratfolk'],
      })
    },
  ],
}

// TODO: I will be using Eladrin for the Fey forest, but not for the first area

export const preprocessedCreatures: BaseRandomCreatureList = [
  // HOMEBREW
  // Ratfolk
  {
    value: 'ratfolk freak',
    probability: function () {
      return getProbabilityMod(this.props, 0.25 / 5)
    },
    props: {
      xp: 1100,
      legalAlignments: ['chaotic'],
      moralAlignments: ['neutral', 'good'],
      ...defaultRatfolkProps,
    },
  },
  {
    value: 'ratfolk inventor',
    probability: function () {
      return getProbabilityMod(this.props, 0.25)
    },
    props: {
      xp: 100,
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral', 'good'],
      ...defaultRatfolkProps,
    },
  },
  {
    value: 'ratfolk scavenger',
    probability: function () {
      return getProbabilityMod(this.props, (0.25 * 2) / 5)
    },
    props: {
      xp: 50,
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral', 'good'],
      ...defaultRatfolkProps,
    },
  },
  {
    value: 'ratfolk captain',
    probability: function () {
      return getProbabilityMod(this.props, 0.25 / 5)
    },
    props: {
      xp: 200,
      legalAlignments: ['lawful'],
      moralAlignments: ['neutral', 'good'],
      ...defaultRatfolkProps,
    },
  },
  // D&D 5E
  {
    value: 'adult kruthik',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560713-adult-kruthik',
      xp: 450,
      tags: ['monstrosity', 'insect'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.4 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'mountain', probability: 0.2 },
        { area: 'swamp', probability: 0.05 },
        { area: 'desert', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Hunts prey methodically from range
        nearby: -50, // Extremely aggressive when close
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['monstrosity', 'insect'],
            moralAlignments: ['neutral'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast', 'monstrosity'],
            moralAlignments: ['good'],
          })
        },
      ],
    },
  },
  {
    value: 'allip',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560718-allip',
      predisposition: {
        distant: -40, // Highly aggressive at range due to malevolent nature
        nearby: -50, // Aggressive when in proximity
      },
      xp: 1800,
      areas: [
        { area: 'cursed', probability: 0.25 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'underdark', probability: 0.15 },
        { area: 'urban', probability: 0.1 },
        { area: 'swamp', probability: 0.05 },
        { area: 'forest', probability: 0.03 },
        { area: 'mountain', probability: 0.02 },
      ],
      tags: ['undead'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      enemies: [
        () => {
          return true
        },
      ],
      allies: [],
    },
  },
  {
    value: 'ankheg',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16787-ankheg',
      xp: 450,
      tags: ['monstrosity', 'insect'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'grassland', probability: 0.3 },
        { area: 'hill', probability: 0.25 },
        { area: 'forest', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
        { area: 'desert', probability: 0.05 },
        { area: 'dungeon', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Defends territory aggressively
        nearby: -50, // Extremely dangerous up close
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            operation: 'or',
            creature,
            diet: {
              dietTags: ['humanoid', 'beast'],
              dietSizes: getSizesLte('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'ape',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16788-ape',
      xp: 100,
      tags: ['beast', 'mammal'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'mountain', probability: 0.25 },
        { area: 'swamp', probability: 0.1 },
        { area: 'hill', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Neutral at a distance unless provoked
        nearby: -30, // Defensive when close
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            operation: 'or',
            creature,
            creatureNames: ['ape'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            operation: 'or',
            creature,
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'archer',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560725-archer',
      xp: 700,
      tags: ['humanoid', 'mercenary'],
      sizes: ['medium'],
      legalAlignments: ['neutral', 'lawful', 'chaotic'],
      moralAlignments: ['good', 'neutral', 'evil'],
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'hill', probability: 0.25 },
        { area: 'urban', probability: 0.2 },
        { area: 'grassland', probability: 0.1 },
        { area: 'mountain', probability: 0.1 },
        { area: 'coastal', probability: 0.05 },
      ],
      predisposition: {
        distant: -30, // Highly dangerous at range due to sharpshooting abilities
        nearby: -20, // Effective but less proficient in melee
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['lawEnforcement', 'mercenary', 'ranger'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'mercenary', 'criminal'],
          })
        },
      ],
    },
  },
  {
    value: 'awakened shrub',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16791-awakened-shrub',
      xp: 10,
      tags: ['plant'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'cursed', probability: 0.3 },
        { area: 'swamp', probability: 0.2 },
        { area: 'grassland', probability: 0.1 },
        { area: 'urban', probability: 0.05 },
      ],
      predisposition: {
        distant: 0, // Neutral and non-aggressive
        nearby: -10, // Minimal aggression for self-defense
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['plant', 'fey', 'druid'],
            creatureNames: ['dryad', 'treant'],
          })
        },
      ],
      enemies: [],
    },
  },
  {
    value: 'awakened tree',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16792-awakened-tree',
      xp: 450,
      tags: ['plant'],
      sizes: ['huge'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.5 },
        { area: 'cursed', probability: 0.3 },
        { area: 'swamp', probability: 0.2 },
        { area: 'grassland', probability: 0.1 },
        { area: 'urban', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Passive until directly threatened
        nearby: -30, // More assertive in defending itself
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['plant', 'fey', 'druid'],
            creatureNames: ['dryad', 'treant'],
          })
        },
      ],
      enemies: [],
    },
  },
  {
    value: 'baboon',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16795-baboon',
      xp: 10,
      tags: ['beast', 'mammal'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'hill', probability: 0.25 },
        { area: 'grassland', probability: 0.2 },
        { area: 'mountain', probability: 0.1 },
        { area: 'swamp', probability: 0.1 },
        { area: 'urban', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Distrustful at a distance
        nearby: -20, // Aggressive in groups when close
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['fey', 'druid', 'ranger'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            operation: 'or',
            creature,
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSizesLt('small'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'badger',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16796-badger',
      xp: 10,
      tags: ['beast', 'mammal'],
      sizes: ['tiny'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'grassland', probability: 0.3 },
        { area: 'hill', probability: 0.2 },
        { area: 'mountain', probability: 0.1 },
      ],
      predisposition: {
        distant: 0, // Neutral unless provoked
        nearby: -20, // Aggressive when cornered or threatened
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['fey', 'druid', 'ranger'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            operation: 'or',
            creature,
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSizesLte('tiny'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'bandit',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16798-bandit',
      xp: 25,
      tags: ['humanoid', 'criminal', 'mercenary'],
      sizes: ['medium'],
      legalAlignments: ['neutral', 'chaotic'],
      moralAlignments: ['good', 'neutral', 'evil'],
      areas: [
        { area: 'urban', probability: 0.3 },
        { area: 'forest', probability: 0.25 },
        { area: 'grassland', probability: 0.2 },
        { area: 'hill', probability: 0.1 },
        { area: 'mountain', probability: 0.1 },
        { area: 'dungeon', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Opportunistic attacks at range
        nearby: -40, // Aggressive in close combat
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['criminal', 'mercenary'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            legalAlignments: ['lawful', 'neutral'],
            tags: ['humanoid', 'criminal', 'mercenary', 'lawEnforcement'],
          })
        },
      ],
    },
  },
  {
    value: 'bandit captain',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16799-bandit-captain',
      xp: 450,
      tags: ['humanoid', 'criminal', 'mercenary'],
      sizes: ['medium'],
      legalAlignments: ['neutral', 'chaotic'],
      moralAlignments: ['neutral', 'evil'],
      areas: [
        { area: 'urban', probability: 0.3 },
        { area: 'forest', probability: 0.25 },
        { area: 'grassland', probability: 0.2 },
        { area: 'hill', probability: 0.1 },
        { area: 'mountain', probability: 0.1 },
        { area: 'dungeon', probability: 0.05 },
      ],
      predisposition: {
        distant: -30, // Tactical at a distance
        nearby: -50, // Extremely aggressive when engaging
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['criminal', 'mercenary'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            legalAlignments: ['lawful', 'neutral'],
            tags: ['humanoid', 'criminal', 'mercenary', 'lawEnforcement'],
          })
        },
      ],
    },
  },
  {
    value: 'berserker',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16805-berserker',
      xp: 450,
      tags: ['humanoid'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['neutral', 'evil'],
      areas: [
        { area: 'mountain', probability: 0.3 },
        { area: 'forest', probability: 0.25 },
        { area: 'hill', probability: 0.2 },
        { area: 'grassland', probability: 0.15 },
        { area: 'cursed', probability: 0.1 },
      ],
      predisposition: {
        distant: -40, // Strongly motivated to close the distance with enemies
        nearby: -50, // Highly aggressive in melee combat
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['criminal', 'mercenary'],
            moralAlignments: ['neutral', 'evil'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'lawEnforcement'],
            legalAlignments: ['lawful'],
            moralAlignments: ['good'],
          })
        },
      ],
    },
  },
  {
    value: 'black bear',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16806-black-bear',
      xp: 100,
      tags: ['beast', 'mammal'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.5 },
        { area: 'hill', probability: 0.3 },
        { area: 'mountain', probability: 0.2 },
        { area: 'grassland', probability: 0.1 },
        { area: 'swamp', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Wary but defensive of territory
        nearby: -40, // Highly aggressive if cornered
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['fey', 'druid', 'ranger'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['fish', 'insect', 'mammal', 'reptile', 'plant'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'black pudding',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16808-black-pudding',
      xp: 1100,
      tags: ['ooze'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'dungeon', probability: 0.35 },
        { area: 'underdark', probability: 0.25 },
        { area: 'swamp', probability: 0.1 },
        { area: 'cursed', probability: 0.08 },
        { area: 'mountain', probability: 0.03 },
        { area: 'forest', probability: 0.02 },
      ],
      predisposition: {
        distant: -30, // Aggressive towards movement at range
        nearby: -50, // Deadly up close due to predatory instinct
      },
      allies: [],
      enemies: [
        (_creature: BaseRandomCreatureListItem) => {
          // Oozes attack anything that moves
          return true
        },
      ],
    },
  },
  {
    value: 'blink dog',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16809-blink-dog',
      xp: 50,
      tags: ['fey'],
      sizes: ['medium'],
      legalAlignments: ['lawful'],
      moralAlignments: ['good'],
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'grassland', probability: 0.25 },
        { area: 'hill', probability: 0.15 },
        { area: 'coastal', probability: 0.1 },
        { area: 'mountain', probability: 0.1 },
        { area: 'cursed', probability: 0.05 },
        { area: 'urban', probability: 0.02 },
      ],
      predisposition: {
        distant: 20, // Prefers avoidance over confrontation
        nearby: -10, // Protective when close to allies
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['fey', 'ranger', 'druid'],
            moralAlignments: ['good'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['beast', 'monstrosity'],
            moralAlignments: ['evil'],
            legalAlignments: ['chaotic'],
            diet: {
              dietTags: ['beast'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'blood hawk',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16810-blood-hawk',
      xp: 25,
      tags: ['beast', 'bird'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'mountain', probability: 0.35 },
        { area: 'hill', probability: 0.2 },
        { area: 'grassland', probability: 0.15 },
        { area: 'forest', probability: 0.1 },
        { area: 'coastal', probability: 0.1 },
        { area: 'desert', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Opportunistic attacks in the air
        nearby: -40, // Highly aggressive near its nest
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'druid', 'ranger', 'criminal'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSizesLt('small'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'boar',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16812-boar',
      xp: 50,
      tags: ['beast', 'mammal'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'grassland', probability: 0.25 },
        { area: 'hill', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
        { area: 'coastal', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Defensive at a distance
        nearby: -40, // Ferociously aggressive when close
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['fey', 'druid', 'ranger'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'boggle',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17224-boggle',
      xp: 25,
      tags: ['fey'],
      sizes: ['small'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'swamp', probability: 0.25 },
        { area: 'urban', probability: 0.2 },
        { area: 'dungeon', probability: 0.1 },
        { area: 'cursed', probability: 0.05 },
      ],
      predisposition: {
        distant: -30, // Mischievous and opportunistic
        nearby: -50, // Extremely aggressive if cornered
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['fey', 'druid'],
            legalAlignments: ['neutral', 'chaotic'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSizesLt('small'),
            },
          })
        },
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['humanoid', 'lawEnforcement'],
            legalAlignments: ['lawful'],
          })
        },
      ],
    },
  },
  {
    value: 'bone naga',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.aidedd.org/dnd/monstres.php?vo=bone-naga',
      xp: 1100,
      tags: ['undead'],
      sizes: ['large'],
      legalAlignments: ['lawful'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'dungeon', probability: 0.4 },
        { area: 'cursed', probability: 0.3 },
        { area: 'underdark', probability: 0.2 },
        { area: 'swamp', probability: 0.05 },
        { area: 'mountain', probability: 0.03 },
        { area: 'forest', probability: 0.02 },
      ],
      predisposition: {
        distant: -30, // Calculated attacks from range
        nearby: -50, // Deadly and aggressive in close combat
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['undead'],
            moralAlignments: ['evil'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            moralAlignments: ['good'],
          })
        },
      ],
    },
  },
  {
    value: 'brown bear',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16816-brown-bear',
      xp: 200,
      tags: ['beast', 'mammal'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'hill', probability: 0.25 },
        { area: 'mountain', probability: 0.2 },
        { area: 'grassland', probability: 0.1 },
        { area: 'coastal', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Wary of intruders
        nearby: -30, // Aggressive in defense of self or cubs
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['druid', 'fey', 'ranger'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSizesLt('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'bodak',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560744-bodak',
      predisposition: {
        distant: -50, // Actively seeks to harm others at range
        nearby: -50, // Equally deadly up close
      },
      xp: 2300,
      areas: [
        { area: 'cursed', probability: 0.15 },
        { area: 'dungeon', probability: 0.1 },
        { area: 'underdark', probability: 0.05 },
        { area: 'swamp', probability: 0.03 },
      ],
      conditions: [
        { condition: 'dim', probability: 0.05 },
        { condition: 'bright', probability: 0 },
      ],
      tags: ['undead'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      enemies: [
        () => {
          return true
        },
      ],
      allies: [],
    },
  },
  {
    value: 'bugbear',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16843-bugbear',
      xp: 200,
      tags: ['goblinoid', 'humanoid'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'forest', probability: 0.35 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'hill', probability: 0.2 },
        { area: 'mountain', probability: 0.1 },
        { area: 'cursed', probability: 0.05 },
      ],
      regions: [
        { region: 'Drakknarbuk Mine', probability: 1 },
        { region: 'Blighted Heart', probability: 0.5 },
      ],
      predisposition: {
        distant: -20, // Tactical and stealthy at a distance
        nearby: -40, // Strong and aggressive in melee
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['goblinoid'],
            creatureNames: ['orc'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid'],
            moralAlignments: ['good'],
            legalAlignments: ['lawful'],
          })
        },
      ],
    },
  },
  {
    value: 'bugbear chief',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary/bugbear-chief-mm.html',
      xp: 700,
      tags: ['goblinoid', 'humanoid'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'forest', probability: 0.35 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'hill', probability: 0.2 },
        { area: 'mountain', probability: 0.1 },
        { area: 'cursed', probability: 0.05 },
      ],
      regions: [
        { region: 'Drakknarbuk Mine', probability: 1 },
        { region: 'Blighted Heart', probability: 0.5 },
      ],
      predisposition: {
        distant: -30, // Commanding and tactical at range
        nearby: -50, // Lethal in close combat
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['goblinoid', 'mercenary'],
            creatureNames: ['orc'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid'],
            moralAlignments: ['good'],
            legalAlignments: ['lawful'],
          })
        },
      ],
    },
  },
  {
    value: 'bullywug',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary/bullywug-mm.html',
      predisposition: {
        distant: -20, // Opportunistic and territorial
        nearby: -40, // Aggressive when their territory is intruded upon
      },
      xp: 50,
      areas: [
        { area: 'swamp', probability: 0.6 },
        { area: 'coastal', probability: 0.15 },
        { area: 'forest', probability: 0.1 },
        { area: 'underwater', probability: 0.05 },
        { area: 'cursed', probability: 0.03 },
        { area: 'grassland', probability: 0.02 },
        { area: 'hill', probability: 0.02 },
      ],
      tags: ['humanoid', 'amphibian'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: [
                'insect',
                'fish',
                'bird',
                'amphibian',
                'reptile',
                'plant',
              ],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            creatureNames: ['frog', 'toad', 'bullywug'],
          })
        },
      ],
    },
  },
  {
    value: 'carrion crawler',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#carrion%20crawler_mm',
      xp: 450,
      tags: ['monstrosity', 'insect'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'dungeon', probability: 0.4 },
        { area: 'underdark', probability: 0.35 },
        { area: 'swamp', probability: 0.1 },
        { area: 'cursed', probability: 0.05 },
        { area: 'forest', probability: 0.05 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: -30, // Focuses on scavenging, attacks threats
        nearby: -50, // Highly aggressive when prey is close
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['ooze', 'undead', 'monstrosity'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['beast', 'monstrosity', 'humanoid'],
            moralAlignments: ['good'],
          })
        },
      ],
    },
  },
  {
    value: 'cat',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16820-cat',
      xp: 10,
      tags: ['beast', 'mammal'],
      sizes: ['tiny'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'urban', probability: 0.4 },
        { area: 'forest', probability: 0.3 },
        { area: 'grassland', probability: 0.2 },
        { area: 'hill', probability: 0.05 },
        { area: 'coastal', probability: 0.05 },
      ],
      predisposition: {
        distant: 10, // Avoidant unless approached
        nearby: -10, // Cautious and defensive
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'druid', 'ranger', 'fey'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSizesLte('tiny'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'catoblepas',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560750-catoblepas',
      predisposition: {
        distant: -20, // Defends territory at range
        nearby: -50, // Extremely aggressive in close combat
      },
      xp: 1800,
      areas: [
        { area: 'swamp', probability: 0.3 },
        { area: 'cursed', probability: 0.2 },
        { area: 'grassland', probability: 0.15 },
        { area: 'forest', probability: 0.1 },
        { area: 'hill', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
      ],
      tags: ['monstrosity', 'reptile', 'mammal'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['plant'],
              dietSizes: getSizesLte('large'),
            },
          })
        },
      ],
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            moralAlignments: ['evil'],
          })
        },
      ],
    },
  },
  {
    value: 'cave fisher',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/cave-fisher',
      xp: 450,
      tags: ['monstrosity', 'insect'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.4 },
        { area: 'dungeon', probability: 0.35 },
        { area: 'mountain', probability: 0.1 },
        { area: 'cursed', probability: 0.05 },
        { area: 'swamp', probability: 0.05 },
        { area: 'forest', probability: 0.03 },
      ],
      predisposition: {
        distant: -30, // Highly aggressive towards prey at range
        nearby: -50, // Deadly in close quarters due to grappling and ambush tactics
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'undead'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            diet: {
              dietTags: ['humanoid', 'beast', 'insect'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'centaur',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16821-centaur',
      xp: 450,
      tags: ['humanoid', 'monstrosity'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['good', 'neutral'],
      areas: [
        { area: 'grassland', probability: 0.4 },
        { area: 'forest', probability: 0.3 },
        { area: 'hill', probability: 0.2 },
        { area: 'coastal', probability: 0.05 },
        { area: 'mountain', probability: 0.05 },
      ],
      regions: [
        { region: 'Veilwood Hollow', probability: 0.75 }, // Forested area with a hidden village
        { region: 'Whispering Glade', probability: 1 }, // Deep part of the forest, where the fey reside
      ],
      predisposition: {
        distant: 0, // Neutral towards others unless provoked
        nearby: -20, // Defensive when their territory is intruded upon
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['fey', 'humanoid', 'druid', 'ranger'],
            moralAlignments: ['good', 'neutral'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'humanoid'],
            moralAlignments: ['evil'],
            diet: {
              dietTags: ['beast'],
              dietSizes: getSizesLt('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'chimera',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16823-chimera',
      xp: 2300,
      tags: ['monstrosity'],
      sizes: ['large'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'mountain', probability: 0.35 },
        { area: 'hill', probability: 0.3 },
        { area: 'forest', probability: 0.15 },
        { area: 'cursed', probability: 0.1 },
        { area: 'dungeon', probability: 0.05 },
        { area: 'swamp', probability: 0.05 },
      ],
      predisposition: {
        distant: -30, // Aggressive and territorial at range
        nearby: -50, // Highly dangerous and unpredictable in melee
      },
      allies: [],
      enemies: [
        (_creature: BaseRandomCreatureListItem) => {
          return true
        },
      ],
    },
  },
  {
    value: 'chitine',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/chitine',
      xp: 200,
      tags: ['monstrosity', 'arachnid'],
      sizes: ['small'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'swamp', probability: 0.1 },
        { area: 'cursed', probability: 0.05 },
        { area: 'forest', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Highly suspicious of intruders, often ambushes from afar
        nearby: -40, // Aggressive in close combat, especially when cornered
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['fey'],
            moralAlignments: ['evil'],
          })
        },
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['arachnid', 'monstrosity'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            moralAlignments: ['good'],
          })
        },
      ],
    },
  },
  {
    value: 'choker',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560754-choker',
      xp: 200,
      tags: ['aberration'],
      sizes: ['small'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'dungeon', probability: 0.5 },
        { area: 'underdark', probability: 0.4 },
        { area: 'cursed', probability: 0.2 },
        { area: 'mountain', probability: 0.1 },
        { area: 'forest', probability: 0.05 },
      ],
      predisposition: {
        distant: -30, // Opportunistic and lurks in shadows
        nearby: -50, // Extremely aggressive when prey is within reach
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['aberration', 'monstrosity'],
            moralAlignments: ['evil'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            moralAlignments: ['good', 'neutral'],
          })
        },
      ],
    },
  },
  {
    value: 'choldrith',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560755-choldrith',
      xp: 700,
      tags: ['aberration', 'humanoid', 'arachnid'],
      sizes: ['medium'],
      legalAlignments: ['neutral', 'chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'cursed', probability: 0.2 },
      ],
      predisposition: {
        distant: -30, // Uses spells and webs to ensnare prey at a distance
        nearby: -40, // Aggressive in melee when it feels cornered or dominant
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['arachnid', 'aberration'],
            moralAlignments: ['evil'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            moralAlignments: ['good', 'neutral'],
          })
        },
      ],
    },
  },
  {
    value: 'chuul',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16824-chuul',
      xp: 1100,
      tags: ['aberration', 'aquatic'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'swamp', probability: 0.4 },
        { area: 'underwater', probability: 0.35 },
        { area: 'coastal', probability: 0.2 },
        { area: 'underdark', probability: 0.15 },
        { area: 'cursed', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Defensive and territorial at range
        nearby: -50, // Ferociously aggressive in close quarters
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['aberration', 'aquatic'],
            moralAlignments: ['evil'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            moralAlignments: ['good', 'neutral'],
          })
        },
      ],
    },
  },
  {
    value: 'cloaker',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16826-cloaker',
      xp: 3900,
      tags: ['aberration'],
      sizes: ['large'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.35 },
        { area: 'cursed', probability: 0.2 },
      ],
      predisposition: {
        distant: -20, // Cautiously observes before engaging
        nearby: -50, // Aggressive and predatory in close quarters
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['aberration', 'undead', 'monstrosity'],
            moralAlignments: ['evil'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            moralAlignments: ['good', 'neutral'],
          })
        },
      ],
    },
  },
  {
    value: 'constrictor snake',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16830-constrictor-snake',
      xp: 50,
      tags: ['beast', 'reptile'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'swamp', probability: 0.3 },
        { area: 'forest', probability: 0.25 },
        { area: 'coastal', probability: 0.15 },
        { area: 'grassland', probability: 0.1 },
        { area: 'cursed', probability: 0.05 },
        { area: 'dungeon', probability: 0.03 },
      ],
      predisposition: {
        distant: 0, // Neutral unless provoked
        nearby: -40, // Deadly constriction when close
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['mammal', 'bird', 'insect', 'fish'],
              dietSizes: getSizesLt('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'corpse flower',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560762-corpse-flower',
      xp: 3900,
      tags: ['plant'],
      sizes: ['large'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'cursed', probability: 0.3 },
        { area: 'swamp', probability: 0.25 },
        { area: 'forest', probability: 0.2 },
        { area: 'dungeon', probability: 0.15 },
        { area: 'underdark', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Lures prey from range
        nearby: -50, // Extremely aggressive in melee
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            creatureNames: ['zombie'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['undead', 'humanoid'],
          })
        },
      ],
    },
  },
  {
    value: 'crocodile',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16834-crocodile',
      xp: 100,
      tags: ['beast', 'reptile'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'swamp', probability: 0.4 },
        { area: 'coastal', probability: 0.3 },
        { area: 'forest', probability: 0.15 },
        { area: 'cursed', probability: 0.1 },
        { area: 'grassland', probability: 0.05 },
        { area: 'dungeon', probability: 0.02 },
      ],
      predisposition: {
        distant: -10, // Lurks and ambushes from range
        nearby: -50, // Highly dangerous in close quarters
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['mammal', 'bird', 'insect', 'fish'],
              dietSizes: getSizesLte('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'darkling',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17231-darkling',
      xp: 100,
      tags: ['fey'],
      sizes: ['small'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['neutral'],
      conditions: [
        { condition: 'dim', probability: 0.05 },
        { condition: 'bright', probability: 0 },
      ],
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'cursed', probability: 0.25 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'underdark', probability: 0.15 },
        { area: 'urban', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Hostile in dark conditions
        nearby: -40, // More dangerous when close
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          const evilFeyFilter = getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['fey'],
            moralAlignments: ['evil', 'neutral'],
          })
          const darklingFilter = getRelationshipFilter({
            creature,
            operation: 'or',
            creatureNames: ['darkling', 'shadow', 'wraith'],
          })
          return evilFeyFilter || darklingFilter
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['fey'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['fey', 'beast'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'darkling elder',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17232-darkling-elder',
      xp: 450,
      tags: ['fey'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['neutral'],
      conditions: [
        { condition: 'dim', probability: 0.05 },
        { condition: 'bright', probability: 0 },
      ],
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'cursed', probability: 0.25 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'underdark', probability: 0.15 },
        { area: 'urban', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Observes and assesses from a distance
        nearby: -40, // Highly aggressive in close quarters
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          const evilFeyFilter = getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['fey'],
            moralAlignments: ['evil', 'neutral'],
          })
          const darklingFilter = getRelationshipFilter({
            creature,
            operation: 'or',
            creatureNames: ['darkling', 'shadow', 'wraith'],
          })
          return evilFeyFilter || darklingFilter
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['fey'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['fey', 'beast'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'darkmantle',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16837-darkmantle',
      xp: 100,
      tags: ['monstrosity'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'cursed', probability: 0.15 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Ambushes prey from the shadows
        nearby: -40, // Deadly and relentless in close quarters
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'aberration', 'ooze'],
            moralAlignments: ['neutral', 'evil'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            moralAlignments: ['good'],
          })
        },
      ],
    },
  },
  {
    value: 'deep rothe',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560768-deep-rothe',
      xp: 50,
      tags: ['beast', 'mammal'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'mountain', probability: 0.15 },
        { area: 'cursed', probability: 0.05 },
      ],
      predisposition: {
        distant: 0, // Passive at range, avoids confrontation
        nearby: -20, // Defensive if threatened or cornered
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            creatureNames: ['duergar', 'drow'],
            moralAlignments: ['neutral'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['plant'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'deer',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/deer',
      xp: 10,
      tags: ['beast', 'mammal'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.5 },
        { area: 'grassland', probability: 0.3 },
        { area: 'hill', probability: 0.15 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: 10, // Skittish and avoids confrontation
        nearby: -10, // Defensive if cornered or injured
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['druid', 'ranger', 'fey'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['plant'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'derro',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560773-derro',
      xp: 50,
      tags: ['humanoid', 'dwarf'],
      sizes: ['small'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'cursed', probability: 0.15 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Opportunistic and aggressive from range
        nearby: -40, // Dangerous and reckless in melee
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['humanoid', 'dwarf', 'aberration'],
            moralAlignments: ['evil'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'fey'],
            diet: {
              dietTags: ['plant', 'beast'],
              dietSizes: getSizesLte('medium'),
            },
            moralAlignments: ['good'],
          })
        },
      ],
    },
  },
  {
    value: 'derro savant',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560772-derro-savant',
      xp: 700,
      tags: ['humanoid', 'dwarf'],
      sizes: ['small'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'cursed', probability: 0.15 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: -30, // Aggressively utilizes spells to weaken enemies
        nearby: -20, // Will fight if needed but prioritizes spell use
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'dwarf', 'aberration'],
            moralAlignments: ['evil'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'fey'],
            diet: {
              dietTags: ['plant', 'beast'],
              dietSizes: getSizesLte('medium'),
            },
            moralAlignments: ['good'],
          })
        },
      ],
    },
  },
  {
    value: 'dire wolf',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16841-dire-wolf',
      xp: 200,
      tags: ['beast', 'mammal'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'hill', probability: 0.25 },
        { area: 'mountain', probability: 0.2 },
        { area: 'grassland', probability: 0.1 },
        { area: 'swamp', probability: 0.05 },
      ],
      // TODO: Make predisposition a function similar to allies/enemies that takes faction relationships into account.
      predisposition: {
        distant: -20, // Cautiously opportunistic from range
        nearby: -40, // Fiercely aggressive in melee
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return (
            getRelationshipFilter({
              creature,
              operation: 'or',
              tags: ['beast', 'fey'],
              creatureNames: ['wolf', 'worg'],
            }) &&
            !getRelationshipFilter({
              creature,
              operation: 'or',
              tags: ['arachnid'], // No wolf spiders.
            })
          )
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            diet: {
              dietTags: ['mammal'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'diseased giant rat',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/288142-diseased-giant-rat',
      xp: 25,
      tags: ['beast'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'urban', probability: 0.4 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'swamp', probability: 0.15 },
        { area: 'cursed', probability: 0.1 },
        { area: 'forest', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Skittish at range but opportunistic
        nearby: -30, // Aggressive when threatened or cornered
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['beast', 'undead'],
            creatureNames: ['rat', 'swarm of rats'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['insect', 'plant'],
              dietSizes: getSizesLt('small'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'displacer beast',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary/displacer-beast-mm.html',
      xp: 700,
      tags: ['monstrosity'],
      sizes: ['large'],
      legalAlignments: ['lawful'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'forest', probability: 0.35 },
        { area: 'cursed', probability: 0.3 },
        { area: 'underdark', probability: 0.2 },
        { area: 'dungeon', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Stalks and harasses prey from range
        nearby: -50, // Deadly and relentless in melee
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity'],
            creatureNames: ['shadow', 'dark'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['beast', 'humanoid'],
              dietSizes: getSizesLt('large'),
            },
            creatureNames: ['blink dog'],
          })
        },
      ],
    },
  },
  {
    value: 'doppelganger',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16843-doppelganger',
      xp: 700,
      tags: ['humanoid', 'monstrosity'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil', 'neutral'],
      areas: [
        { area: 'urban', probability: 0.4 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'underdark', probability: 0.2 },
        { area: 'forest', probability: 0.05 },
        { area: 'cursed', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Prefers deception and manipulation at range
        nearby: -30, // Aggressive when its cover is blown
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            creatureNames: ['doppelganger', 'changeling'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'lawEnforcement'],
            moralAlignments: ['good'],
          })
        },
      ],
    },
  },
  {
    value: 'drow',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17133-drow',
      xp: 50,
      tags: ['humanoid', 'elf'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'cursed', probability: 0.1 },
        { area: 'forest', probability: 0.05 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Often uses ranged attacks and spells at a distance
        nearby: -40, // Deadly in melee, especially with poisoned weapons
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            creatureNames: ['drow', 'drider', 'quaggoth'],
            tags: ['arachnid'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['humanoid', 'dwarf', 'elf'],
            moralAlignments: ['good'],
          })
        },
      ],
    },
  },
  {
    value: 'druid',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16848-druid',
      xp: 450,
      tags: ['humanoid'],
      sizes: ['medium'],
      legalAlignments: ['neutral', 'lawful', 'chaotic'],
      moralAlignments: ['good', 'neutral', 'evil'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'grassland', probability: 0.25 },
        { area: 'swamp', probability: 0.15 },
        { area: 'hill', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
        { area: 'coastal', probability: 0.05 },
      ],
      regions: [
        { region: 'Whispering Glade', probability: 1 },
        { region: 'Dreadmire Swamp', probability: 0.2 }, // They occasionally venture out of their grove
        { region: 'Shadewood Weald', probability: 0.1 },
      ],
      predisposition: {
        distant: -10, // Often uses ranged spells to control the battlefield
        nearby: -30, // Defends fiercely when engaged in melee
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['beast', 'plant', 'fey'],
            moralAlignments: ['good', 'neutral'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'fiend', 'construct'],
            moralAlignments: ['evil'],
          })
        },
      ],
    },
  },
  {
    value: 'dryad',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16849-dryad',
      xp: 450,
      tags: ['fey'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.6 },
        { area: 'swamp', probability: 0.2 },
        { area: 'grassland', probability: 0.1 },
        { area: 'cursed', probability: 0.05 },
        { area: 'hill', probability: 0.05 },
      ],
      regions: [{ region: 'Whispering Glade', probability: 1 }],
      predisposition: {
        distant: 20, // Avoidant and secretive unless a threat is perceived
        nearby: -10, // Protective of their trees and allies when confronted
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['plant', 'beast', 'druid', 'fey'],
            moralAlignments: ['neutral', 'good'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['humanoid', 'monstrosity', 'undead'],
            moralAlignments: ['evil'],
          })
        },
      ],
    },
  },
  {
    value: 'elk',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16857-elk',
      xp: 50,
      tags: ['beast', 'mammal'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'grassland', probability: 0.5 },
        { area: 'forest', probability: 0.3 },
        { area: 'hill', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
        { area: 'coastal', probability: 0.05 },
      ],
      predisposition: {
        distant: 10, // Wary but generally non-aggressive
        nearby: -20, // Defensive when cornered or threatened
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['druid', 'ranger', 'fey'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['plant'], // Corrected diet tags
              dietSizes: getSizesLt('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'ettercap',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16859-ettercap',
      xp: 450,
      tags: ['monstrosity', 'arachnid'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'swamp', probability: 0.3 },
        { area: 'cursed', probability: 0.2 },
        { area: 'dungeon', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Territorial and cautious from range
        nearby: -50, // Extremely aggressive and predatory in close quarters
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['arachnid', 'monstrosity'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['insect', 'beast'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'female steeder',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560808-female-steeder',
      xp: 200,
      tags: ['beast', 'arachnid'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.6 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'cursed', probability: 0.1 },
      ],
      predisposition: {
        distant: -30, // Ambushes prey with cautious aggression
        nearby: -50, // Extremely hostile in melee combat
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['arachnid', 'monstrosity'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast', 'insect'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['insect', 'beast'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'flail snail',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560813-flail-snail',
      xp: 700,
      tags: ['elemental'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'dungeon', probability: 0.3 },
        { area: 'underdark', probability: 0.3 },
        { area: 'mountain', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
        { area: 'cursed', probability: 0.1 },
      ],
      predisposition: {
        distant: 0, // Neutral at range, focusing on defense
        nearby: -40, // Aggressive when threatened in close combat
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            diet: {
              dietTags: ['plant'],
              dietSizes: getSizesLt('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'flumph',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary/flumph-mm.html',
      xp: 25,
      tags: ['aberration'],
      sizes: ['small'],
      legalAlignments: ['lawful'],
      moralAlignments: ['good'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'cursed', probability: 0.1 },
        { area: 'mountain', probability: 0.1 },
      ],
      predisposition: {
        distant: 20, // Prefers avoiding conflict, observing from afar
        nearby: 10, // Non-aggressive even in close proximity
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            moralAlignments: ['good'],
            legalAlignments: ['lawful'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['aberration', 'monstrosity'],
            moralAlignments: ['evil'],
          })
        },
      ],
    },
  },
  {
    value: 'flying snake',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16864-flying-snake',
      xp: 25,
      tags: ['beast', 'reptile'],
      sizes: ['tiny'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'swamp', probability: 0.3 },
        { area: 'coastal', probability: 0.2 },
        { area: 'grassland', probability: 0.05 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: 0, // Curious but not aggressive at a distance
        nearby: -20, // Defends itself with a venomous bite when threatened
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['bird', 'beast', 'humanoid'],
            diet: {
              dietTags: ['insect', 'mammal', 'bird'],
              dietSizes: getSizesLte('tiny'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'gas spore',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#gas%20spore_mm',
      xp: 100,
      tags: ['plant'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'cursed', probability: 0.1 },
        { area: 'swamp', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Passively drifts but reacts when approached
        nearby: -50, // Explodes if disturbed or threatened
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['plant', 'ooze'],
          })
        },
      ],
      enemies: [
        (_creature: BaseRandomCreatureListItem) => {
          return true
        },
      ],
    },
  },
  {
    value: 'gazer',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/gazer',
      xp: 100,
      tags: ['aberration'],
      sizes: ['tiny'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'dungeon', probability: 0.4 },
        { area: 'underdark', probability: 0.3 },
        { area: 'urban', probability: 0.2 },
        { area: 'cursed', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Observes from afar and attacks opportunistically
        nearby: -40, // Aggressive and uses eye rays in combat
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['aberration'],
            creatureNames: ['beholder'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast', 'celestial'],
            diet: {
              dietTags: ['insect', 'mammal', 'bird'],
              dietSizes: getSizesLte('tiny'),
            },
            moralAlignments: ['good'],
          })
        },
      ],
    },
  },
  {
    value: 'gelatinous cube',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16869-gelatinous-cube',
      xp: 450,
      tags: ['ooze'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'dungeon', probability: 0.6 },
        { area: 'underdark', probability: 0.3 },
        { area: 'swamp', probability: 0.05 },
        { area: 'cursed', probability: 0.05 },
      ],
      predisposition: {
        distant: 0, // Passive and slow-moving but reacts to proximity
        nearby: -50, // Instinctively consumes anything in its path
      },
      allies: [],
      enemies: [
        (_creature: BaseRandomCreatureListItem) => {
          return true // Attacks any creature it encounters
        },
      ],
    },
  },
  {
    value: 'ghast',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16870-ghast',
      xp: 450,
      tags: ['undead'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'cursed', probability: 0.3 },
        { area: 'dungeon', probability: 0.25 },
        { area: 'underdark', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
        { area: 'urban', probability: 0.05 },
        { area: 'forest', probability: 0.05 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: -30, // Actively stalks prey at range
        nearby: -50, // Relentlessly aggressive in melee combat
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['undead'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'celestial'],
            diet: {
              dietTags: ['humanoid'],
              dietSizes: getSizesLte('medium'),
            },
            moralAlignments: ['good'],
          })
        },
      ],
    },
  },
  {
    value: 'ghoul',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16872-ghoul',
      xp: 200,
      tags: ['undead'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'cursed', probability: 0.3 },
        { area: 'dungeon', probability: 0.25 },
        { area: 'underdark', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
        { area: 'urban', probability: 0.05 },
        { area: 'forest', probability: 0.05 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Seeks out living creatures at range
        nearby: -40, // Aggressive and relentless in melee combat
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['undead'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'celestial'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['humanoid'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant badger',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16874-giant-badger',
      xp: 50,
      tags: ['beast', 'mammal'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'grassland', probability: 0.3 },
        { area: 'hill', probability: 0.2 },
        { area: 'mountain', probability: 0.1 },
      ],
      predisposition: {
        distant: 0, // Neutral unless provoked
        nearby: -20, // Aggressive when cornered or threatened
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['fey', 'druid', 'ranger'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            operation: 'or',
            creature,
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant bat',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16875-giant-bat',
      xp: 50,
      tags: ['beast', 'mammal'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'mountain', probability: 0.2 },
        { area: 'swamp', probability: 0.15 },
        { area: 'underdark', probability: 0.1 },
      ],
      predisposition: {
        distant: -10, // Cautious and avoids conflict unless provoked
        nearby: -30, // Aggressive when threatened or defending its territory
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'bird', 'mammal'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant boar',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16876-giant-boar',
      xp: 450,
      tags: ['beast', 'mammal'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'grassland', probability: 0.25 },
        { area: 'hill', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
        { area: 'coastal', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Defensive at a distance
        nearby: -40, // Ferociously aggressive when close
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['fey', 'druid', 'ranger'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'fish', 'reptile', 'plant'],
              dietSizes: getSizesLte('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant centipede',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16877-giant-centipede',
      xp: 50,
      tags: ['beast', 'insect'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'underdark', probability: 0.3 },
        { area: 'swamp', probability: 0.2 },
        { area: 'grassland', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Opportunistic and territorial
        nearby: -50, // Highly aggressive and defensive when close
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'reptile', 'mammal'],
              dietSizes: getSizesLt('small'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant constrictor snake',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16830-constrictor-snake',
      xp: 450,
      tags: ['beast', 'reptile'],
      sizes: ['huge'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'swamp', probability: 0.3 },
        { area: 'forest', probability: 0.25 },
        { area: 'coastal', probability: 0.15 },
        { area: 'grassland', probability: 0.1 },
        { area: 'cursed', probability: 0.05 },
        { area: 'dungeon', probability: 0.03 },
      ],
      predisposition: {
        distant: 0, // Neutral unless provoked
        nearby: -40, // Deadly constriction when close
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['mammal', 'bird', 'insect', 'fish'],
              dietSizes: getSizesLt('huge'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant elk',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16857-elk',
      xp: 450,
      tags: ['beast', 'mammal'],
      sizes: ['huge'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'grassland', probability: 0.5 },
        { area: 'forest', probability: 0.3 },
        { area: 'hill', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
        { area: 'coastal', probability: 0.05 },
      ],
      predisposition: {
        distant: 10, // Wary but generally non-aggressive
        nearby: -20, // Defensive when cornered or threatened
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['druid', 'ranger', 'fey'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['plant'], // Corrected diet tags
              dietSizes: getSizesLt('huge'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant fire beetle',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16883-giant-fire-beetle',
      xp: 10,
      tags: ['beast', 'insect'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'underdark', probability: 0.2 },
        { area: 'swamp', probability: 0.15 },
        { area: 'grassland', probability: 0.1 },
      ],
      predisposition: {
        distant: 0, // Neutral and non-aggressive unless provoked
        nearby: -10, // Defends itself with mild aggression
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['plant'],
              dietSizes: getSizesLte('small'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant frog',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16884-giant-frog',
      xp: 50,
      tags: ['beast', 'amphibian'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'swamp', probability: 0.4 },
        { area: 'forest', probability: 0.3 },
        { area: 'coastal', probability: 0.2 },
        { area: 'grassland', probability: 0.05 },
      ],
      predisposition: {
        distant: 0, // Neutral and cautious
        nearby: -20, // Aggressive when hunting or threatened
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'fish', 'mammal', 'reptile'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant hyena',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16886-giant-hyena',
      xp: 200,
      tags: ['beast', 'mammal'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'grassland', probability: 0.4 },
        { area: 'desert', probability: 0.3 },
        { area: 'hill', probability: 0.2 },
        { area: 'forest', probability: 0.05 },
        { area: 'swamp', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Wary but will scavenge
        nearby: -30, // Aggressive in packs or when cornered
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['humanoid', 'beast'],
              dietSizes: getSizesLt('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant lizard',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16887-giant-lizard',
      xp: 50,
      tags: ['beast', 'reptile'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'swamp', probability: 0.4 },
        { area: 'forest', probability: 0.3 },
        { area: 'desert', probability: 0.2 },
        { area: 'dungeon', probability: 0.1 },
      ],
      predisposition: {
        distant: 0, // Neutral unless provoked
        nearby: -20, // Aggressive when threatened or cornered
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'mammal', 'bird', 'reptile'],
              dietSizes: getSizesLt('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant owl',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16889-giant-owl',
      xp: 50,
      tags: ['beast', 'bird'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'mountain', probability: 0.3 },
        { area: 'grassland', probability: 0.2 },
        { area: 'hill', probability: 0.1 },
      ],
      predisposition: {
        distant: 10, // Observant and cautious at a distance
        nearby: -20, // Defensive when its territory or nest is threatened
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['fey', 'druid', 'ranger'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'mammal', 'reptile', 'bird'],
              dietSizes: getSizesLt('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant poisonous snake',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16890-giant-poisonous-snake',
      xp: 50,
      tags: ['beast', 'reptile'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'swamp', probability: 0.4 },
        { area: 'forest', probability: 0.3 },
        { area: 'grassland', probability: 0.15 },
        { area: 'coastal', probability: 0.1 },
        { area: 'dungeon', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Observes prey cautiously at range
        nearby: -30, // Aggressive when threatened or defending its territory
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['mammal', 'bird', 'reptile', 'amphibian'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant rat',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16891-giant-rat',
      xp: 25,
      tags: ['beast', 'mammal'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'urban', probability: 0.4 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'swamp', probability: 0.15 },
        { area: 'forest', probability: 0.1 },
        { area: 'cursed', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Wary and skittish unless cornered
        nearby: -30, // Aggressive in close quarters when threatened
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            creatureNames: ['rat'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['insect', 'plant'],
              dietSizes: getSizesLt('small'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant spider',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16895-giant-spider',
      xp: 200,
      tags: ['beast', 'arachnid'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'swamp', probability: 0.3 },
        { area: 'underdark', probability: 0.2 },
        { area: 'dungeon', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Territorial and cautious at range
        nearby: -50, // Highly aggressive and dangerous in close quarters
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['arachnid', 'monstrosity'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            diet: {
              dietTags: ['insect', 'beast'],
              dietSizes: getSizesLte('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant toad',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16896-giant-toad',
      xp: 200,
      tags: ['beast', 'amphibian'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'swamp', probability: 0.5 },
        { area: 'forest', probability: 0.3 },
        { area: 'coastal', probability: 0.1 },
        { area: 'grassland', probability: 0.05 },
        { area: 'dungeon', probability: 0.05 },
      ],
      predisposition: {
        distant: 0, // Neutral and cautious when at range
        nearby: -40, // Aggressive in close proximity, especially when hunting
      },
      allies: [],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'fish', 'mammal', 'reptile'],
              dietSizes: getSizesLt('large'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant wasp',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16898-giant-wasp',
      xp: 100,
      tags: ['beast', 'insect'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'swamp', probability: 0.3 },
        { area: 'grassland', probability: 0.2 },
        { area: 'cursed', probability: 0.05 },
        { area: 'dungeon', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Alert and defensive at range
        nearby: -30, // Aggressive in close proximity, especially near their hive
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['insect', 'beast'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'plant'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant weasel',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16899-giant-weasel',
      xp: 25,
      tags: ['beast', 'mammal'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'grassland', probability: 0.3 },
        { area: 'hill', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
      ],
      predisposition: {
        distant: 0, // Curious and cautious but not aggressive
        nearby: -20, // Aggressive when threatened or defending itself
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['fey', 'druid', 'ranger'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'bird', 'mammal'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'giant wolf spider',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16900-giant-wolf-spider',
      xp: 50,
      tags: ['beast', 'arachnid'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'swamp', probability: 0.3 },
        { area: 'grassland', probability: 0.2 },
        { area: 'hill', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Stalks and ambushes prey from a distance
        nearby: -40, // Highly aggressive in close quarters
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['arachnid'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            diet: {
              dietTags: ['insect', 'beast'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
    },
  },
  {
    value: 'gibbering mouther',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16899-gibbering-mouther',
      xp: 450,
      tags: ['aberration'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.4 },
        { area: 'cursed', probability: 0.3 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
      ],
      predisposition: {
        distant: -30, // Hostile and chaotic when it detects prey
        nearby: -50, // Extremely dangerous in close quarters with confusion-inducing abilities
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['aberration'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            moralAlignments: ['good', 'neutral'],
          })
        },
      ],
    },
  },
]

const getProbabilityMod = (
  props: BaseCreatureProps,
  baseProbability: number = 1,
) => {
  // const tagMod = getTagMod(props)
  const tagMod = 1

  const areaProbability =
    'areas' in props
      ? props.areas
          ?.filter((area) => getContext()?.areas?.includes(area.area))
          .sort((a, b) => a.probability - b.probability)
          .pop()?.probability
      : 1
  const regionProbability =
    'regions' in props
      ? props.regions
          ?.filter((region) => getContext()?.regions?.includes(region.region))
          .sort((a, b) => a.probability - b.probability)
          .pop()?.probability
      : 1
  const environmentalConditionProbability =
    'conditions' in props
      ? props.conditions
          ?.filter((condition) =>
            getContext()?.conditions?.includes(condition.condition),
          )
          .sort((a, b) => a.probability - b.probability)
          .pop()?.probability
      : 1
  return (
    baseProbability *
    tagMod *
    (areaProbability ?? 0) *
    (regionProbability ?? 0) *
    (environmentalConditionProbability ?? 1)
  )
}

const baseTagMods: Record<CreatureTag, number> = {
  aberration: 1,
  amphibian: 1,
  aquatic: 1,
  arachnid: 1,
  beast: 1,
  bird: 1,
  celestial: 1,
  construct: 1,
  criminal: 1,
  druid: 1,
  dwarf: 1,
  elemental: 1,
  elf: 1,
  fey: 1,
  fiend: 1,
  fish: 1,
  goblinoid: 1,
  humanoid: 1,
  insect: 1,
  lawEnforcement: 1,
  mammal: 1,
  mercenary: 1,
  monstrosity: 1,
  ooze: 1,
  plant: 1,
  ranger: 1,
  reptile: 1,
  swarm: 1,
  undead: 1,
}

// Might use this later.
const getTagMod = (props: BaseCreatureProps) => {
  const baseTagModValues = props.tags?.map((tag) => baseTagMods[tag]) ?? []
  if (baseTagModValues.length === 0) {
    return 1
  }
  return Math.max(...baseTagModValues)
}
