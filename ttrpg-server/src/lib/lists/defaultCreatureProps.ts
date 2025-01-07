import { getRelationshipFilter } from 'lib/lists/relationships'
import {
  BaseCreatureProps,
  BaseRandomCreatureListItem,
  getSizesLte,
  getSizesLt,
  Size,
} from 'types/creatures'

export const defaultDuergarProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['humanoid', 'dwarf'],
  sizes: ['medium'],
  legalAlignments: ['lawful'],
  moralAlignments: ['evil'],
  areas: [
    { area: 'underdark', probability: 0.6 },
    { area: 'dungeon', probability: 0.3 },
    { area: 'mountain', probability: 0.1 },
  ],
  // TODO: Open this up once you know where to put them
  regions: [
    { region: 'Grimmhold', probability: 0 }, // The ratfolk city.
  ],
  predisposition: {
    distant: -20, // Cautious and defensive from a distance
    nearby: -40, // Highly aggressive when engaged in close combat
  },
  allies: [
    (creature: BaseRandomCreatureListItem) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['arachnid'],
        creatureNames: ['duergar', 'mind flayer'],
      })
    },
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
        tags: ['humanoid', 'elf', 'dwarf'],
        moralAlignments: ['good'],
      })
    },
  ],
}

export const defaultOozeProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
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
    async (_creature: BaseRandomCreatureListItem) => {
      // Oozes attack anything that moves
      return true
    },
  ],
}

export const defaultGrungProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['humanoid', 'amphibian', 'aquatic'],
  sizes: ['small'],
  legalAlignments: ['lawful', 'neutral', 'chaotic'],
  moralAlignments: ['evil', 'neutral', 'good'],
  areas: [
    { area: 'swamp', probability: 0.6 },
    { area: 'forest', probability: 0.25 },
    { area: 'cursed', probability: 0.1 },
    { area: 'coastal', probability: 0.05 },
  ],
  predisposition: {
    distant: -20, // Wary and defensive at a distance
    nearby: -40, // Aggressive and territorial in melee
  },
  allies: [
    (creature: BaseRandomCreatureListItem) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['amphibian'],
        creatureNames: ['grung', 'frog', 'toad'],
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
          dietTags: ['insect', 'reptile', 'mammal'],
          dietSizes: getSizesLt('medium'),
        },
      })
    },
  ],
}

export const defaultGoblinoidProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['humanoid', 'goblinoid'],
  sizes: ['small'],
  legalAlignments: ['neutral', 'chaotic'],
  moralAlignments: ['evil', 'neutral'],
  areas: [
    { area: 'forest', probability: 0.3 },
    { area: 'grassland', probability: 0.25 },
    { area: 'hill', probability: 0.2 },
    { area: 'mountain', probability: 0.15 },
    { area: 'urban', probability: 0.05 },
    { area: 'dungeon', probability: 0.05 },
  ],
  // TODO: Open up regions once goblins are unleashed
  regions: [
    {
      region: 'Drakknarbuk Mine',
      probability: 1,
    },
    { region: 'Blighted Heart', probability: 0.5 },
  ],
  predisposition: {
    distant: -10, // Opportunistic and cautious at range
    nearby: -30, // Aggressive and reckless in melee combat
  },
  allies: [
    (creature: BaseRandomCreatureListItem) => {
      return getRelationshipFilter({
        creature,
        operation: 'and',
        tags: ['goblinoid', 'humanoid', 'mercenary', 'criminal', 'orc'],
        moralAlignments: ['evil', 'neutral'],
      })
    },
  ],
  enemies: [
    (creature: BaseRandomCreatureListItem) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['humanoid', 'fey'],
        moralAlignments: ['good'],
      })
    },
  ],
}

export const defaultGnollProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['humanoid', 'monstrosity'],
  sizes: ['medium'],
  legalAlignments: ['chaotic'],
  moralAlignments: ['evil'],
  areas: [
    { area: 'grassland', probability: 0.4 },
    { area: 'hill', probability: 0.3 },
    { area: 'forest', probability: 0.2 },
    { area: 'swamp', probability: 0.05 },
    { area: 'cursed', probability: 0.05 },
  ],
  predisposition: {
    distant: -30, // Hostile and often attacks when spotted
    nearby: -40, // Aggressive in melee combat, especially in packs
  },
  allies: [
    (creature: BaseRandomCreatureListItem) => {
      return getRelationshipFilter({
        creature,
        operation: 'and',
        tags: ['humanoid'],
        moralAlignments: ['evil'],
      })
    },
    (creature: BaseRandomCreatureListItem) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        creatureNames: ['gnoll', 'hyena'],
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
          dietTags: ['mammal', 'humanoid'],
          dietSizes: getSizesLte('medium'),
        },
      })
    },
  ],
}

export const defaultRatfolkProps: Omit<BaseCreatureProps, 'xp' | 'behavior'> = {
  url: '', // TODO: Link to Notion or D&D Beyond
  tags: ['humanoid', 'mammal'],
  areas: [
    { area: 'underdark', probability: 1 },
    { area: 'swamp', probability: 1 },
    { area: 'urban', probability: 0.5 },
    { area: 'dungeon', probability: 0.3 },
    { area: 'forest', probability: 0.2 },
    { area: 'grassland', probability: 0.1 },
  ],
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
        operation: 'and',
        creatureNames: ['rat'],
      })
    },
  ],
}

export const defaultWolfProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
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
    async (creature: BaseRandomCreatureListItem) => {
      return (
        (await getRelationshipFilter({
          creature,
          operation: 'or',
          tags: ['beast', 'fey'],
          creatureNames: ['wolf', 'worg'],
        })) &&
        !(await getRelationshipFilter({
          creature,
          operation: 'or',
          tags: ['arachnid'], // No wolf spiders.
        }))
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
}

export const defaultKoboldProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['humanoid', 'draconic'],
  sizes: ['small'],
  legalAlignments: ['lawful'],
  moralAlignments: ['evil'],
  areas: [
    { area: 'dungeon', probability: 0.4 },
    { area: 'mountain', probability: 0.3 },
    { area: 'forest', probability: 0.15 },
    { area: 'underdark', probability: 0.1 },
    { area: 'urban', probability: 0.05 },
  ],
  // TODO: Open up their regions once they are unleashed
  regions: [
    { region: 'Drakknarbuk Mine', probability: 1 }, // To do with the heralding of the dragons.
  ],
  predisposition: {
    distant: -10, // Often avoids conflict when at range
    nearby: -30, // Highly aggressive when cornered or defending its lair
  },
  allies: [
    function (creature) {
      return getRelationshipFilter({
        creature: creature,
        operation: 'and',
        tags: ['humanoid', 'draconic'],
        moralAlignments: ['evil'],
      })
    },
  ],
  enemies: [
    function (creature) {
      return getRelationshipFilter({
        creature: creature,
        operation: 'or',
        tags: ['humanoid', 'beast'],
        moralAlignments: ['good'],
        diet: {
          dietTags: ['humanoid', 'beast'],
          dietSizes: getSizesLte('small'),
        },
      })
    },
  ],
}

export const defaultKuoToaProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['humanoid', 'aquatic'],
  sizes: ['medium'],
  legalAlignments: ['neutral'],
  moralAlignments: ['evil'],
  areas: [
    { area: 'underdark', probability: 0.5 },
    { area: 'underwater', probability: 0.4 },
    { area: 'dungeon', probability: 0.3 },
    { area: 'coastal', probability: 0.1 },
  ],
  // TODO: Open up regions once you know where to put them
  regions: [
    { region: 'Grimmhold', probability: 0 }, // The ratfolk city.
  ],
  predisposition: {
    distant: -20, // Suspicious and avoids unnecessary conflict
    nearby: -40, // Fierce when provoked or protecting its territory
  },
  allies: [
    function (creature) {
      return getRelationshipFilter({
        creature: creature,
        operation: 'and',
        tags: ['humanoid', 'aquatic', 'aberration'],
        moralAlignments: ['evil'],
      })
    },
  ],
  enemies: [
    function (creature) {
      return getRelationshipFilter({
        creature: creature,
        operation: 'or',
        tags: ['humanoid', 'beast'],
        moralAlignments: ['good'],
        diet: {
          dietTags: ['fish'],
          dietSizes: getSizesLte('medium'),
        },
      })
    },
  ],
}

export const defaultLizardfolkProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['humanoid', 'reptile'],
  sizes: ['medium'],
  legalAlignments: ['neutral'],
  moralAlignments: ['neutral'],
  areas: [
    { area: 'swamp', probability: 0.5 },
    { area: 'coastal', probability: 0.3 },
    { area: 'forest', probability: 0.2 },
    { area: 'grassland', probability: 0.1 },
  ],
  predisposition: {
    distant: -10, // Observant and calculating, generally non-hostile
    nearby: -30, // Protective of their territory and resources
  },
  allies: [
    function (creature) {
      return getRelationshipFilter({
        creature: creature,
        operation: 'or',
        tags: ['reptile', 'beast'],
        creatureNames: ['crocodile', 'lizard'],
      })
    },
  ],
  enemies: [
    function (creature) {
      return getRelationshipFilter({
        creature: creature,
        operation: 'or',
        tags: ['humanoid', 'beast'],
        moralAlignments: ['good'],
        diet: {
          dietTags: ['mammal', 'fish'],
          dietSizes: getSizesLte('medium'),
        },
      })
    },
  ],
}

export const defaultSteederProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
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
}

export const getDefaultPredatorProps = (
  size: Size,
): Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'areas' | 'predisposition' | 'behavior'
> => {
  return {
    tags: ['beast', 'mammal'],
    sizes: [size],
    legalAlignments: ['neutral'],
    moralAlignments: ['neutral'],
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
            dietSizes: getSizesLt(size),
          },
        })
      },
    ],
  }
}

export const defaultMinotaurProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['monstrosity'],
  sizes: ['large'],
  legalAlignments: ['chaotic'],
  moralAlignments: ['evil'],
  areas: [
    { area: 'dungeon', probability: 0.4 },
    { area: 'underdark', probability: 0.2 },
  ],
  predisposition: {
    distant: -30, // Prefers ambushes or stalking prey from a distance
    nearby: -50, // Fiercely aggressive in melee combat
  },
  allies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['monstrosity', 'fiend'],
      })
    },
  ],
  enemies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['humanoid', 'beast'],
        moralAlignments: ['good', 'neutral'],
      })
    },
  ],
}

export const defaultMyconidProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['plant'],
  sizes: ['medium'],
  legalAlignments: ['neutral'],
  moralAlignments: ['neutral'],
  areas: [
    { area: 'underdark', probability: 0.6 },
    { area: 'dungeon', probability: 0.3 },
    { area: 'swamp', probability: 0.1 },
  ],
  predisposition: {
    distant: 0, // Passive unless provoked
    nearby: -10, // Protective of their colony and spore network
  },
  allies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['plant'],
        creatureNames: ['myconid'],
      })
    },
  ],
  enemies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['humanoid', 'beast', 'arachnid'],
        diet: {
          dietTags: ['plant'],
          dietSizes: getSizesLt('medium'),
        },
      })
    },
  ],
}

export const defaultSentientPlantProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['plant'],
  sizes: ['medium'],
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
}

export const defaultNeogiProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['aberration', 'arachnid'],
  sizes: ['small'],
  legalAlignments: ['neutral'],
  moralAlignments: ['evil'],
  areas: [
    { area: 'underdark', probability: 0.5 },
    { area: 'dungeon', probability: 0.3 },
    { area: 'cursed', probability: 0.15 },
    { area: 'mountain', probability: 0.05 },
  ],
  predisposition: {
    distant: -30, // Manipulative and aggressive at range
    nearby: -50, // Extremely dangerous and exploitative in close quarters
  },
  allies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['aberration', 'monstrosity'],
        creatureNames: ['umber hulk', 'neogi'],
      })
    },
  ],
  enemies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['humanoid', 'celestial'],
        moralAlignments: ['good'],
        diet: {
          dietTags: ['beast', 'humanoid'],
          dietSizes: getSizesLt('small'),
        },
      })
    },
  ],
}

export const defaultOrcProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['humanoid', 'orc'],
  sizes: ['medium'],
  legalAlignments: ['chaotic'],
  moralAlignments: ['evil'],
  areas: [
    { area: 'forest', probability: 0.3 },
    { area: 'grassland', probability: 0.25 },
    { area: 'mountain', probability: 0.2 },
    { area: 'hill', probability: 0.15 },
    { area: 'swamp', probability: 0.05 },
    { area: 'cursed', probability: 0.05 },
  ],
  // TODO: Open up regions once orcs are unleashed
  regions: [{ region: 'Drakknarbuk Mine', probability: 1 }],
  predisposition: {
    distant: -20, // Highly suspicious of outsiders at a distance
    nearby: -40, // Aggressively territorial when confronted
  },
  allies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['orc', 'goblinoid'],
        creatureNames: ['orc', 'warg'],
      })
    },
  ],
  enemies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['humanoid', 'dwarf', 'elf'],
        moralAlignments: ['good'],
        diet: {
          dietTags: ['beast', 'humanoid'],
          dietSizes: getSizesLt('medium'),
        },
      })
    },
  ],
}

export const defaultSpiderProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
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
}

export const defaultQuaggothProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['humanoid', 'beast'],
  sizes: ['medium'],
  legalAlignments: ['chaotic'],
  moralAlignments: ['neutral'],
  areas: [
    { area: 'underdark', probability: 0.6 },
    { area: 'dungeon', probability: 0.25 },
    { area: 'mountain', probability: 0.1 },
    { area: 'forest', probability: 0.05 },
  ],
  predisposition: {
    distant: -20, // Hostile and territorial at range.
    nearby: -50, // Extremely aggressive and dangerous in close combat.
  },
  allies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        creatureNames: ['quaggoth', 'drow'],
      })
    },
  ],
  enemies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['humanoid', 'celestial'],
        moralAlignments: ['good'],
      })
    },
  ],
}

export const defaultSporeServantProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['humanoid', 'undead', 'plant'],
  sizes: ['medium'],
  legalAlignments: ['neutral'],
  moralAlignments: ['neutral'],
  areas: [
    { area: 'underdark', probability: 0.5 },
    { area: 'dungeon', probability: 0.3 },
    { area: 'swamp', probability: 0.15 },
    { area: 'cursed', probability: 0.05 },
  ],
  predisposition: {
    distant: -30, // Reacts aggressively when disturbed from a distance.
    nearby: -50, // Hostile and unrelenting in melee combat.
  },
  allies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'and',
        creatureNames: ['myconid', 'spore servant'],
      })
    },
  ],
  enemies: [
    async (_creature) => {
      return false
    },
  ],
}

export const defaultBeholderProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['aberration', 'beholder'],
  sizes: ['medium'],
  legalAlignments: ['lawful'],
  moralAlignments: ['neutral'],
  areas: [
    { area: 'dungeon', probability: 0.5 },
    { area: 'underdark', probability: 0.3 },
    { area: 'cursed', probability: 0.1 },
    { area: 'urban', probability: 0.05 },
    { area: 'mountain', probability: 0.05 },
  ],
  predisposition: {
    distant: -20, // Observes and defends from a distance.
    nearby: -40, // Aggressive and uses eye rays for close encounters.
  },
  allies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['aberration', 'beholder'],
      })
    },
  ],
  enemies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['humanoid', 'beast', 'celestial'],
        moralAlignments: ['good'],
      })
    },
  ],
}

export const defaultVegepygmyProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['plant', 'monstrosity'],
  sizes: ['medium'],
  legalAlignments: ['neutral'],
  moralAlignments: ['neutral'],
  areas: [
    { area: 'swamp', probability: 0.4 },
    { area: 'forest', probability: 0.3 },
    { area: 'cursed', probability: 0.2 },
    { area: 'dungeon', probability: 0.1 },
  ],
  predisposition: {
    distant: -20, // Defends its territory cautiously
    nearby: -40, // Aggressive in close combat, particularly if its grove is threatened
  },
  allies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['plant', 'monstrosity'],
        creatureNames: ['vegepygmy'],
      })
    },
  ],
  enemies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['humanoid', 'beast'],
        moralAlignments: ['good'],
        diet: {
          dietTags: ['plant', 'humanoid'],
          dietSizes: getSizesLt('medium'),
        },
      })
    },
  ],
}

export const defaultBlightProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['plant'],
  sizes: ['medium'],
  legalAlignments: ['neutral'],
  moralAlignments: ['evil'],
  areas: [
    { area: 'forest', probability: 0.5 },
    { area: 'cursed', probability: 0.3 },
    { area: 'swamp', probability: 0.1 },
    { area: 'dungeon', probability: 0.05 },
    { area: 'grassland', probability: 0.05 },
  ],
  predisposition: {
    distant: -20, // Aggressive toward intruders at a distance
    nearby: -40, // Lethally hostile in close quarters
  },
  allies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        creatureNames: ['blight'],
      })
    },
  ],
  enemies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['humanoid', 'beast'],
        diet: {
          dietTags: ['plant'],
          dietSizes: getSizesLt('medium'),
        },
        moralAlignments: ['good'],
      })
    },
  ],
}

export const defaultXvartProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['humanoid'],
  sizes: ['small'],
  legalAlignments: ['chaotic'],
  moralAlignments: ['evil'],
  areas: [
    { area: 'forest', probability: 0.4 },
    { area: 'swamp', probability: 0.3 },
    { area: 'cursed', probability: 0.2 },
    { area: 'hill', probability: 0.1 },
  ],
  predisposition: {
    distant: -20, // Mischievous and aggressive at range
    nearby: -40, // Opportunistically hostile up close
  },
  allies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        creatureNames: ['rat', 'bat', 'xvart'],
      })
    },
  ],
  enemies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['humanoid', 'beast'],
        moralAlignments: ['good'],
        diet: {
          dietTags: ['humanoid', 'beast'],
          dietSizes: getSizesLt('medium'),
        },
      })
    },
  ],
}

export const defaultYuanTiProps: Omit<
  BaseCreatureProps,
  'xp' | 'url' | 'behavior'
> = {
  tags: ['monstrosity'],
  sizes: ['medium'],
  legalAlignments: ['neutral'],
  moralAlignments: ['evil'],
  areas: [
    { area: 'swamp', probability: 0.4 },
    { area: 'dungeon', probability: 0.3 },
    { area: 'cursed', probability: 0.2 },
    { area: 'forest', probability: 0.1 },
  ],
  predisposition: {
    distant: -30, // Guards its masters fiercely at range
    nearby: -50, // Highly aggressive in close combat
  },
  allies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['monstrosity'],
        creatureNames: ['yuan-ti'],
      })
    },
  ],
  enemies: [
    (creature) => {
      return getRelationshipFilter({
        creature,
        operation: 'or',
        tags: ['humanoid', 'beast'],
        moralAlignments: ['good'],
        diet: {
          dietTags: ['humanoid', 'beast'],
          dietSizes: getSizesLt('medium'),
        },
      })
    },
  ],
}
