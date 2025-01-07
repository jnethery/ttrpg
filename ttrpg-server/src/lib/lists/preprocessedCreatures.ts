import { getRelationshipFilter } from 'lib/lists/relationships'
import {
  defaultDuergarProps,
  defaultRatfolkProps,
  defaultGnollProps,
  defaultGoblinoidProps,
  defaultGrungProps,
  defaultOozeProps,
  defaultWolfProps,
  defaultKoboldProps,
  defaultKuoToaProps,
  defaultLizardfolkProps,
  defaultSteederProps,
  getDefaultPredatorProps,
  defaultMinotaurProps,
  defaultMyconidProps,
  defaultSentientPlantProps,
  defaultNeogiProps,
  defaultOrcProps,
  defaultSpiderProps,
  defaultQuaggothProps,
  defaultSporeServantProps,
  defaultBeholderProps,
  defaultVegepygmyProps,
  defaultBlightProps,
  defaultXvartProps,
  defaultYuanTiProps,
} from 'lib/lists/defaultCreatureProps'
import { getProbabilityMod } from 'lib/lists/creatureUtils'
import {
  BaseRandomCreatureListItem,
  BaseRandomCreatureList,
  getSizesLt,
  getSizesLte,
} from 'types/creatures'

// TODO: Add Magma Mephits and other fire elementals when you add fire regions
// TODO: Add Intellect Devourer when you add Mind Flayers, if ever
// TODO: I will be using Eladrin for the Fey forest, but not for the first area

export const preprocessedCreatures: BaseRandomCreatureList = [
  // HOMEBREW
  // Ratfolk
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
      behavior: {
        idle: 'The ratfolk inventor tinkers with gadgets, scribbles in a notebook, or examines a new invention.',
        eating:
          'They consume simple rations or scraps of food, often while working on a project.',
        hiding:
          'The inventor uses their surroundings to conceal themselves, blending into shadows or behind machinery.',
        tactics:
          'The ratfolk inventor uses their gadgets to control the battlefield, focusing on disabling enemies and creating opportunities for allies.',
      },
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
      behavior: {
        idle: 'The ratfolk scavenger rummages through debris, searching for useful items or scraps of food.',
        eating:
          'They consume whatever they can find, often scavenging from the refuse of other creatures.',
        hiding:
          'The scavenger hides in the shadows or behind cover, using their small size to evade detection.',
        tactics:
          'The ratfolk scavenger uses hit-and-run tactics, striking from cover and retreating to safety. They focus on weakening enemies and creating opportunities for escape.',
      },
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
      behavior: {
        idle: 'The ratfolk captain oversees their crew, issuing orders, planning raids, or negotiating with potential allies.',
        eating:
          'They eat well from stolen goods, often taking the best portions for themselves.',
        hiding:
          'The captain stays hidden until they can make a dramatic entrance or retreat to safety, often relying on their underlings to shield them.',
        tactics:
          'The captain leads from the front, inspiring their allies with shouts and decisive strikes. They focus on high-value targets, using their charisma and cunning to exploit weaknesses.',
      },
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
            creatureNames: ['kruthik'],
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
      behavior: {
        idle: 'The adult kruthik prowls its lair, occasionally pausing to scratch at the walls or tend to its brood.',
        eating:
          'The kruthik feeds on carrion, softened minerals, or small subterranean creatures it has hunted.',
        hiding:
          'It burrows into the walls of its lair, using natural tunnels and its chitinous body to blend into the rock.',
        tactics:
          'The kruthik attacks in swift bursts, climbing walls and ceilings to ambush targets. It prioritizes soft targets like spellcasters and will retreat to regenerate its strength if overpowered.',
      },
    },
  },
  {
    value: 'young kruthik',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560969-young-kruthik',
      xp: 25,
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
            creatureNames: ['kruthik'],
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
      behavior: {
        idle: 'The young kruthik skitters nervously around its territory, staying close to the adults for protection.',
        eating:
          'It gnaws on small creatures or scraps of meat left behind by larger kruthiks.',
        hiding:
          'It burrows into loose rock or hides under debris, relying on its small size to remain unseen.',
        tactics:
          'The young kruthik swarms with others of its kind, aiming to overwhelm enemies through numbers. It uses its sharp claws to strike quickly before retreating behind stronger allies.',
      },
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
        async () => {
          return true
        },
      ],
      allies: [],
      behavior: {
        idle: 'The allip hovers silently, its form flickering as it mutters fragments of the knowledge that torments it.',
        eating:
          'It consumes thoughts and memories, seeking out intelligent creatures to drain their will.',
        hiding:
          'The allip melds into shadows or passes through walls to evade detection, often whispering to confuse pursuers.',
        tactics:
          'The allip attacks the minds of its enemies, using Maddening Touch and Whispers of Madness to sow chaos. It focuses on dividing the party and targeting the most vulnerable minds.',
      },
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
      behavior: {
        idle: 'The ankheg burrows through the earth, occasionally surfacing to test the air for prey.',
        eating:
          'It drags creatures into its tunnels, liquefying their insides with acid before consuming them.',
        hiding:
          'The ankheg burrows underground, leaving only a slight disturbance in the soil as a clue to its presence.',
        tactics:
          'The ankheg surprises its prey by bursting from the ground, using its acid spray to weaken clusters of enemies before dragging a target into its burrow.',
      },
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
      behavior: {
        idle: 'The ape swings between branches or lounges in its territory, keeping an eye out for threats or food.',
        eating:
          'It forages for fruit, leaves, and small insects, occasionally using tools to crack open nuts.',
        hiding:
          'The ape hides high in the canopy, using foliage as cover to avoid predators.',
        tactics:
          'In combat, the ape uses its strength to hurl rocks or other debris from a distance. When cornered, it fights fiercely with its claws and teeth, aiming to intimidate foes into retreat.',
      },
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
        { area: 'swamp', probability: 0.05 },
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
      behavior: {
        idle: 'The archer sharpens arrows, adjusts their bowstring, or scans the horizon for potential threats.',
        eating:
          'They eat simple rations or dried meat, often while on the move or stationed at a lookout.',
        hiding:
          'The archer uses natural cover, camouflage, or elevated positions to blend into the surroundings and avoid detection.',
        tactics:
          'In combat, the archer targets vulnerable enemies like spellcasters or unarmored foes, using their range to maintain a safe distance. They reposition frequently to avoid retaliation and seek high ground for better accuracy.',
      },
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
      ...defaultSentientPlantProps,
      sizes: ['small'],
      behavior: {
        idle: 'The awakened shrub remains motionless, blending into natural foliage, or slowly shuffles around its environment.',
        eating:
          'It absorbs nutrients from the soil and sunlight, requiring little active feeding.',
        hiding:
          'The shrub relies on its plant-like appearance to avoid notice, becoming indistinguishable from ordinary vegetation.',
        tactics:
          'In combat, the shrub swipes at foes with its branches, aiming to entangle or distract rather than cause significant damage. It may also retreat to denser foliage for cover.',
      },
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
      ...defaultSentientPlantProps,
      sizes: ['huge'],
      behavior: {
        idle: 'The awakened tree sways gently in the breeze, appearing as an ordinary tree to passersby.',
        eating:
          'It absorbs sunlight and water, drawing nutrients through its roots.',
        hiding:
          'Its large size makes it difficult to hide actively, but its natural appearance allows it to blend into forested areas.',
        tactics:
          'The tree uses its massive limbs to batter foes, focusing on enemies that pose a threat to its environment. It uses its size and strength to block paths or create barriers.',
      },
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
      behavior: {
        idle: 'The baboon grooms itself or others in its troop, occasionally chattering or hooting to communicate.',
        eating:
          'It forages for fruit, seeds, and small insects, often working as part of a group to gather food.',
        hiding:
          'The baboon retreats to high branches or rocky outcroppings, using its agility to evade predators.',
        tactics:
          'Baboons rely on their numbers to intimidate enemies, attacking in a chaotic swarm of bites and claw swipes. They target isolated or weaker foes while keeping an escape route open.',
      },
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
      behavior: {
        idle: 'The badger digs small burrows or forages for food, occasionally pausing to sniff the air.',
        eating:
          'It hunts small rodents or digs for insects and grubs, often consuming its prey immediately.',
        hiding:
          'The badger relies on its burrows and dense underbrush to hide, retreating underground when threatened.',
        tactics:
          'The badger fights fiercely when cornered, using its claws and teeth to inflict damage. It focuses on survival rather than aggression, attempting to flee if possible.',
      },
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
      behavior: {
        idle: 'The bandit sharpens their weapons, counts their coin, or watches for opportunities to ambush travelers.',
        eating:
          'They eat whatever they can steal, often preferring hearty meals to maintain their strength.',
        hiding:
          'The bandit uses natural terrain, such as rocky outcrops or dense foliage, to set up ambushes and remain concealed.',
        tactics:
          'In combat, bandits rely on teamwork and surprise. They often aim to incapacitate or disarm enemies quickly, prioritizing targets carrying valuables.',
      },
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
      behavior: {
        idle: 'The bandit captain oversees their crew, plans raids, or negotiates with potential allies.',
        eating:
          'They eat well from stolen goods, often taking the best portions for themselves.',
        hiding:
          'The captain stays hidden until they can make a dramatic entrance or retreat to safety, often relying on their underlings to shield them.',
        tactics:
          'The captain leads from the front, inspiring their allies with shouts and decisive strikes. They focus on high-value targets, using their charisma and cunning to exploit weaknesses.',
      },
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
      behavior: {
        idle: 'The berserker hones their weapons, practices battle cries, or meditates to summon their rage.',
        eating:
          'They consume large amounts of meat and drink heavily, viewing meals as preparation for battle.',
        hiding:
          'Subtlety is not their strength; the berserker rarely hides but may take cover behind large obstacles when necessary.',
        tactics:
          'The berserker charges into combat, prioritizing the most dangerous-looking enemies. They use their reckless abandon to overwhelm foes, shrugging off damage and aiming to demoralize the party with displays of brute force.',
      },
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
      ...getDefaultPredatorProps('medium'),
      behavior: {
        idle: 'The black bear roams its territory, sniffing the air and occasionally clawing at trees to mark its domain.',
        eating:
          'It forages for berries, fish, or small mammals, using its strong claws to dig or catch prey.',
        hiding:
          'The bear relies on dense forest or caves for cover, retreating when seriously threatened.',
        tactics:
          'In combat, the bear charges at foes with its powerful claws and teeth, targeting the closest enemy. It may retreat if severely injured but will fight fiercely to protect its cubs or territory.',
      },
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
      ...defaultOozeProps,
      behavior: {
        idle: 'The black pudding slithers slowly through dark caverns, seeking food and avoiding bright light.',
        eating:
          'It consumes organic material, dissolving flesh, wood, and metal alike with its acidic body.',
        hiding:
          'The pudding clings to ceilings or lurks in shadows, blending into its dark surroundings until prey passes by.',
        tactics:
          'The pudding engulfs its enemies, dissolving their armor and weapons with acid. It splits into smaller puddings when struck, overwhelming foes through sheer persistence.',
      },
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
      behavior: {
        idle: 'The blink dog lounges near its pack, occasionally barking or playfully interacting with others.',
        eating:
          'It hunts small animals, often using its teleportation abilities to outmaneuver prey.',
        hiding:
          'The blink dog relies on its ability to teleport away from danger, disappearing into dense foliage or behind obstacles.',
        tactics:
          'The blink dog teleports around the battlefield, flanking enemies and targeting isolated foes. It prioritizes protecting its allies, distracting or attacking dangerous opponents to keep its pack safe.',
      },
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
      behavior: {
        idle: 'The blood hawk circles high above, scanning the ground for potential prey or threats.',
        eating:
          'It hunts small animals and feeds on carrion, tearing flesh with its sharp beak.',
        hiding:
          'The blood hawk hides in high branches or rocky ledges, using its keen vision to stay aware of its surroundings.',
        tactics:
          'In combat, the hawk dives at enemies with its talons, targeting exposed areas. It uses hit-and-run tactics, retreating to the skies before striking again.',
      },
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
      behavior: {
        idle: 'The boar snuffles through the underbrush, rooting for food or wallowing in mud to cool off.',
        eating:
          'It eats roots, fungi, and small insects, digging with its tusks to uncover meals.',
        hiding:
          'The boar relies on thick vegetation to obscure its presence, retreating to dense undergrowth when startled.',
        tactics:
          'The boar charges at enemies with its tusks, aiming to knock them down. It fights ferociously if cornered, but may flee if given the chance.',
      },
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
      behavior: {
        idle: 'The boggle creeps through shadows, tinkering with objects and creating harmless mischief.',
        eating:
          'It scavenges for small insects, fruits, or leftovers, often stealing food when unobserved.',
        hiding:
          'The boggle uses its innate ability to create slippery oil or sticky surfaces, slipping into hiding places or trapping pursuers.',
        tactics:
          'In combat, the boggle uses its dimension door ability to evade attacks and strike from unexpected angles. It prefers to harass enemies, stealing items or creating distractions, rather than engaging directly.',
      },
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
      behavior: {
        idle: 'The bone naga coils silently in its lair, maintaining a vigil over its master’s domain or purpose.',
        eating:
          'The bone naga does not eat but absorbs necrotic energy from its surroundings.',
        hiding:
          'It uses its serpentine body to slither into tight spaces or remain coiled in the shadows, blending into dark environments.',
        tactics:
          'The bone naga casts powerful spells to weaken its foes, targeting clustered enemies with area-of-effect magic. It uses its agility to keep a distance while striking with its fangs when necessary.',
      },
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
      behavior: {
        idle: 'The brown bear moves through the forest, scratching at trees or sniffing for prey.',
        eating:
          'It hunts fish, scavenges carrion, or forages for berries, often consuming large amounts to sustain its size.',
        hiding:
          'The bear relies on caves or dense undergrowth for cover, retreating when overwhelmed.',
        tactics:
          'In combat, the bear charges into the fray with its powerful claws and bite, targeting the nearest threat. It fights until the enemy is driven off or it is severely injured.',
      },
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
        async () => {
          return true
        },
      ],
      allies: [],
      behavior: {
        idle: 'The bodak lurks in darkness, its presence sapping the life from nearby creatures.',
        eating:
          'It does not eat, but it feeds on the fear and life force of living beings.',
        hiding:
          'The bodak blends into shadows or waits in desolate areas, its aura masking its location from casual detection.',
        tactics:
          'The bodak uses its Death Gaze to weaken or kill enemies, focusing on those who seem most vulnerable to its aura of despair. It avoids direct combat, relying on its presence to wear down foes.',
      },
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
      ...defaultGoblinoidProps,
      sizes: ['medium'],
      behavior: {
        idle: 'The bugbear skulks through its territory, occasionally sharpening its weapons or bullying weaker creatures.',
        eating:
          'It hunts large game or scavenges for food, often storing excess in crude caches.',
        hiding:
          'The bugbear uses its natural stealth to blend into shadows or dense foliage, often ambushing prey.',
        tactics:
          'In combat, the bugbear uses its brute strength and surprise to overwhelm enemies. It prioritizes weaker or isolated targets, using its long reach to attack from unexpected angles.',
      },
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
      ...defaultGoblinoidProps,
      sizes: ['medium'],
      behavior: {
        idle: 'The bugbear chief oversees its underlings, issuing orders and asserting dominance through intimidation.',
        eating:
          'The chief eats the best portions of food, often at the expense of its subordinates.',
        hiding:
          'It uses its cunning to retreat to defensible positions or hide among its minions when threatened.',
        tactics:
          'The chief fights strategically, directing allies to swarm opponents. It targets leaders or spellcasters first, aiming to disrupt the enemy’s strategy.',
      },
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
      behavior: {
        idle: 'The bullywug croaks and patrols its swampy home, often posturing to assert dominance.',
        eating:
          'It consumes insects, fish, and small creatures, catching prey with its sticky tongue.',
        hiding:
          'The bullywug submerges in water or mud, leaving only its eyes and nostrils visible.',
        tactics:
          'In combat, the bullywug uses its amphibious nature to strike from water. It harasses foes with spears or nets, retreating to the safety of its swamp when outmatched.',
      },
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
      behavior: {
        idle: 'The carrion crawler slithers through dark caverns, tasting the air for the scent of decay.',
        eating:
          'It feeds on corpses, using its paralytic tentacles to disable prey before consumption.',
        hiding:
          'The crawler clings to ceilings or lurks in narrow passageways, waiting to ambush unsuspecting creatures.',
        tactics:
          'It attacks with its tentacles, paralyzing enemies to feed on them at leisure. The crawler prioritizes isolated or weaker targets and retreats if outnumbered.',
      },
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
      behavior: {
        idle: 'The cat prowls its environment, exploring and watching for anything that moves.',
        eating:
          'It hunts small rodents or insects, often playing with its prey before killing it.',
        hiding:
          'The cat uses its agility and stealth to slip into hiding places, blending into shadows or climbing out of reach.',
        tactics:
          'In combat, the cat relies on quick strikes and evasive maneuvers. It prioritizes escape over prolonged fighting.',
      },
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
      behavior: {
        idle: 'The catoblepas wanders its swampy habitat, its heavy body moving slowly as it scans for danger.',
        eating:
          'It feeds on swamp vegetation and carrion, using its long neck to reach food.',
        hiding:
          'It uses the natural mist and murky waters of the swamp to obscure its massive form.',
        tactics:
          'The catoblepas uses its Death Ray to strike at enemies from a distance, focusing on those who pose the greatest threat. It relies on its tough hide and swampy terrain to wear down opponents.',
      },
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
      behavior: {
        idle: 'The cave fisher clings to cavern walls, lying in wait for prey to pass by.',
        eating:
          'It uses its adhesive filaments to catch small creatures, pulling them into its maw to feed.',
        hiding:
          'The cave fisher blends into rocky surfaces, its carapace resembling natural stone.',
        tactics:
          'The fisher uses its filament to ensnare targets from a distance, pulling them into range for its claws. It prioritizes isolated prey and retreats into narrow crevices if threatened.',
      },
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
      behavior: {
        idle: 'The centaur roams open plains or forests, watching over its herd or patrolling its territory.',
        eating:
          'It grazes on plants and berries, supplementing its diet with foraged roots or herbs.',
        hiding:
          'The centaur uses its speed and natural surroundings to evade pursuers, retreating to dense forest if necessary.',
        tactics:
          'In combat, the centaur charges with its hooves and uses ranged weapons to harry enemies from a distance. It focuses on protecting allies and breaking enemy formations.',
      },
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
        async (_creature: BaseRandomCreatureListItem) => {
          return true
        },
      ],
      behavior: {
        idle: 'The chimera prowls its domain, roaring and asserting dominance over lesser creatures.',
        eating:
          'It consumes large animals, tearing them apart with its claws, teeth, and horns.',
        hiding:
          'The chimera does not often hide but may retreat to its lair to avoid overwhelming odds.',
        tactics:
          'The chimera combines flight and brute force, using its fire breath and multiple heads to overwhelm enemies. It targets spellcasters and ranged attackers first, aiming to dominate the battlefield.',
      },
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
      behavior: {
        idle: 'The chitine weaves webs, fortifies its lair, or scouts for prey under the cover of darkness.',
        eating:
          'It feeds on small animals and insects, wrapping its prey in webbing to consume later.',
        hiding:
          'The chitine hides in crevices or blends into its webbed surroundings, remaining motionless to avoid detection.',
        tactics:
          'It uses its webs to entangle foes, striking from a distance before closing in with its claws. The chitine focuses on incapacitating enemies to overwhelm them through teamwork.',
      },
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
      behavior: {
        idle: 'The choker clings to ceilings or dark corners, its long arms swaying as it waits for prey.',
        eating:
          'It drags small creatures into its hiding place, strangling them before devouring their flesh.',
        hiding:
          'The choker uses its flexible body to squeeze into narrow crevices, remaining perfectly still until prey approaches.',
        tactics:
          'The choker uses its long arms to grapple and strangle enemies from a distance. It targets isolated creatures and retreats to higher ground or tight spaces if threatened.',
      },
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
      behavior: {
        idle: 'The choldrith oversees its webbed domain, issuing commands to chitines and ensuring the safety of its brood.',
        eating:
          'It consumes captured prey, often injecting venom to soften the flesh before feeding.',
        hiding:
          'The choldrith uses its webs and shadowy environments to remain concealed, often retreating to heavily fortified lairs.',
        tactics:
          'The choldrith casts spells to hinder enemies and bolster its allies, using webs to control the battlefield. It prioritizes disabling ranged attackers or spellcasters while staying out of direct combat.',
      },
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
      behavior: {
        idle: 'The chuul prowls underwater, using its tentacles to sense movement and investigate its surroundings.',
        eating:
          'It hunts fish, amphibians, or humanoids, using its pincers to crush prey before consuming them.',
        hiding:
          'The chuul burrows into riverbeds or camouflages itself among coral and rocks, waiting for prey to approach.',
        tactics:
          'The chuul grapples enemies with its pincers, using its tentacles to paralyze targets. It drags incapacitated foes underwater to drown them and prioritizes taking down the most vulnerable creatures first.',
      },
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
      behavior: {
        idle: 'The cloaker drifts through dark caverns, blending into shadows or attaching itself to ceilings.',
        eating:
          'It feeds on small creatures, enveloping them with its body and suffocating them before consumption.',
        hiding:
          'The cloaker blends into its environment, resembling a shadow or discarded cloak until it strikes.',
        tactics:
          'It ambushes enemies, enveloping a single target while using its moan ability to disorient others. The cloaker focuses on spreading confusion and isolating prey for easier kills.',
      },
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
      behavior: {
        idle: 'The snake coils lazily in a warm, sunny spot, occasionally flicking its tongue to sense its surroundings.',
        eating:
          'It hunts small animals, crushing them with its powerful coils before swallowing them whole.',
        hiding:
          'The snake blends into its environment, using its patterned scales to mimic the forest floor or dense undergrowth.',
        tactics:
          'The constrictor snake grapples enemies, focusing on immobilizing them while applying continuous crushing damage. It avoids fighting multiple foes at once, preferring ambush tactics.',
      },
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
      behavior: {
        idle: 'The corpse flower remains stationary, its fetid stench attracting scavengers and curious creatures.',
        eating:
          'It absorbs nutrients from corpses, pulling them into its body with its roots or tendrils.',
        hiding:
          'The flower relies on its corpse-like appearance and scent to blend into battlefields or graveyards.',
        tactics:
          'The corpse flower animates corpses to protect itself, attacking with its tendrils to drag enemies closer. It targets weaker foes first, using its stench to drive others away.',
      },
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
      behavior: {
        idle: 'The crocodile basks on riverbanks or drifts just beneath the surface, watching for movement.',
        eating:
          'It ambushes prey, dragging them into the water to drown before feeding.',
        hiding:
          'The crocodile uses murky waters and its low profile to remain hidden, often appearing as a log or submerged rock.',
        tactics:
          "It lunges at prey with a powerful bite, attempting to drag them underwater. The crocodile targets creatures close to the water's edge and relies on its environment for an advantage.",
      },
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
      behavior: {
        idle: 'The darkling prowls through the shadows, observing its surroundings with an air of quiet menace.',
        eating:
          'It forages for small game or scavenges food, preferring fresh meat or fruit.',
        hiding:
          'The darkling cloaks itself in darkness, blending into shadows and avoiding light sources.',
        tactics:
          'The darkling strikes quickly and retreats into darkness, using its light absorption to blind enemies. It prioritizes stealthy attacks on vulnerable targets.',
      },
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
      behavior: {
        idle: 'The darkling elder meditates in its lair, communing with ancient powers or plotting in silence.',
        eating:
          'It consumes food brought by its followers, often indulging in delicacies of the Feywild.',
        hiding:
          'The elder uses its mastery of darkness to shroud itself in shadow, disappearing from sight at will.',
        tactics:
          'It uses spells and light absorption to manipulate the battlefield, blinding foes and enhancing its allies. The elder targets leaders or spellcasters to destabilize enemy groups.',
      },
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
      behavior: {
        idle: 'The darkmantle clings to ceilings or cavern walls, remaining motionless to mimic a stalactite.',
        eating:
          'It drops onto unsuspecting prey, suffocating them before consuming their flesh.',
        hiding:
          'The darkmantle uses its natural camouflage to blend into rocky environments, waiting patiently for prey.',
        tactics:
          'In combat, it uses its Darkness Aura to blind enemies, targeting lone or vulnerable creatures. The darkmantle retreats to high ceilings if outmatched.',
      },
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
      behavior: {
        idle: 'The deep rothe grazes in underground pastures, emitting a low, guttural moo as it moves.',
        eating:
          'It feeds on subterranean fungi and moss, using its strong teeth to grind tough vegetation.',
        hiding:
          'The deep rothe relies on its dark environment to remain unseen, retreating into caves when threatened.',
        tactics:
          'In combat, it charges with its horns or kicks with its hooves to defend itself. It focuses on protecting its herd rather than actively attacking.',
      },
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
      behavior: {
        idle: 'The deer grazes peacefully in open fields or forest clearings, its ears twitching at the slightest sound.',
        eating:
          'It forages for grass, leaves, and berries, always alert for predators.',
        hiding:
          'The deer relies on its speed and agility, fleeing into dense woods or over hills when threatened.',
        tactics:
          'The deer avoids combat whenever possible, using its keen senses to detect threats early and escape. If cornered, it kicks and bucks wildly.',
      },
    },
  },
  {
    value: 'deep gnome',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16923-deep-gnome',
      xp: 100,
      tags: ['humanoid', 'gnome'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['good', 'neutral'],
      areas: [
        { area: 'underdark', probability: 0.7 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'mountain', probability: 0.1 },
      ],
      predisposition: {
        distant: 10, // Wary but generally non-hostile unless threatened
        nearby: -10, // Defensive if their community or allies are threatened
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'dwarf', 'gnome'],
            moralAlignments: ['good', 'neutral'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'aberration', 'monstrosity'],
            moralAlignments: ['evil'],
          })
        },
      ],
      behavior: {
        idle: 'The deep gnome works diligently in its underground home, crafting tools or mining precious gems.',
        eating:
          'It eats simple meals of fungi, roots, and occasionally small subterranean creatures.',
        hiding:
          'The gnome uses its natural stealth and small size to hide in crevices or behind rocky outcrops.',
        tactics:
          'In combat, the deep gnome relies on its defensive spells and cunning, targeting enemies with precision attacks while staying hidden.',
      },
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
      behavior: {
        idle: 'The derro mutters incoherently to itself, often scribbling strange symbols or tinkering with odd devices.',
        eating:
          'It eats scavenged food, preferring meat but settling for fungi or roots.',
        hiding:
          'The derro uses its small size and chaotic movements to slip into shadows or narrow tunnels.',
        tactics:
          'In combat, it fights erratically, using underhanded tactics and spells to confuse and harm enemies. It targets the weakest-looking foes first, delighting in causing fear.',
      },
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
      behavior: {
        idle: 'The savant chants cryptic spells or conducts bizarre experiments, surrounded by arcane symbols.',
        eating:
          'It eats sparingly, often distracted by its experiments or magical pursuits.',
        hiding:
          'The savant hides in magically warded chambers or uses illusions to obscure its presence.',
        tactics:
          'It uses its advanced spellcasting to control the battlefield, focusing on disabling enemies with mental or arcane assaults. The savant prioritizes self-preservation, retreating if the fight turns against it.',
      },
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
      ...defaultWolfProps,
      behavior: {
        idle: 'The dire wolf prowls its territory, howling occasionally to communicate with its pack.',
        eating:
          'It hunts large prey, tearing into its kill with powerful jaws and consuming it voraciously.',
        hiding:
          'The dire wolf uses its natural camouflage to blend into the forest or tundra, stalking prey silently.',
        tactics:
          'In combat, it coordinates with its pack to surround and overwhelm foes. It targets the weakest or slowest enemy first, aiming to drag them down with powerful bites.',
      },
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
      behavior: {
        idle: 'The diseased giant rat scurries through refuse, emitting faint squeaks and sniffing for food.',
        eating:
          'It feeds on carrion, garbage, or any scraps it can find, often contaminating its food with disease.',
        hiding:
          'The rat uses trash heaps and dark corners to hide, relying on its agility to evade capture.',
        tactics:
          'In combat, it bites repeatedly, spreading disease to its enemies. The rat retreats if injured, using its small size to escape.',
      },
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
      behavior: {
        idle: 'The displacer beast prowls its territory, its tentacles swaying as it searches for prey.',
        eating:
          'It hunts medium to large creatures, tearing into them with its claws and teeth.',
        hiding:
          'The beast uses its natural displacement ability to confuse predators and prey, vanishing into the shadows when necessary.',
        tactics:
          'It uses its displacement ability to avoid attacks, striking quickly with tentacles and claws. The beast focuses on isolating and incapacitating one foe at a time before moving to the next.',
      },
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
      tags: ['humanoid', 'monstrosity', 'shapeshifter'],
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
            tags: ['shapeshifter'],
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
      behavior: {
        idle: 'The doppelganger mimics individuals it observes, practicing their mannerisms and speech in preparation for deception.',
        eating:
          'It eats typical humanoid food to maintain its cover, though it can go without sustenance for long periods.',
        hiding:
          'The doppelganger hides in plain sight, disguising itself as another creature to avoid detection.',
        tactics:
          'In combat, it uses its shapechanging ability to confuse enemies, often posing as an ally to strike at the most vulnerable targets. It retreats if the deception fails.',
      },
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
      behavior: {
        idle: 'The drow patrols its dark domain, watching for intruders and occasionally engaging in quiet rituals of reverence to Lolth.',
        eating:
          'It eats fungi, subterranean creatures, or imported delicacies, often feasting in luxurious surroundings.',
        hiding:
          'The drow uses its natural stealth and shadowy environment to avoid detection, blending seamlessly into the darkness.',
        tactics:
          'In combat, the drow uses hit-and-run tactics, relying on superior mobility and ranged attacks. It prioritizes spellcasters and isolated targets, retreating to regroup if overwhelmed.',
      },
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
      behavior: {
        idle: 'The druid tends to the natural world, meditating or conversing with wildlife in their territory.',
        eating:
          'They forage for fruits, roots, and nuts or hunt small game, always taking only what is necessary.',
        hiding:
          'The druid melds into the environment using magic or natural cover, becoming indistinguishable from the flora and fauna.',
        tactics:
          'In combat, the druid uses spells to control the battlefield, summoning creatures and hindering enemies with area-of-effect abilities. They prioritize protecting allies and the natural world.',
      },
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
      behavior: {
        idle: 'The dryad sings softly to the trees, tending to their health and ensuring the forest thrives.',
        eating:
          'The dryad does not need traditional sustenance, drawing energy from the earth and the trees they protect.',
        hiding:
          'The dryad merges with trees to hide, becoming indistinguishable from bark and branches.',
        tactics:
          'The dryad uses charm and nature magic to avoid direct combat, entangling foes or summoning animals to defend them. They prioritize escaping to safety if their forest is threatened.',
      },
    },
  },
  {
    value: 'duergar',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16850-duergar',
      xp: 200,
      ...defaultDuergarProps,
      behavior: {
        idle: 'The duergar toils in underground forges, crafting weapons or patrolling their subterranean strongholds.',
        eating:
          'They consume fungi, moss, and deep-dwelling creatures, favoring practical and nourishing meals.',
        hiding:
          'The duergar uses invisibility to evade detection, blending into the shadows of their dark environments.',
        tactics:
          'In combat, the duergar enlarges itself to dominate the battlefield, using its strength and resilience to overpower foes. It targets frontline fighters and seeks to neutralize threats quickly.',
      },
    },
  },
  {
    value: 'duergar kavalrachni',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560793-duergar-kavalrachni',
      xp: 450,
      ...defaultDuergarProps,
      behavior: {
        idle: 'The duergar kavalrachni sharpens their lance or tends to their steeder mount, preparing for their next patrol.',
        eating:
          'They eat hearty rations of fungus-based meals or preserved meats while on the move.',
        hiding:
          "They use their mount's ability to climb walls and ceilings to find vantage points, avoiding direct exposure.",
        tactics:
          "The kavalrachni charges enemies from unexpected angles, using their mount's agility to gain an advantage. They prioritize disrupting formations and targeting leaders or spellcasters.",
      },
    },
  },
  {
    value: 'duergar mind master',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560794-duergar-mind-master',
      xp: 450,
      ...defaultDuergarProps,
      behavior: {
        idle: 'The mind master meditates in a dark chamber, honing their psychic abilities or plotting their next move.',
        eating:
          'They eat sparingly, focusing more on mental pursuits than physical sustenance.',
        hiding:
          'The mind master uses invisibility or telepathy to avoid detection, masking their presence from enemies.',
        tactics:
          "In combat, they use psychic manipulation to dominate or confuse enemies, turning them against their allies. They prioritize disrupting the party's cohesion by targeting its mental weakest links.",
      },
    },
  },
  {
    value: 'duergar soulblade',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560796-duergar-soulblade',
      xp: 200,
      ...defaultDuergarProps,
      behavior: {
        idle: 'The soulblade practices their combat techniques, channeling psionic energy into their weapon.',
        eating:
          'They consume practical meals, often while preparing for battle or meditating on their psionic focus.',
        hiding:
          'The soulblade cloaks itself in invisibility, waiting for the perfect moment to strike.',
        tactics:
          'In combat, they strike with precision, using psionic-infused attacks to bypass defenses. They target spellcasters and key tactical figures first, retreating to reassess if outnumbered.',
      },
    },
  },
  {
    value: 'duergar stone guard',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560797-duergar-stone-guard',
      xp: 450,
      ...defaultDuergarProps,
      behavior: {
        idle: "The stone guard stands vigilant at their post, occasionally patrolling the stronghold's perimeter.",
        eating:
          'They eat simple, hearty meals while remaining ready for immediate action.',
        hiding:
          'The stone guard uses their familiarity with underground terrain to find defensive positions or blend into the shadows.',
        tactics:
          'In combat, they form defensive lines, using their shields and weapons to protect allies. They focus on drawing enemy attention while allowing their comrades to strike.',
      },
    },
  },
  {
    value: 'duergar xarrorn',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560799-duergar-xarrorn',
      xp: 450,
      ...defaultDuergarProps,
      behavior: {
        idle: 'The xarrorn tends to their forge or inspects their flame-spewing equipment, ensuring it is ready for battle.',
        eating:
          'They eat small portions of fungi-based meals, often while working in the forge.',
        hiding:
          'The xarrorn relies on their invisibility to hide before ambushing enemies with fire attacks.',
        tactics:
          'In combat, they use their flame-spewing abilities to disrupt enemy formations, focusing on clustered targets. They retreat to reposition if enemies close in.',
      },
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
      behavior: {
        idle: 'The elk roams through forests and open plains, alert for predators or rivals.',
        eating:
          'It grazes on grass, leaves, and shrubs, moving to fresh feeding grounds as needed.',
        hiding:
          'The elk relies on its speed and agility, fleeing to dense forests or over difficult terrain to avoid threats.',
        tactics:
          'In combat, the elk charges with its powerful antlers, aiming to knock down and incapacitate foes. It prioritizes defending itself and escaping over prolonged fights.',
      },
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
      behavior: {
        idle: 'The ettercap prowls its web-filled domain, repairing damaged threads and checking its traps for prey.',
        eating:
          'It consumes creatures ensnared in its webs, injecting venom to paralyze them before feeding.',
        hiding:
          'The ettercap blends into its web-laden surroundings, using the shadows and strands to obscure its form.',
        tactics:
          'In combat, it uses webs to immobilize foes, focusing on isolating weaker enemies. It strikes with venomous bites and claws, retreating deeper into its lair if outnumbered.',
      },
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
      ...defaultSteederProps,
      behavior: {
        idle: 'The female steeder hangs motionless in dark tunnels, observing its territory with unblinking eyes.',
        eating:
          'It preys on small creatures, wrapping them in silk and injecting venom before consuming them.',
        hiding:
          'The steeder uses its ability to climb walls and ceilings to evade detection, lurking in high, shadowy areas.',
        tactics:
          'It uses its silk to ensnare enemies and strikes from above with venomous bites. It targets isolated prey and retreats to higher ground if threatened.',
      },
    },
  },
  {
    value: 'male steeder',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560808-female-steeder',
      xp: 50,
      ...defaultSteederProps,
      behavior: {
        idle: 'The male steeder scuttles across rocky terrain, patrolling its territory for food or intruders.',
        eating:
          'It feeds on small creatures, immobilizing them with its venom before devouring them.',
        hiding:
          'The male steeder hides in crevices or clings to walls, relying on its natural agility to stay out of sight.',
        tactics:
          'In combat, it leaps at foes to surprise them, using its venomous bite to weaken targets. It retreats if its initial attack fails or if heavily injured.',
      },
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
      behavior: {
        idle: 'The flail snail slowly moves through caverns, leaving a shimmering trail of slime behind.',
        eating:
          'It grazes on minerals, scraping them from rocks with its radula-like tongue.',
        hiding:
          'It retracts into its shell when threatened, relying on its sturdy defenses to deter attackers.',
        tactics:
          "In combat, it swings its mace-like tentacles to fend off enemies, using its shell's magical properties to absorb spells. It focuses on self-defense, retreating if overwhelmed.",
      },
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
      behavior: {
        idle: 'The flumph floats gently through the air, occasionally emitting a soft glow as it senses nearby emotions.',
        eating:
          'It absorbs psionic energy from creatures, feeding passively without causing harm.',
        hiding:
          'The flumph uses its glowing light to blend into bioluminescent environments or floats silently into shadows.',
        tactics:
          'The flumph avoids direct combat, using its Stench Spray to deter attackers. It focuses on escaping danger, relying on its agility and psionic abilities to confuse foes.',
      },
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
      behavior: {
        idle: 'The flying snake coils around tree branches or rocks, watching for movement below.',
        eating:
          'It hunts small creatures, swooping down to strike with its venomous fangs.',
        hiding:
          'The snake uses its natural camouflage and ability to glide to retreat into dense foliage or high perches.',
        tactics:
          'In combat, it strikes quickly and retreats to a safe distance, using its speed and flight to evade retaliation. It focuses on softer targets or those already distracted.',
      },
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
        async (_creature: BaseRandomCreatureListItem) => {
          return true
        },
      ],
      behavior: {
        idle: 'The gas spore drifts aimlessly through the air, its surface pulsing faintly with life-like movements.',
        eating:
          'It does not eat but thrives in environments rich with organic decay, absorbing ambient nutrients.',
        hiding:
          'The gas spore blends into fungal colonies or dark caverns, appearing as an ordinary growth.',
        tactics:
          'The gas spore does not actively attack but explodes upon death, spreading its spores to infect nearby creatures. It relies on its deceptive appearance to lure prey close.',
      },
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
      tags: ['aberration', 'beholder'],
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
            tags: ['aberration', 'beholder'],
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
      behavior: {
        idle: 'The gazer floats near its master or patrols its territory, chittering to itself in a high-pitched voice.',
        eating:
          'It feeds on small creatures, paralyzing them with its eye rays before consuming them.',
        hiding:
          'The gazer uses its small size and floating ability to hide in high corners or behind obstacles.',
        tactics:
          'In combat, it uses its eye rays to confuse and harass enemies, targeting weaker foes or disrupting formations. It avoids direct confrontation, retreating to its master or to safety if endangered.',
      },
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
      ...defaultOozeProps,
      behavior: {
        idle: 'The gelatinous cube slowly slides through dungeons and caverns, methodically clearing debris and organic matter from its path.',
        eating:
          'It engulfs anything in its path, dissolving organic material within its acidic body.',
        hiding:
          'The cube remains perfectly still, appearing as a harmless sheen of moisture on the ground or wall.',
        tactics:
          'In combat, it engulfs enemies to dissolve them, targeting those who fail to notice its presence. It relies on its resilience and slow persistence to overwhelm foes.',
      },
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
      behavior: {
        idle: 'The ghast prowls through graveyards or ruins, its rancid stench attracting carrion flies as it hunts.',
        eating:
          'It feasts on fresh corpses, consuming flesh and bone with feral intensity.',
        hiding:
          'The ghast uses its undead nature to lurk in shadows or among other corpses, striking when least expected.',
        tactics:
          'It uses its paralyzing claws to disable enemies, focusing on spreading panic and chaos. It prioritizes the living over the undead and targets isolated foes first.',
      },
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
      behavior: {
        idle: 'The ghoul prowls abandoned places, its emaciated frame trembling with insatiable hunger.',
        eating:
          'It devours flesh ravenously, tearing into fresh corpses or incapacitated victims.',
        hiding:
          'The ghoul crouches among shadows or behind debris, its hunched form blending into the dark.',
        tactics:
          'In combat, the ghoul attacks with its claws, aiming to paralyze enemies. It focuses on weaker targets or freshly fallen victims, ignoring heavily armored foes unless cornered.',
      },
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
      ...getDefaultPredatorProps('medium'),
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'grassland', probability: 0.3 },
        { area: 'hill', probability: 0.2 },
        { area: 'mountain', probability: 0.1 },
      ],
      predisposition: {
        distant: 0, // Neutral unless provoked
        nearby: -20, // Defensive and aggressive if cornered or threatened
      },
      behavior: {
        idle: 'The giant badger digs burrows or forages for food, occasionally pausing to sniff the air for danger.',
        eating:
          'It eats roots, insects, or small mammals, tearing apart tough materials with its claws.',
        hiding:
          'The badger retreats to its burrow or dense underbrush, relying on its natural camouflage to evade detection.',
        tactics:
          'In combat, it charges and claws at its enemies, aiming to drive them off or protect its territory. If overwhelmed, it digs a quick escape route underground.',
      },
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
      ...getDefaultPredatorProps('large'),
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'mountain', probability: 0.2 },
        { area: 'swamp', probability: 0.15 },
        { area: 'underdark', probability: 0.1 },
      ],
      predisposition: {
        distant: -10, // Wary and avoids conflict unless provoked
        nearby: -30, // Defensive and aggressive when threatened or protecting its territory
      },
      behavior: {
        idle: 'The giant bat roosts in dark caves or flits silently through the night, using echolocation to navigate.',
        eating:
          'It hunts insects and small animals, swooping down to snatch its prey with precision.',
        hiding:
          'The bat hides in high, dark spaces, blending into the shadows of its roost.',
        tactics:
          'In combat, it swoops down to harass foes, using its speed and maneuverability to evade counterattacks. It prioritizes retreat if heavily injured.',
      },
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
      ...getDefaultPredatorProps('large'),
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'grassland', probability: 0.25 },
        { area: 'hill', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
        { area: 'coastal', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Defensive when intruders are detected at range
        nearby: -40, // Extremely aggressive and territorial in close proximity
      },
      behavior: {
        idle: 'The giant boar forages in forests or open plains, its tusks gouging the earth as it searches for food.',
        eating:
          'It eats roots, fungi, and small animals, using its immense strength to break through tough obstacles.',
        hiding:
          'The boar hides in dense undergrowth or wallows in muddy areas to avoid detection.',
        tactics:
          'In combat, the giant boar charges at enemies with its tusks, aiming to knock them down. It fights ferociously when cornered, focusing on a single foe at a time.',
      },
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
      behavior: {
        idle: 'The giant centipede crawls through damp, dark environments, feeling its way with its antennae.',
        eating:
          'It hunts smaller creatures, injecting them with venom before consuming their paralyzed bodies.',
        hiding:
          'The centipede hides in crevices, under rocks, or within piles of debris, staying out of sight until prey approaches.',
        tactics:
          'It strikes quickly with its venomous bite, targeting the smallest or weakest foes. If threatened, it retreats into narrow spaces to escape.',
      },
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
      behavior: {
        idle: 'The giant constrictor snake coils in a sunlit area or near a water source, conserving energy for its next hunt.',
        eating:
          'It crushes large prey in its powerful coils before swallowing them whole.',
        hiding:
          'The snake relies on its patterned scales to blend into dense foliage or swampy environments, remaining perfectly still to avoid detection.',
        tactics:
          'In combat, it wraps around its foes to grapple and crush them, focusing on a single target until they are incapacitated. It retreats into water or dense cover if outmatched.',
      },
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
      ...getDefaultPredatorProps('huge'),
      areas: [
        { area: 'grassland', probability: 0.5 },
        { area: 'forest', probability: 0.3 },
        { area: 'hill', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
        { area: 'coastal', probability: 0.05 },
      ],
      predisposition: {
        distant: 10, // Wary of intruders but generally avoids confrontation
        nearby: -20, // Becomes defensive if cornered or threatened
      },
      behavior: {
        idle: 'The giant elk roams vast forests and plains, moving gracefully and with a regal presence.',
        eating:
          'It grazes on grass, shrubs, and leaves, often traveling to find abundant feeding grounds.',
        hiding:
          'The elk relies on its speed and the terrain to evade threats, retreating to areas difficult for predators to navigate.',
        tactics:
          'In combat, it charges at enemies with its antlers, aiming to knock them down or drive them away. It avoids prolonged fights, focusing on escaping with its speed and agility.',
      },
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
      behavior: {
        idle: 'The giant fire beetle scuttles through caves or forests, emitting a faint bioluminescent glow from its glands.',
        eating:
          'It consumes organic matter, including plants, fungi, and small creatures, breaking them apart with its mandibles.',
        hiding:
          'The beetle uses its glow to lure or distract predators, retreating into crevices or burrows when threatened.',
        tactics:
          'In combat, it uses its mandibles to attack, focusing on smaller enemies. If overpowered, it retreats into darkness to avoid further conflict.',
      },
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
      behavior: {
        idle: 'The giant frog lurks near water, croaking softly as it waits for prey to approach.',
        eating:
          'It catches small creatures or insects with its long, sticky tongue, swallowing them whole.',
        hiding:
          'The frog submerges itself in water or mud, leaving only its eyes visible to observe its surroundings.',
        tactics:
          'It uses its tongue to pull enemies into its mouth, focusing on smaller targets. If threatened, it leaps away into water or dense vegetation.',
      },
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
      behavior: {
        idle: 'The giant hyena prowls in search of food, often scavenging for scraps or carcasses left by other predators.',
        eating:
          'It tears into flesh with its powerful jaws, consuming almost any organic material it encounters.',
        hiding:
          'The hyena uses its keen senses to evade larger predators, retreating to hidden dens or rocky outcroppings.',
        tactics:
          'In combat, it uses its Rampage ability to attack multiple foes, targeting weaker enemies first. It fights aggressively but retreats if faced with overwhelming force.',
      },
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
      behavior: {
        idle: 'The giant lizard basks on warm rocks or prowls its habitat, its tongue flicking out to sense its surroundings.',
        eating:
          'It hunts small creatures or scavenges for carrion, snapping its powerful jaws to catch prey.',
        hiding:
          'The lizard blends into rocky terrain or dense foliage, staying still to avoid detection.',
        tactics:
          'In combat, it uses its bite and tail to attack, focusing on nearby threats. If outnumbered, it retreats to climb walls or escape into tight spaces.',
      },
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
      ...getDefaultPredatorProps('large'),
      areas: [
        { area: 'forest', probability: 0.5 },
        { area: 'grassland', probability: 0.3 },
        { area: 'hill', probability: 0.1 },
        { area: 'coastal', probability: 0.05 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: 10, // Observant and cautious at range
        nearby: -10, // Defensive if cornered or threatened
      },
      tags: ['beast', 'bird'],
      behavior: {
        idle: 'The giant owl perches silently in high branches, observing its territory with piercing eyes.',
        eating:
          'It hunts small to medium-sized creatures, swooping silently to catch prey with its talons.',
        hiding:
          'The owl blends into the canopy, using its natural camouflage and keen senses to avoid detection.',
        tactics:
          'In combat, it uses its speed and stealth to strike from above, targeting isolated or vulnerable foes. It retreats to higher ground if overwhelmed.',
      },
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
      behavior: {
        idle: 'The giant poisonous snake coils in a hidden spot, its tongue flicking to sense prey or danger nearby.',
        eating:
          'It hunts small creatures, injecting venom through its fangs to immobilize them before swallowing.',
        hiding:
          'The snake uses its natural camouflage to blend into its surroundings, remaining still to avoid notice.',
        tactics:
          'In combat, it bites with precision, relying on its venom to weaken enemies. It focuses on vulnerable targets and retreats into cover if threatened.',
      },
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
      behavior: {
        idle: 'The giant rat scurries through refuse or dark alleys, constantly sniffing for food or threats.',
        eating:
          'It scavenges for scraps, gnawing on anything remotely edible, including garbage or carrion.',
        hiding:
          'The rat hides in small crevices or burrows, using its agility to avoid predators.',
        tactics:
          'In combat, it attacks in swarms, biting repeatedly to overwhelm enemies. It retreats if faced with a larger threat, often regrouping to attack again later.',
      },
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
      ...defaultSpiderProps,
      behavior: {
        idle: 'The giant spider tends to its web or lies motionless, waiting for prey to become ensnared.',
        eating:
          'It wraps its prey in silk, injecting venom to liquefy the insides before feeding.',
        hiding:
          'The spider blends into dark corners or webbed lairs, using its natural stealth to remain unseen.',
        tactics:
          'It uses its web to trap foes, targeting immobilized enemies with venomous bites. It retreats into its lair if overwhelmed.',
      },
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
      behavior: {
        idle: 'The giant toad lounges near water or in shaded areas, croaking intermittently as it surveys its surroundings.',
        eating:
          'It catches small creatures with its sticky tongue, swallowing them whole in a single gulp.',
        hiding:
          'The toad submerges itself in water or mud, leaving only its eyes and nostrils visible.',
        tactics:
          'In combat, it uses its tongue to grapple foes and pull them into its mouth. It prioritizes smaller targets and retreats to water if outmatched.',
      },
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
      behavior: {
        idle: 'The giant wasp buzzes aggressively around its nest or patrols its territory, ready to defend against intruders.',
        eating:
          'It feeds on nectar or preys on smaller creatures, carrying them back to its nest as food for its larvae.',
        hiding:
          'The wasp nests in high, hidden locations such as trees, cliffs, or caves, avoiding direct exposure.',
        tactics:
          'It uses its stinger to inject venom, aiming for quick, incapacitating strikes. It focuses on threats to its nest and retreats only if gravely injured.',
      },
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
      ...getDefaultPredatorProps('medium'),
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'grassland', probability: 0.3 },
        { area: 'hill', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
      ],
      predisposition: {
        distant: -10, // Wary of threats, prefers to observe or retreat at range
        nearby: -30, // Aggressive and defensive when threatened or cornered
      },
      behavior: {
        idle: 'The giant weasel prowls through its environment, sniffing the air and investigating anything unusual.',
        eating:
          'It hunts small mammals, birds, or reptiles, using its sharp teeth to kill its prey quickly.',
        hiding:
          'The weasel uses its sleek body to slip into narrow spaces or dense vegetation, avoiding predators.',
        tactics:
          'In combat, it attacks with quick bites, focusing on soft or exposed areas of its prey. It retreats if overwhelmed, relying on its agility to escape.',
      },
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
      ...defaultSpiderProps,
      sizes: ['medium'],
      behavior: {
        idle: 'The giant wolf spider moves stealthily through forests or caves, its many eyes scanning for prey.',
        eating:
          'It hunts small creatures, pouncing on them and injecting venom to paralyze them before feeding.',
        hiding:
          'The spider uses its natural camouflage to blend into rocky terrain or forest floors, staying low to the ground.',
        tactics:
          'It uses stealth to ambush foes, targeting isolated or distracted enemies. If threatened, it retreats to dense cover or higher ground.',
      },
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
      behavior: {
        idle: 'The gibbering mouther moves sluggishly through its surroundings, its many mouths babbling incoherently.',
        eating:
          'It devours any organic matter it encounters, dissolving it in its acidic saliva.',
        hiding:
          'The mouther relies on its amorphous shape to blend into rocky terrain or other natural environments.',
        tactics:
          'In combat, it uses its gibbering to confuse enemies and its acidic spittle to harm and weaken foes. It targets the closest creatures and attempts to overwhelm them with sheer mass.',
      },
    },
  },
  {
    value: 'gnoll',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16904-gnoll',
      xp: 50,
      ...defaultGnollProps,
      behavior: {
        idle: 'The gnoll prowls its territory, snarling and howling to intimidate rivals or locate prey.',
        eating:
          'It tears into raw flesh, consuming everything from small animals to the remains of its victims.',
        hiding:
          'The gnoll uses natural cover such as tall grass or rocky outcrops to stalk its prey.',
        tactics:
          'In combat, the gnoll uses its ferocity to charge enemies, attacking recklessly and focusing on weaker targets. It fights in packs, coordinating attacks to overwhelm foes.',
      },
    },
  },
  {
    value: 'gnoll flesh gnawer',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560833-gnoll-flesh-gnawer',
      xp: 200,
      ...defaultGnollProps,
      behavior: {
        idle: 'The flesh gnawer paces restlessly, licking its claws or gnashing its teeth as it searches for its next kill.',
        eating:
          'It devours flesh with wild abandon, savoring the taste of fresh blood.',
        hiding:
          'The flesh gnawer hides in shadows or dense terrain, stalking its prey with animalistic cunning.',
        tactics:
          'It leaps into combat with frenzied attacks, targeting isolated or vulnerable foes. It uses its agility to dodge counterattacks and moves quickly to avoid being surrounded.',
      },
    },
  },
  {
    value: 'gnoll hunter',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560834-gnoll-hunter',
      xp: 100,
      ...defaultGnollProps,
      behavior: {
        idle: 'The gnoll hunter prowls the outskirts of its pack, scanning for potential prey with its keen eyes and nose.',
        eating: 'It consumes raw meat, often storing extra kills for the pack.',
        hiding:
          'The hunter uses its surroundings to stay hidden, blending into the terrain as it stalks its quarry.',
        tactics:
          'It attacks from a distance with its bow, aiming for vital points to incapacitate prey. If forced into close combat, it fights with ferocity but prioritizes retreat if outnumbered.',
      },
    },
  },
  {
    value: 'gnoll pack lord',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#gnoll%20pack%20lord_mm',
      xp: 450,
      ...defaultGnollProps,
      behavior: {
        idle: 'The pack lord barks commands to its followers, asserting dominance with displays of strength and brutality.',
        eating:
          'It eats the best portions of a kill, often taking food from lesser gnolls to assert its authority.',
        hiding:
          'The pack lord rarely hides, relying on its pack to protect it and its reputation to deter attackers.',
        tactics:
          'It leads from the front, inspiring its pack with fierce roars and devastating attacks. It targets the strongest foes to prove its dominance and break enemy morale.',
      },
    },
  },
  {
    value: 'gnoll witherling',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560835-gnoll-witherling',
      xp: 50,
      ...defaultGnollProps,
      tags: ['humanoid', 'monstrosity', 'undead'],
      areas: [
        { area: 'cursed', probability: 0.4 }, // Often found in cursed or desolate lands
        { area: 'swamp', probability: 0.2 }, // Swamps often harbor undead creatures
        { area: 'grassland', probability: 0.2 }, // Remnants of gnoll tribes that turned into witherlings
        { area: 'hill', probability: 0.1 }, // Found in hilly regions where gnoll tribes may roam
        { area: 'dungeon', probability: 0.05 }, // Sometimes used as guardians or wanderers
        { area: 'forest', probability: 0.05 }, // Occasionally found near gnoll-infested forests
      ],
      behavior: {
        idle: 'The witherling shuffles aimlessly, its hollow eyes scanning the surroundings for enemies.',
        eating:
          'It does not eat, sustained by necrotic energy instead of sustenance.',
        hiding:
          'The witherling hides among shadows or other undead, blending into desolate or eerie terrain.',
        tactics:
          'In combat, it strikes relentlessly, focusing on living creatures to spread destruction. It fights without fear, using its undead resilience to press the attack.',
      },
    },
  },
  {
    value: 'goblin',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16899-goblin',
      xp: 50,
      ...defaultGoblinoidProps,
      behavior: {
        idle: 'The goblin scurries through its lair, crafting crude traps or arguing with its kin over petty matters.',
        eating:
          'It eats scraps of food, often stolen from others, with little regard for hygiene or quality.',
        hiding:
          'The goblin hides in crevices, behind debris, or in shadows, relying on its small size to stay unnoticed.',
        tactics:
          'In combat, it relies on ambushes and traps, using hit-and-run tactics to wear down foes. It targets weaker enemies and retreats if outnumbered.',
      },
    },
  },
  {
    value: 'goblin boss',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary/goblin-boss-mm.html',
      xp: 200,
      ...defaultGoblinoidProps,
      behavior: {
        idle: 'The goblin boss barks orders to its minions, lounging on a makeshift throne or counting stolen treasures.',
        eating:
          'It eats greedily, taking the best food for itself while leaving scraps for its underlings.',
        hiding:
          'The boss uses its minions as shields, retreating into hidden chambers or behind barriers if threatened.',
        tactics:
          'In combat, it commands its allies to attack while staying safely out of reach. It focuses on disrupting enemy coordination, using its leadership to overwhelm foes.',
      },
    },
  },
  {
    value: 'gray ooze',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16909-gray-ooze',
      xp: 100,
      ...defaultOozeProps,
      sizes: ['medium'],
      behavior: {
        idle: 'The gray ooze slithers slowly across damp surfaces, blending into its surroundings as it seeks sustenance.',
        eating:
          'It consumes organic and metallic materials, corroding them with its acidic body.',
        hiding:
          'The ooze remains motionless, appearing as a harmless patch of moisture until prey approaches.',
        tactics:
          'In combat, it engulfs enemies, corroding their equipment and flesh. It relies on its resilience and surprise to gain the upper hand.',
      },
    },
  },
  {
    value: 'psychic gray ooze',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17186-psychic-gray-ooze',
      xp: 100,
      ...defaultOozeProps,
      sizes: ['medium'],
      behavior: {
        idle: 'The psychic gray ooze pulsates faintly, its surface shimmering as it scans its surroundings for psionic activity.',
        eating:
          'It feeds on thoughts and memories, draining the psychic energy of nearby creatures.',
        hiding:
          'It hides by mimicking the texture and color of nearby surfaces, remaining undetectable until it strikes.',
        tactics:
          'It uses its psychic abilities to disorient enemies, focusing on spellcasters and psionically gifted targets. It avoids direct combat, relying on its abilities to weaken foes from a distance.',
      },
    },
  },
  {
    value: 'green hag',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16911-green-hag',
      xp: 700,
      tags: ['fey'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'swamp', probability: 0.4 },
        { area: 'forest', probability: 0.3 },
        { area: 'cursed', probability: 0.2 },
        { area: 'hill', probability: 0.05 },
        { area: 'urban', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Observes and manipulates from afar
        nearby: -50, // Extremely dangerous in melee combat
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['fey', 'monstrosity', 'undead'],
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
            moralAlignments: ['good'],
          })
        },
      ],
      behavior: {
        idle: 'The green hag prowls her swampy domain, muttering curses and weaving illusions to ensnare her victims.',
        eating:
          'She consumes raw flesh or foul concoctions brewed from swamp ingredients, relishing the misery of her prey.',
        hiding:
          'The hag blends into her environment using illusions or disguises, often taking the form of an innocuous old woman.',
        tactics:
          'In combat, she uses her spells and illusory magic to confuse and frighten enemies. She avoids direct combat, preferring to strike from the shadows or through manipulated minions.',
      },
    },
  },
  {
    value: 'grell',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary/grell-mm.html',
      xp: 700,
      tags: ['aberration'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.4 },
        { area: 'cursed', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Stalks prey from a distance
        nearby: -50, // Highly aggressive in melee combat
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['aberration'],
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
            moralAlignments: ['good'],
          })
        },
      ],
      behavior: {
        idle: 'The grell floats silently through dark caverns, its tentacles twitching as it senses movement.',
        eating:
          'It paralyzes prey with its tentacles before consuming them with its sharp beak.',
        hiding:
          'The grell clings to ceilings or lurks in shadows, waiting for unsuspecting creatures to pass below.',
        tactics:
          'In combat, it targets isolated foes, grappling them with its tentacles to paralyze and incapacitate. It retreats into higher terrain if outnumbered.',
      },
    },
  },
  {
    value: 'grick',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16903-grick',
      xp: 450,
      tags: ['monstrosity'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.35 },
        { area: 'cursed', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Cautious and territorial at range
        nearby: -40, // Highly aggressive in melee combat
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'aberration'],
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
              dietTags: ['mammal', 'humanoid', 'insect'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The grick slithers through rocky terrain, its movements nearly silent as it hunts for prey.',
        eating:
          'It attacks small creatures with its tentacles and beak, consuming their flesh.',
        hiding:
          'The grick camouflages itself against rocky surfaces, remaining motionless until prey comes within reach.',
        tactics:
          'In combat, it lashes out with its tentacles, targeting soft or unarmored foes. If faced with multiple enemies, it retreats to narrow tunnels or crevices to regroup.',
      },
    },
  },
  {
    value: 'grimlock',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16914-grimlock',
      xp: 50,
      tags: ['humanoid', 'monstrosity'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'underdark', probability: 0.6 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'cursed', probability: 0.1 },
      ],
      predisposition: {
        distant: -30, // Hostile and opportunistic at a distance
        nearby: -50, // Extremely aggressive in melee combat
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'aberration'],
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
            diet: {
              dietTags: ['mammal', 'humanoid'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The grimlock stalks its territory, using its keen sense of smell and hearing to navigate and detect intruders.',
        eating:
          'It consumes raw meat, scavenging or hunting for prey in the dark depths of the Underdark.',
        hiding:
          'The grimlock uses its natural stealth to blend into rocky surroundings, relying on its acute senses to remain alert.',
        tactics:
          'It attacks with crude weapons or claws, focusing on enemies who make the most noise. It fights ferociously to protect its territory but retreats if heavily injured.',
      },
    },
  },
  {
    value: 'grung',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560842-grung',
      xp: 50,
      ...defaultGrungProps,
      behavior: {
        idle: 'The grung croaks softly, tending to its territory and maintaining its social hierarchy within the tribe.',
        eating:
          'It consumes insects and small animals, often catching prey with its quick reflexes and sticky tongue.',
        hiding:
          'The grung hides in dense foliage or under water, using its colorful skin to blend into the environment.',
        tactics:
          'It uses its agility to strike quickly, targeting enemies with poison-coated weapons. The grung avoids prolonged combat, retreating to the safety of its tribe if threatened.',
      },
    },
  },
  {
    value: 'grung elite warrior',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560840-grung-elite-warrior',
      xp: 450,
      ...defaultGrungProps,
      behavior: {
        idle: "The elite warrior patrols the tribe's territory, ensuring its boundaries are secure and leading raids against intruders.",
        eating:
          'It eats larger prey than common grungs, often the spoils of successful hunts or battles.',
        hiding:
          'The elite warrior uses its heightened skills to blend into surroundings, often lying in ambush for prey.',
        tactics:
          'In combat, it leads with tactical precision, targeting the strongest foes to disrupt enemy formations. It fights fiercely but knows when to retreat to rally its allies.',
      },
    },
  },
  {
    value: 'grung wildling',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560841-grung-wildling',
      xp: 200,
      ...defaultGrungProps,
      behavior: {
        idle: 'The grung wildling performs strange rituals and experiments with its magical abilities, often communing with nature spirits.',
        eating:
          'It consumes rare herbs, insects, and small animals, using their properties in its magical practices.',
        hiding:
          'The wildling hides among the flora of its habitat, using its innate magic to cloak its presence.',
        tactics:
          'In combat, it uses spells to control the battlefield and support its allies, focusing on disrupting enemies with poisons and enchantments. It avoids direct confrontation, relying on others to protect it.',
      },
    },
  },
  {
    value: 'guard',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16909-guard',
      xp: 25,
      tags: ['humanoid', 'lawEnforcement'],
      sizes: ['medium'],
      legalAlignments: ['lawful', 'neutral'],
      moralAlignments: ['good', 'neutral'],
      areas: [
        { area: 'urban', probability: 0.7 },
        { area: 'coastal', probability: 0.1 },
        { area: 'grassland', probability: 0.1 },
        { area: 'forest', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Observes and warns intruders
        nearby: -30, // Aggressive in defense of their charge
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['lawEnforcement', 'humanoid'],
            moralAlignments: ['good', 'neutral'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['criminal', 'mercenary', 'beast'],
            moralAlignments: ['evil'],
          })
        },
      ],
      behavior: {
        idle: 'The guard patrols their post, keeping an eye out for suspicious activity and maintaining order.',
        eating:
          'They eat simple rations, often on the move or during short breaks from their duties.',
        hiding:
          'The guard takes cover behind obstacles or walls when under attack, using their training to avoid unnecessary risks.',
        tactics:
          'In combat, they form defensive lines and work in coordination with allies to protect key positions. They focus on holding ground and protecting civilians or high-value targets.',
      },
    },
  },
  {
    value: 'harpy',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16919-harpy',
      xp: 200,
      tags: ['monstrosity'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'coastal', probability: 0.4 },
        { area: 'mountain', probability: 0.3 },
        { area: 'forest', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Lures victims with a captivating song
        nearby: -50, // Aggressive and predatory in close combat
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'beast'],
            moralAlignments: ['evil'],
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
          })
        },
      ],
      behavior: {
        idle: 'The harpy perches on rocky ledges, singing haunting melodies to lure prey into her domain.',
        eating:
          'She devours flesh, often tormenting her victims before killing them.',
        hiding:
          'The harpy hides among cliffs or dense foliage, waiting for the perfect moment to strike.',
        tactics:
          'She uses her alluring song to draw enemies into traps or dangerous terrain, attacking with claws and improvised weapons. She avoids direct confrontation, preferring hit-and-run tactics.',
      },
    },
  },
  {
    value: 'hobgoblin',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16925-hobgoblin',
      xp: 100,
      ...defaultGoblinoidProps,
      sizes: ['medium'],
      moralAlignments: ['evil'],
      legalAlignments: ['lawful'],
      behavior: {
        idle: 'The hobgoblin drills with its weapons, maintaining discipline and preparing for battle.',
        eating:
          'It eats hearty meals, often shared communally with other members of its unit.',
        hiding:
          'The hobgoblin uses military precision to find strategic cover, avoiding exposure in dangerous situations.',
        tactics:
          'In combat, it fights in organized ranks, using its martial training to focus on high-value targets. It works in tandem with allies to flank and overwhelm enemies.',
      },
    },
  },
  {
    value: 'hobgoblin captain',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary/hobgoblin-captain-mm.html',
      xp: 700,
      ...defaultGoblinoidProps,
      sizes: ['medium'],
      moralAlignments: ['evil'],
      legalAlignments: ['lawful'],
      behavior: {
        idle: 'The hobgoblin captain oversees the training of troops, ensuring discipline and readiness for battle.',
        eating:
          'It eats the best rations available, often sharing meals with trusted lieutenants while discussing strategies.',
        hiding:
          'The captain uses its knowledge of terrain to take cover or position itself advantageously in battle.',
        tactics:
          'In combat, the captain commands its allies with precision, focusing on breaking enemy lines. It targets leaders or spellcasters to disrupt the opposing force, retreating if the battle turns unfavorable.',
      },
    },
  },
  {
    value: 'hobgoblin iron shadow',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560847-hobgoblin-iron-shadow',
      xp: 450,
      ...defaultGoblinoidProps,
      sizes: ['medium'],
      moralAlignments: ['neutral'],
      legalAlignments: ['lawful'],
      behavior: {
        idle: 'The iron shadow meditates in silence, practicing shadowy martial techniques or honing its magical abilities.',
        eating:
          'It consumes simple, minimal meals, often while training or observing its surroundings.',
        hiding:
          'The iron shadow uses stealth and illusions to blend into darkness, avoiding detection until it strikes.',
        tactics:
          'In combat, it uses a combination of martial arts and shadow magic to disorient and incapacitate enemies. It targets vulnerable foes with precise strikes and retreats into darkness if overpowered.',
      },
    },
  },
  {
    value: 'hook horror',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#hook%20horror_mm',
      xp: 700,
      tags: ['monstrosity'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.6 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'mountain', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Cautiously observes or stalks prey from a distance
        nearby: -50, // Ferocious in close quarters, using its hooked claws
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity'],
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
              dietTags: ['mammal', 'humanoid'],
              dietSizes: getSizesLt('large'),
            },
            moralAlignments: ['good'],
          })
        },
      ],
      behavior: {
        idle: 'The hook horror patrols its underground territory, scraping its hooks against stone to mark its domain.',
        eating:
          'It consumes small creatures or scavenges for food, using its hooks to tear apart its prey.',
        hiding:
          'The hook horror clings to cavern walls or ceilings, blending into rocky terrain to ambush intruders.',
        tactics:
          'In combat, it attacks with its hooks, focusing on foes who pose the greatest threat. It uses its climbing abilities to escape or reposition if overwhelmed.',
      },
    },
  },
  {
    value: 'hyena',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16930-hyena',
      xp: 10,
      tags: ['beast', 'mammal'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'grassland', probability: 0.5 },
        { area: 'desert', probability: 0.3 },
        { area: 'hill', probability: 0.15 },
        { area: 'forest', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Observes or scavenges opportunistically from afar
        nearby: -30, // Aggressive, especially when in packs or cornered
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['beast'],
            creatureNames: ['hyena', 'gnoll'],
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
              dietTags: ['mammal', 'bird'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The hyena roams in search of food, sniffing the air and communicating with its pack through yips and howls.',
        eating:
          'It scavenges for carrion or hunts small animals, tearing into flesh with powerful jaws.',
        hiding:
          'The hyena relies on tall grass or rocky terrain to stay hidden, stalking its prey with patience.',
        tactics:
          'In combat, it targets weaker foes, using its speed and bite to harass enemies. It retreats to regroup with its pack if injured.',
      },
    },
  },
  {
    value: 'kenku',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#kenku_mm',
      xp: 25,
      tags: ['humanoid', 'bird'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'urban', probability: 0.5 },
        { area: 'forest', probability: 0.3 },
        { area: 'swamp', probability: 0.1 },
        { area: 'dungeon', probability: 0.05 },
        { area: 'mountain', probability: 0.05 },
      ],
      regions: [
        /*
         * The Kenku are native to the Shadewood Weald, a mysterious and shadowed forest steeped in ancient magic.
         * Their origins trace back to ancient ravens that consumed the blood of the Ratfolk,
         * a race born from the transformative power of the wellspring beneath the Elder Tree.
         * This dark act reshaped the ravens into the cunning and resourceful Kenku, forever binding their fate to the Ratfolk.
         * This shared origin has fueled an enduring rivalry and deep-seated enmity between the two races.
         * Symbolic of the tension between the surface and the subterranean world, their conflict is a reflection of
         * opposing forces vying for dominance and survival in the Dragonsbeard Glen's mystical depths.
         */
        { region: 'Shadewood Weald', probability: 1 },
      ],
      predisposition: {
        distant: -10, // Wary and opportunistic at a distance
        nearby: -30, // Opportunistic and potentially aggressive when cornered
      },
      allies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'criminal', 'mercenary', 'bird'],
            creatureNames: ['raven'],
          })
        },
      ],
      enemies: [
        (creature: BaseRandomCreatureListItem) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'lawEnforcement'],
            creatureNames: ['ratfolk'],
            moralAlignments: ['good'],
          })
        },
      ],
      behavior: {
        idle: 'The kenku mimics sounds and phrases it has heard, often practicing to perfect its vocal mimicry.',
        eating:
          'It eats scavenged food, preferring to steal from others or pick at scraps left behind.',
        hiding:
          'The kenku uses its small size and agility to hide in shadows or behind obstacles, avoiding confrontation.',
        tactics:
          'In combat, it fights with cunning and misdirection, using its mimicry to confuse enemies. It focuses on opportunistic strikes and retreats quickly if the fight turns against it.',
      },
    },
  },
  {
    value: 'kobold',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16889-kobold',
      xp: 25,
      ...defaultKoboldProps,
      behavior: {
        idle: 'The kobold works tirelessly to dig tunnels, set traps, or gather shiny objects for its hoard.',
        eating:
          'It eats insects, small animals, or whatever it can scavenge, often sharing food within its warren.',
        hiding:
          'The kobold hides in its tunnels or behind traps, relying on its small size to evade detection.',
        tactics:
          'In combat, it uses traps and ambush tactics to weaken foes, targeting vulnerable enemies first. It retreats into narrow spaces or hidden tunnels if overwhelmed.',
      },
    },
  },
  {
    value: 'kobold inventor',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560856-kobold-inventor',
      xp: 50,
      ...defaultKoboldProps,
      behavior: {
        idle: 'The kobold inventor tinkers with contraptions, often muttering to itself while testing new traps or gadgets.',
        eating:
          'It eats whatever is available, often while distracted by its latest creation.',
        hiding:
          'The inventor hides among its inventions or in small burrows, using its gadgets to deter pursuers.',
        tactics:
          'In combat, it uses improvised devices to confuse and harm enemies, focusing on causing chaos. It avoids direct fighting, relying on allies to protect it while it deploys traps or explosives.',
      },
    },
  },
  {
    value: 'kobold scale sorcerer',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560857-kobold-scale-sorcerer',
      xp: 200,
      ...defaultKoboldProps,
      behavior: {
        idle: 'The scale sorcerer practices its draconic magic, often boasting of its connection to dragonkind.',
        eating:
          'It eats sparingly, often demanding better portions as a mark of its perceived superiority.',
        hiding:
          'The sorcerer uses its magic to obscure its presence, retreating to defensible positions when threatened.',
        tactics:
          'In combat, it casts spells to control the battlefield, targeting clustered enemies with area-of-effect magic. It prioritizes protecting itself and directing allies to maximize their effectiveness.',
      },
    },
  },
  {
    value: 'kuo-toa',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#kuo-toa_mm',
      xp: 50,
      ...defaultKuoToaProps,
      behavior: {
        idle: 'The kuo-toa patrols its underwater domain, chanting prayers to its strange gods or maintaining its lair.',
        eating:
          'It consumes fish, seaweed, or other aquatic creatures, often catching its food barehanded.',
        hiding:
          'The kuo-toa uses murky waters and submerged tunnels to avoid detection, retreating to its lair if pursued.',
        tactics:
          'In combat, it uses nets and spears to entangle and harm enemies, targeting isolated foes. It retreats to regroup with allies if overwhelmed.',
      },
    },
  },
  {
    value: 'kuo-toa monitor',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#kuo-toa%20monitor_mm',
      xp: 700,
      ...defaultKuoToaProps,
      behavior: {
        idle: 'The monitor performs rituals or trains, its body constantly in motion as it channels divine energy.',
        eating:
          'It eats simple aquatic fare, often caught during its patrols or given as offerings by lesser kuo-toa.',
        hiding:
          'The monitor uses its agility and environment to stay hidden, often blending into underwater terrain.',
        tactics:
          'In combat, it fights with a combination of unarmed strikes and divine magic, focusing on protecting its allies and disrupting enemy tactics. It prioritizes leaders or spellcasters in battle.',
      },
    },
  },
  {
    value: 'kuo-toa whip',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#kuo-toa%20whip_mm',
      xp: 200,
      ...defaultKuoToaProps,
      behavior: {
        idle: 'The whip leads prayers and rituals to its mad gods, directing other kuo-toa with fervent zeal.',
        eating:
          'It eats aquatic creatures brought to it as offerings, often while muttering incoherent blessings.',
        hiding:
          'The whip hides among its followers, using them as shields while retreating to safer areas when threatened.',
        tactics:
          'In combat, it uses spells and divine abilities to bolster its allies, focusing on maintaining morale and cohesion. It avoids direct confrontation, relying on its minions to protect it.',
      },
    },
  },
  {
    value: 'lizardfolk',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16946-lizardfolk',
      xp: 100,
      ...defaultLizardfolkProps,
      behavior: {
        idle: 'The lizardfolk moves through its swampy territory, crafting tools or hunting for prey.',
        eating:
          'It consumes raw meat, fish, or reptiles, often eating its kill immediately.',
        hiding:
          'The lizardfolk uses its environment to blend in, submerging itself in water or lying motionless in the reeds.',
        tactics:
          'In combat, it fights with primal ferocity, using simple weapons and its natural strength. It prioritizes survival, retreating if the battle turns against it.',
      },
    },
  },
  {
    value: 'lizardfolk shaman',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#lizardfolk%20shaman_mm',
      xp: 450,
      ...defaultLizardfolkProps,
      behavior: {
        idle: 'The lizardfolk shaman conducts rituals, communes with nature, or instructs its tribe in spiritual matters.',
        eating:
          'It eats small game or fish, often preparing its meals with herbs or magical infusions.',
        hiding:
          'The shaman uses its knowledge of the swamp to hide in dense foliage or beneath water surfaces.',
        tactics:
          'In combat, it uses spells to manipulate the battlefield and empower its allies. It avoids direct confrontation, focusing on disrupting enemies with magic.',
      },
    },
  },
  {
    value: 'mastiff',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16953-mastiff',
      xp: 25,
      areas: [
        { area: 'urban', probability: 0.4 },
        { area: 'grassland', probability: 0.3 },
        { area: 'forest', probability: 0.2 },
        { area: 'hill', probability: 0.1 },
      ],
      predisposition: {
        distant: -10, // Observes and warns intruders
        nearby: -30, // Aggressive in defense of their charge
      },
      ...getDefaultPredatorProps('medium'),
      behavior: {
        idle: 'The mastiff patrols its territory or loyally follows its master, always alert for potential threats.',
        eating:
          'It eats raw or cooked meat, often provided by its master or scavenged during hunts.',
        hiding:
          'The mastiff relies on its agility and speed to evade danger, retreating to its master or a safe spot when necessary.',
        tactics:
          'In combat, it lunges at enemies, aiming to knock them prone with its powerful bite. It prioritizes defending its master and attacking threats to its pack.',
      },
    },
  },
  {
    value: 'meazel',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560870-meazel',
      xp: 200,
      tags: ['humanoid'],
      sizes: ['medium'],
      legalAlignments: ['neutral', 'chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'cursed', probability: 0.4 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'underdark', probability: 0.2 },
        { area: 'forest', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Observes and stalks prey from the shadows
        nearby: -40, // Aggressively ambushes when close
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'undead'],
            moralAlignments: ['evil'],
            creatureNames: ['shadow', 'dark'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'fey'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['humanoid', 'beast'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The meazel skulks in shadows, muttering curses under its breath as it observes potential victims.',
        eating:
          'It consumes small creatures or stolen food, often hoarding its spoils in hidden lairs.',
        hiding:
          'The meazel uses its surroundings to blend into shadows, moving stealthily to avoid detection.',
        tactics:
          'In combat, it uses hit-and-run tactics, striking with its garrote and teleporting away to evade retaliation. It targets isolated foes, aiming to incapacitate them before vanishing.',
      },
    },
  },
  {
    value: 'meenlock',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560871-meenlock',
      xp: 450,
      tags: ['fey'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'cursed', probability: 0.3 },
        { area: 'underdark', probability: 0.2 },
        { area: 'dungeon', probability: 0.1 },
      ],
      predisposition: {
        distant: -30, // Stalks and terrorizes prey at range
        nearby: -50, // Extremely aggressive and fear-inducing in melee
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            creatureNames: ['dark', 'shadow'],
          })
        },
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['fey'],
            moralAlignments: ['evil'],
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
            diet: {
              dietTags: ['humanoid', 'beast'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The meenlock lurks in dark, oppressive forests or caves, its presence tainting the surroundings with an aura of fear.',
        eating:
          'It feeds on the psychic anguish of its victims, prolonging their suffering to savor the fear.',
        hiding:
          'The meenlock melds into shadows, using its small size and dark environment to remain undetected.',
        tactics:
          'In combat, it paralyzes enemies with its claws and terrorizes them with its fear aura. It avoids direct confrontation, using hit-and-run tactics to wear down foes.',
      },
    },
  },
  {
    value: 'mimic',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16957-mimic',
      xp: 450,
      tags: ['monstrosity', 'shapeshifter'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'dungeon', probability: 0.6 },
        { area: 'cursed', probability: 0.2 },
        { area: 'underdark', probability: 0.15 },
        { area: 'urban', probability: 0.05 },
      ],
      predisposition: {
        distant: 0, // Passive until prey interacts with it
        nearby: -50, // Aggressive when prey is close or touches it
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['shapeshifter'],
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
              dietTags: ['humanoid', 'beast'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The mimic lies perfectly still, disguised as an ordinary object, waiting for prey to approach.',
        eating:
          'It consumes creatures that touch or investigate its disguised form, enveloping them with its adhesive body.',
        hiding:
          'The mimic uses its shapechanging ability to blend into its surroundings, mimicking furniture, chests, or other mundane objects.',
        tactics:
          'In combat, it adheres to its prey, striking with pseudopods while holding them in place. It focuses on isolated targets and uses its resilience to outlast enemies.',
      },
    },
  },
  {
    value: 'minotaur',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16899-minotaur',
      xp: 700,
      ...defaultMinotaurProps,
      behavior: {
        idle: 'The minotaur roams its labyrinth, snorting and roaring to assert dominance over its territory.',
        eating:
          'It consumes meat from animals or intruders, often killing prey with its brute strength.',
        hiding:
          'The minotaur does not hide but uses the maze-like structure of its lair to confuse and ambush intruders.',
        tactics:
          'In combat, it charges at enemies with its horns, focusing on breaking through their defenses. It uses its knowledge of the terrain to corner foes and ensure victory.',
      },
    },
  },
  {
    value: 'minotaur skeleton',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560873-minotaur-skeleton',
      xp: 450,
      ...defaultMinotaurProps,
      tags: [...defaultMinotaurProps.tags!, 'undead'],
      behavior: {
        idle: "The minotaur skeleton patrols its master's domain, its hollow eyes glowing faintly with necrotic energy.",
        eating:
          'It does not eat but exists to serve the will of its master or defend its lair.',
        hiding:
          'The skeleton uses dark corridors or alcoves to remain hidden until activated.',
        tactics:
          'In combat, it charges with its horns and swings its weapons with relentless force. It fights without fear or hesitation, seeking to destroy all intruders.',
      },
    },
  },
  {
    value: 'mud mephit',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#mud%20mephit_mm',
      xp: 50,
      tags: ['elemental'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'swamp', probability: 0.5 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'underdark', probability: 0.2 },
        { area: 'cursed', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Opportunistically hostile at range
        nearby: -30, // Aggressive and relies on mud-based abilities
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['elemental'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'fey'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['plant', 'insect'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The mud mephit frolics in muddy terrain, chortling mischievously as it splashes and creates filth.',
        eating:
          'It consumes small amounts of mud and organic debris, drawing sustenance from the earth.',
        hiding:
          'The mephit uses mud and swampy terrain to camouflage itself, blending into its surroundings.',
        tactics:
          'It uses its mud breath to blind enemies and summon allies from the muck. The mephit avoids direct combat, relying on distractions and its ability to retreat into mud.',
      },
    },
  },
  {
    value: 'myconid adult',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#myconid%20adult_mm',
      xp: 100,
      ...defaultMyconidProps,
      behavior: {
        idle: 'The myconid adult tends to its fungal grove, spreading spores to cultivate new growth.',
        eating:
          'It absorbs nutrients from decaying matter, thriving on the organic material in its environment.',
        hiding:
          'The myconid blends into its fungal surroundings, appearing as an ordinary mushroom to casual observers.',
        tactics:
          'In combat, it uses its spores to stun and confuse enemies, focusing on defending its grove and allies. It avoids unnecessary violence, seeking peaceful resolution if possible.',
      },
    },
  },
  {
    value: 'myconid sovereign',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#myconid%20sovereign_mm',
      xp: 450,
      ...defaultMyconidProps,
      behavior: {
        idle: 'The myconid sovereign oversees its grove, directing the growth of fungi and the movements of its myconid colony.',
        eating:
          'It absorbs nutrients from decomposing organic matter, maintaining the health of the grove.',
        hiding:
          'The sovereign blends into its environment, appearing as a massive, ancient fungal growth.',
        tactics:
          'In combat, it releases spores to control or incapacitate enemies, relying on its colony for defense. It seeks to protect its grove above all else, retreating only if absolutely necessary.',
      },
    },
  },
  {
    value: 'myconid sprout',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#myconid%20sprout_mm',
      xp: 10,
      ...defaultMyconidProps,
      behavior: {
        idle: 'The myconid sprout shuffles around the grove, absorbing nutrients and growing under the watchful care of its elders.',
        eating:
          'It feeds on decomposing organic matter, drawing sustenance from the soil.',
        hiding:
          'The sprout hides among larger fungi, its small size making it difficult to spot.',
        tactics:
          'In combat, it relies on older myconids for protection, using its spores to create minor distractions or hinder foes. It avoids direct engagement, focusing on survival.',
      },
    },
  },
  {
    value: 'needle blight',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#needle%20blight_mm',
      xp: 25,
      ...defaultBlightProps,
      behavior: {
        idle: 'The needle blight stands motionless, blending into a forest as it waits for intruders to approach.',
        eating:
          'It feeds on the life energy of creatures it kills, using its needles to drain vitality.',
        hiding:
          'The blight uses its plant-like appearance to remain undetected until it attacks.',
        tactics:
          'It fires needles from a distance, targeting enemies before closing in with claw attacks. It focuses on weaker foes and avoids prolonged combat if outnumbered.',
      },
    },
  },
  {
    value: 'neogi',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560886-neogi',
      xp: 700,
      ...defaultNeogiProps,
      behavior: {
        idle: 'The neogi plots and schemes, commanding its minions while weaving plans for power and dominance.',
        eating:
          'It consumes the flesh of enslaved creatures or the remains of its enemies, often eating with cruel delight.',
        hiding:
          'The neogi uses its surroundings and magic to conceal itself, avoiding detection until it can strike or escape.',
        tactics:
          'In combat, it uses its poison and mind-controlling abilities to dominate foes, prioritizing spellcasters or leaders. It avoids direct conflict, relying on minions and clever tactics to win.',
      },
    },
  },
  {
    value: 'neogi hatchling',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560884-neogi-hatchling',
      xp: 700,
      ...defaultNeogiProps,
      sizes: ['tiny'],
      behavior: {
        idle: 'The neogi hatchling scuttles nervously around its nest, practicing its venomous strikes on small creatures.',
        eating:
          'It feeds on scraps provided by adult neogi or hunts small prey in its environment.',
        hiding:
          'The hatchling hides in crevices or under objects, relying on its small size and quick movements to avoid threats.',
        tactics:
          'It strikes quickly with its venom, focusing on smaller or distracted foes. If threatened, it retreats to safety, often seeking protection from adult neogi.',
      },
    },
  },
  {
    value: 'nilbog',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560889-nilbog',
      xp: 200,
      ...defaultGoblinoidProps,
      behavior: {
        idle: 'The nilbog roams its domain, playing cruel tricks and spreading chaos among goblin communities.',
        eating:
          'It consumes food offered by goblins or scavenges for scraps, often while mocking its providers.',
        hiding:
          'The nilbog uses its magical abilities and small size to evade detection, disappearing into shadows or crowds.',
        tactics:
          'In combat, it uses its aura of chaos to confuse and disrupt enemies, focusing on frustrating attackers. It avoids direct confrontation, relying on its immunity to damage and mischievous tricks to survive.',
      },
    },
  },
  {
    value: 'nothic',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17092-nothic',
      xp: 450,
      tags: ['aberration'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.35 },
        { area: 'cursed', probability: 0.1 },
        { area: 'urban', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Curious and watches from a distance
        nearby: -40, // Aggressively probes for knowledge when close
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['aberration', 'beholder'],
            creatureNames: ['mind flayer', 'beholder'],
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
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The nothic prowls ruins or dungeons, muttering cryptic phrases as it searches for arcane secrets.',
        eating:
          'It feeds on carrion or weak prey, drawn to the magical energy of its surroundings.',
        hiding:
          'The nothic uses shadows and cover to observe intruders, waiting for the right moment to reveal itself.',
        tactics:
          'It uses its Rotting Gaze to weaken enemies, targeting those who appear magically inclined. It prioritizes survival, retreating if the fight turns against it.',
      },
    },
  },
  {
    value: 'oblex spawn',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560891-oblex-spawn',
      xp: 50,
      ...defaultOozeProps,
      sizes: ['tiny'],
      legalAlignments: ['lawful'],
      moralAlignments: ['evil'],
      behavior: {
        idle: 'The oblex spawn slithers through dungeons or dark spaces, searching for memories to absorb.',
        eating:
          'It feeds on the thoughts of creatures, leaving them disoriented or amnesiac.',
        hiding:
          'The spawn uses its gelatinous form to squeeze into small spaces or blend into its surroundings.',
        tactics:
          'It uses its pseudopods to attack and confuse enemies, focusing on extracting memories from weaker foes. It retreats to its parent oblex if threatened.',
      },
    },
  },
  {
    value: 'ochre jelly',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17096-ochre-jelly',
      xp: 450,
      ...defaultOozeProps,
      behavior: {
        idle: 'The ochre jelly slides through caverns, consuming organic material and dissolving debris in its path.',
        eating:
          'It engulfs anything it encounters, breaking down organic matter with its acidic body.',
        hiding:
          'The jelly clings to walls or ceilings, appearing as a harmless patch of slime until prey comes near.',
        tactics:
          'It attacks by engulfing foes, focusing on dissolving their equipment and armor. It splits when struck, overwhelming enemies with its persistence.',
      },
    },
  },
  {
    value: 'orc',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16972-orc',
      xp: 100,
      ...defaultOrcProps,
      behavior: {
        idle: 'The orc sharpens its weapons or prowls its territory, roaring challenges to nearby enemies.',
        eating:
          'It consumes large amounts of meat, feasting on the spoils of raids or hunts.',
        hiding:
          'The orc rarely hides, preferring open confrontation to prove its strength.',
        tactics:
          'In combat, it charges directly at enemies, using brute strength to overpower them. It focuses on the most dangerous-looking foes, fighting relentlessly until defeated.',
      },
    },
  },
  {
    value: 'orc eye of Gruumsh',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://5e.tools/bestiary.html#orc%20eye%20of%20gruumsh_mm',
      xp: 450,
      ...defaultOrcProps,
      behavior: {
        idle: 'The orc eye of Gruumsh performs rituals and prays to Gruumsh, seeking visions and divine power to lead its tribe.',
        eating:
          'It eats hearty meals, often sacrificed to Gruumsh before being consumed.',
        hiding:
          'The eye of Gruumsh does not hide, standing boldly as a symbol of divine might.',
        tactics:
          'In combat, it uses divine magic and brutal attacks to inspire its allies and strike fear into enemies. It targets leaders or spellcasters first, focusing on breaking enemy morale.',
      },
    },
  },
  {
    value: 'orog',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17189-orog',
      xp: 450,
      ...defaultOrcProps,
      behavior: {
        idle: 'The orog patrols its stronghold, constantly training or strategizing for future battles.',
        eating:
          'It eats hearty meals, favoring large portions of meat to fuel its strength.',
        hiding:
          'The orog uses its tactical acumen to position itself advantageously but rarely resorts to outright hiding.',
        tactics:
          'In combat, it uses its superior strength and intelligence to dominate the battlefield, targeting key foes. It fights with discipline and retreats only if it can regroup effectively.',
      },
    },
  },
  {
    value: 'owl',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16974-owl',
      xp: 10,
      ...getDefaultPredatorProps('tiny'),
      areas: [
        { area: 'forest', probability: 0.5 },
        { area: 'grassland', probability: 0.3 },
        { area: 'hill', probability: 0.1 },
        { area: 'coastal', probability: 0.05 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: 10, // Observant and cautious at range
        nearby: -10, // Defensive if cornered or threatened
      },
      tags: ['beast', 'bird'],
      behavior: {
        idle: 'The owl perches silently, observing its surroundings with keen eyes and occasionally swiveling its head.',
        eating:
          'It hunts small creatures, swooping silently to catch prey with its sharp talons.',
        hiding:
          'The owl relies on its nocturnal nature and camouflaged feathers to remain undetected.',
        tactics:
          'In combat, it uses its speed and stealth to strike from above, focusing on quick, decisive attacks. It retreats to higher ground if threatened.',
      },
    },
  },
  {
    value: 'owlbear',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16975-owlbear',
      xp: 700,
      tags: ['monstrosity', 'beast'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.5 },
        { area: 'grassland', probability: 0.2 },
        { area: 'hill', probability: 0.15 },
        { area: 'swamp', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Wary of intruders but not overly aggressive
        nearby: -50, // Extremely territorial and aggressive in close quarters
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['beast', 'monstrosity'],
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
              dietTags: ['mammal', 'bird', 'reptile'],
              dietSizes: getSizesLt('large'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The owlbear prowls its territory, roaring occasionally to ward off intruders and assert its dominance.',
        eating:
          'It hunts large prey, tearing flesh with its beak and claws, often eating on the spot.',
        hiding:
          'The owlbear uses dense forests or caves to conceal its lair, though it does not actively hide while hunting.',
        tactics:
          'In combat, it charges at foes with ferocious swipes and bites, targeting the nearest threat. It fights to the death, especially when defending its territory or young.',
      },
    },
  },
  {
    value: 'panther',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16976-panther',
      xp: 50,
      ...getDefaultPredatorProps('medium'),
      areas: [
        { area: 'forest', probability: 0.5 },
        { area: 'mountain', probability: 0.1 },
        { area: 'grassland', probability: 0.1 },
      ],
      predisposition: {
        distant: -10, // Observant and wary of intruders
        nearby: -40, // Aggressive when threatened or hunting
      },
      behavior: {
        idle: 'The panther prowls its territory, moving silently and observing its surroundings with intense focus.',
        eating:
          'It hunts small to medium-sized prey, using stealth and precision to deliver lethal strikes.',
        hiding:
          'The panther uses its dark fur and agility to blend into shadows or dense foliage.',
        tactics:
          'In combat, it ambushes enemies, leaping from hiding spots to attack vulnerable targets. It retreats if outnumbered, relying on its speed and stealth to escape.',
      },
    },
  },
  {
    value: 'phase spider',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16978-phase-spider',
      xp: 700,
      ...defaultSpiderProps,
      behavior: {
        idle: 'The phase spider lurks in its web or an ethereal plane, waiting for prey to wander near.',
        eating:
          'It catches creatures in its web or ambushes them, paralyzing its prey before feeding.',
        hiding:
          'The phase spider uses its ability to shift to the ethereal plane to remain unseen, waiting for the perfect moment to strike.',
        tactics:
          'In combat, it phases in to attack and retreats to the ethereal plane to avoid retaliation. It targets isolated foes, using its venom to incapacitate them quickly.',
      },
    },
  },
  {
    value: 'piercer',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17191-piercer',
      xp: 100,
      tags: ['monstrosity'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.6 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'mountain', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Lurks in shadows, waiting to ambush
        nearby: -50, // Highly aggressive when prey is directly below
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['monstrosity', 'aberration'],
            moralAlignments: ['neutral'],
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
              dietTags: ['humanoid', 'beast'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The piercer clings motionless to ceilings, appearing as a natural stalactite while waiting for prey to pass below.',
        eating:
          'It drops onto its victim, crushing them and consuming the remains.',
        hiding:
          'The piercer remains motionless, relying on its rocky appearance to avoid detection.',
        tactics:
          'It waits patiently for the perfect moment to drop onto unsuspecting creatures. If it misses, it crawls back to a higher position and waits for another opportunity.',
      },
    },
  },
  {
    value: 'pixie',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17192-pixie',
      xp: 50,
      tags: ['fey'],
      sizes: ['tiny'],
      legalAlignments: ['neutral'],
      moralAlignments: ['good', 'neutral'],
      areas: [
        { area: 'forest', probability: 0.5 },
        { area: 'grassland', probability: 0.2 },
        { area: 'coastal', probability: 0.15 },
        { area: 'cursed', probability: 0.1 },
        { area: 'hill', probability: 0.05 },
      ],
      predisposition: {
        distant: 20, // Observes cautiously from afar, often invisible
        nearby: 10, // Playful and mischievous but rarely hostile
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['fey', 'druid', 'ranger'],
            moralAlignments: ['good', 'neutral'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'fiend'],
            moralAlignments: ['evil'],
          })
        },
      ],
      behavior: {
        idle: 'The pixie flits through forests, giggling softly and spreading magical mischief wherever it goes.',
        eating:
          'It feeds on nectar, berries, and other sweet foods found in the forest.',
        hiding:
          'The pixie uses its invisibility and small size to hide among flowers or foliage.',
        tactics:
          'In combat, it avoids direct confrontation, using its magic to confuse and hinder foes. It prioritizes escape over fighting, relying on its spells to ensure its safety.',
      },
    },
  },
  {
    value: 'giant poisonous snake',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16982-poisonous-snake',
      xp: 25,
      tags: ['beast', 'reptile'],
      sizes: ['tiny'],
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
              dietSizes: getSizesLte('tiny'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The giant poisonous snake coils in a hidden spot, its tongue flicking to sense prey or danger nearby.',
        eating:
          'It hunts small creatures, injecting venom through its fangs to immobilize them before swallowing.',
        hiding:
          'The snake uses its natural camouflage to blend into its surroundings, remaining still to avoid notice.',
        tactics:
          'In combat, it bites with precision, relying on its venom to weaken enemies. It focuses on vulnerable targets and retreats into cover if threatened.',
      },
    },
  },
  {
    value: 'polar bear',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16983-polar-bear',
      xp: 450,
      ...getDefaultPredatorProps('large'),
      areas: [
        { area: 'arctic', probability: 0.7 },
        { area: 'mountain', probability: 0.2 },
      ],
      behavior: {
        idle: 'The polar bear roams icy tundras, sniffing the air and surveying its surroundings for prey or danger.',
        eating:
          'It hunts seals, fish, or other creatures, using its immense strength to overpower them.',
        hiding:
          'The polar bear uses snow and ice to camouflage itself while stalking prey.',
        tactics:
          'In combat, it charges at enemies with its claws and teeth, focusing on the nearest or most immediate threat. It fights fiercely, retreating only if heavily injured.',
      },
    },
  },
  {
    value: 'poltergeist',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17202-poltergeist',
      xp: 450,
      tags: ['undead'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'cursed', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'urban', probability: 0.1 },
        { area: 'forest', probability: 0.05 },
        { area: 'swamp', probability: 0.05 },
      ],
      predisposition: {
        distant: -30, // Harasses and frightens targets at range.
        nearby: -50, // Extremely aggressive and dangerous up close.
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
            tags: ['humanoid', 'celestial'],
            moralAlignments: ['good'],
          })
        },
      ],
      behavior: {
        idle: 'The poltergeist lingers in abandoned places, moving objects and creating eerie sounds to frighten intruders.',
        eating:
          'It does not eat but draws strength from fear and unrest in its surroundings.',
        hiding:
          'The poltergeist becomes invisible or merges with its environment to avoid detection.',
        tactics:
          'In combat, it hurls objects at enemies and uses its invisibility to confuse and evade attackers. It focuses on causing chaos and fear rather than direct harm.',
      },
    },
  },
  {
    value: 'quaggoth',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17193-quaggoth',
      xp: 450,
      ...defaultQuaggothProps,
      behavior: {
        idle: 'The quaggoth patrols its territory, occasionally snarling and scratching at trees to mark its dominance.',
        eating:
          'It consumes raw meat, often from freshly killed prey or scavenged remains.',
        hiding:
          'The quaggoth uses dense forest or rocky terrain to remain hidden, blending into its surroundings with its shaggy fur.',
        tactics:
          'In combat, it charges with claws and brute strength, targeting the nearest or weakest enemy. It fights ferociously but retreats if severely injured.',
      },
    },
  },
  {
    value: 'quaggoth thonot',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17194-quaggoth-thonot',
      xp: 700,
      ...defaultQuaggothProps,
      behavior: {
        idle: 'The quaggoth thonot meditates or murmurs strange prayers, honing its innate psionic abilities.',
        eating:
          'It eats raw meat like other quaggoths but often uses its psionic powers to manipulate prey before consuming it.',
        hiding:
          'The thonot hides among its kin or in dense terrain, using its psychic abilities to obscure its presence.',
        tactics:
          'In combat, it uses its psionics to control the battlefield, focusing on disabling enemies or supporting allies. It avoids direct confrontation, retreating if its powers are insufficient to turn the tide.',
      },
    },
  },
  {
    value: 'quaggoth spore servant',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17182-quaggoth-spore-servant',
      xp: 200,
      ...defaultSporeServantProps,
      behavior: {
        idle: 'The quaggoth spore servant moves sluggishly, following the telepathic commands of its fungal masters.',
        eating:
          'It does not eat but draws energy from the spores animating its body.',
        hiding:
          'It relies on its fungal growths to blend into caves or forests, often appearing as part of the terrain.',
        tactics:
          'It fights without fear or hesitation, clawing relentlessly at enemies. It focuses on spreading its spores to incapacitate foes.',
      },
    },
  },
  {
    value: 'quickling',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17299-quickling',
      xp: 200,
      tags: ['fey'],
      sizes: ['tiny'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'cursed', probability: 0.3 },
        { area: 'swamp', probability: 0.2 },
        { area: 'urban', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Prone to attacking from the shadows with hit-and-run tactics.
        nearby: -50, // Extremely aggressive and difficult to pin down in melee.
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['fey'],
            moralAlignments: ['evil'],
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
      behavior: {
        idle: 'The quickling darts about restlessly, muttering to itself in a high-pitched voice as it explores its surroundings.',
        eating:
          'It consumes small portions of food rapidly, preferring sweet or energy-rich sustenance.',
        hiding:
          'The quickling uses its incredible speed to evade detection, often hiding in plain sight by moving too fast to be seen.',
        tactics:
          'In combat, it uses hit-and-run tactics, striking multiple foes before retreating. It focuses on disrupting enemy formations and avoiding prolonged engagements.',
      },
    },
  },
  {
    value: 'rat',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16991-rat',
      xp: 10,
      ...getDefaultPredatorProps('tiny'),
      areas: [
        { area: 'urban', probability: 0.6 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'forest', probability: 0.05 },
        { area: 'swamp', probability: 0.03 },
        { area: 'grassland', probability: 0.02 },
      ],
      predisposition: {
        distant: 0, // Generally curious but wary
        nearby: -10, // Defensive when cornered or threatened
      },
      behavior: {
        idle: 'The rat scurries through its environment, sniffing for food and occasionally squeaking to communicate.',
        eating:
          'It gnaws on scraps of food, scavenging anything edible, including grains, meat, or garbage.',
        hiding:
          'The rat hides in small crevices or under debris, using its size to avoid predators.',
        tactics:
          'In combat, it bites at enemies, often attacking in swarms to overwhelm foes. It flees quickly if alone or outmatched.',
      },
    },
  },
  {
    value: 'raven',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/16992-raven',
      xp: 10,
      ...getDefaultPredatorProps('tiny'),
      areas: [
        { area: 'forest', probability: 0.5 },
        { area: 'grassland', probability: 0.3 },
        { area: 'hill', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
        { area: 'urban', probability: 0.05 },
      ],
      predisposition: {
        distant: 10, // Observant and cautious from afar
        nearby: -10, // Defensive when threatened or approached too closely
      },
      tags: ['beast', 'bird'],
      behavior: {
        idle: 'The raven perches on a branch or rock, cawing intermittently and observing its surroundings with curiosity.',
        eating:
          'It feeds on seeds, insects, or carrion, often scavenging food from other creatures.',
        hiding:
          'The raven takes flight to avoid danger, retreating to high perches or dense foliage.',
        tactics:
          'In combat, it pecks and flutters to distract or harass foes. It prioritizes escape over sustained fighting.',
      },
    },
  },
  {
    value: 'redcap',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17300-redcap',
      xp: 700,
      tags: ['fey'],
      sizes: ['small'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'cursed', probability: 0.4 },
        { area: 'swamp', probability: 0.2 },
        { area: 'hill', probability: 0.1 },
      ],
      predisposition: {
        distant: -30, // Observes with malevolent intent, waiting for an opportunity to attack.
        nearby: -50, // Aggressive and violent, attacking with no regard for safety.
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['fey'],
            moralAlignments: ['evil'],
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
      behavior: {
        idle: 'The redcap sharpens its oversized scythe, chuckling to itself as it plans its next act of violence.',
        eating:
          'It consumes raw flesh, reveling in the carnage of its victims.',
        hiding:
          'The redcap rarely hides, relying on brute strength and its vicious reputation to intimidate foes.',
        tactics:
          'In combat, it charges headlong into battle, wielding its scythe with reckless abandon. It targets weaker or isolated foes first, showing no mercy.',
      },
    },
  },
  {
    value: 'reflections',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/1240437-reflections',
      xp: 100,
      tags: ['fey'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'cursed', probability: 0.4 },
        { area: 'swamp', probability: 0.2 },
        { area: 'hill', probability: 0.1 },
      ],
      predisposition: {
        distant: -30, // Observes with malevolent intent, waiting for an opportunity to attack.
        nearby: -50, // Aggressive and violent, attacking with no regard for safety.
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['fey'],
            moralAlignments: ['evil'],
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
      behavior: {
        idle: 'The reflections stand still, mimicking the movements of nearby creatures to sow confusion.',
        eating:
          'They do not eat but sustain themselves through magical energy or the essence of their targets.',
        hiding:
          'Reflections remain in shadowy areas or mirror surfaces, blending in with their surroundings.',
        tactics:
          'In combat, they mimic the attacks and abilities of their foes, using this mimicry to disorient and outmatch enemies. They focus on causing as much confusion as possible before retreating.',
      },
    },
  },
  {
    value: 'rust monster',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17001-rust-monster',
      xp: 100,
      tags: ['monstrosity'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.4 },
        { area: 'dungeon', probability: 0.35 },
        { area: 'mountain', probability: 0.15 },
        { area: 'cursed', probability: 0.05 },
        { area: 'swamp', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Generally passive unless drawn to metal.
        nearby: -30, // Aggressively attracted to and consumes metal items.
      },
      allies: [],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['construct', 'humanoid'],
            moralAlignments: ['neutral', 'good'],
          })
        },
      ],
      behavior: {
        idle: 'The rust monster scuttles through dungeons, its antennae twitching as it searches for metal to devour.',
        eating:
          'It feeds on ferrous metals, dissolving armor, weapons, or tools with its corrosive touch.',
        hiding:
          'The rust monster uses shadows and tight spaces to stay hidden, avoiding direct confrontations unless it senses metal.',
        tactics:
          'It targets armored foes first, corroding their equipment to render them vulnerable. It avoids prolonged combat, retreating once it has consumed enough metal.',
      },
    },
  },
  {
    value: 'satyr',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17005-satyr',
      xp: 100,
      tags: ['fey', 'humanoid'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.5 },
        { area: 'hill', probability: 0.3 },
        { area: 'grassland', probability: 0.1 },
        { area: 'coastal', probability: 0.05 },
        { area: 'urban', probability: 0.05 },
      ],
      regions: [{ region: 'Whispering Glade', probability: 1 }],
      predisposition: {
        distant: 10, // Friendly and curious towards visitors.
        nearby: -10, // Playfully mischievous or defensive if their grove is threatened.
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['fey', 'beast'],
            moralAlignments: ['neutral', 'good'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'undead'],
            moralAlignments: ['evil'],
          })
        },
      ],
      behavior: {
        idle: 'The satyr dances through forests, playing music or engaging in playful mischief with creatures it encounters.',
        eating:
          'It eats fruits, nuts, and other forest fare, often drinking fermented beverages when celebrating.',
        hiding:
          'The satyr uses its agility and natural surroundings to evade threats, often hiding in dense foliage or climbing trees.',
        tactics:
          'In combat, it uses its musical abilities to charm or confuse enemies, prioritizing non-lethal tricks over direct confrontation. It focuses on escape if outnumbered.',
      },
    },
  },
  {
    value: 'scout',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/scout',
      xp: 100,
      tags: ['humanoid', 'mercenary'],
      sizes: ['medium'],
      legalAlignments: ['neutral', 'lawful', 'chaotic'],
      moralAlignments: ['neutral', 'good', 'evil'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'swamp', probability: 0.1 },
        { area: 'grassland', probability: 0.3 },
        { area: 'hill', probability: 0.15 },
        { area: 'urban', probability: 0.1 },
        { area: 'mountain', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Observant and cautious, avoids direct confrontation.
        nearby: -30, // Defensive and quick to act when close to threats.
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['ranger', 'mercenary', 'lawEnforcement'],
            moralAlignments: ['good', 'neutral'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['criminal', 'monstrosity', 'undead'],
            moralAlignments: ['evil'],
          })
        },
      ],
      behavior: {
        idle: 'The scout patrols its assigned area, constantly scanning the surroundings for potential threats or opportunities.',
        eating:
          'It eats small rations, often while on the move or during brief rests.',
        hiding:
          'The scout uses natural cover and camouflage to remain unseen, blending into its environment to avoid detection.',
        tactics:
          'In combat, the scout uses its ranged weaponry to strike from a distance, prioritizing high-value targets such as spellcasters or leaders. It retreats to regroup if outnumbered or outmatched.',
      },
    },
  },
  {
    value: 'shadow',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17010-shadow',
      xp: 100,
      tags: ['undead'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'cursed', probability: 0.4 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'underdark', probability: 0.2 },
        { area: 'swamp', probability: 0.05 },
        { area: 'urban', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Lurks and stalks prey from shadows.
        nearby: -50, // Aggressive and deadly in close quarters.
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['undead'],
            creatureNames: ['wraith', 'shadow'],
            moralAlignments: ['evil'],
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
      behavior: {
        idle: 'The shadow lingers in dark places, its form flickering and shifting as it watches silently.',
        eating:
          'It feeds on the life force of living creatures, draining their strength and vitality.',
        hiding:
          'The shadow melds into darkness, becoming almost indistinguishable from its surroundings.',
        tactics:
          'In combat, it targets isolated foes, using its Strength Drain ability to weaken them. It avoids light and retreats into the shadows when threatened.',
      },
    },
  },
  {
    value: 'shadow mastiff',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560913-shadow-mastiff',
      xp: 450,
      tags: ['monstrosity'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'cursed', probability: 0.3 },
        { area: 'underdark', probability: 0.3 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'forest', probability: 0.1 },
        { area: 'urban', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Observes and stalks prey from a distance.
        nearby: -50, // Fiercely aggressive in close combat.
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['undead'],
            creatureNames: ['wraith', 'shadow'],
            moralAlignments: ['evil'],
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
      behavior: {
        idle: 'The shadow mastiff prowls dark areas, growling softly as it stalks intruders.',
        eating:
          'It does not eat in a traditional sense but thrives in environments rich in fear and despair.',
        hiding:
          'The mastiff uses its shadowy form to blend into darkness, making it nearly invisible until it attacks.',
        tactics:
          'In combat, it targets the most vulnerable foes, using its ability to teleport and strike from unexpected angles. It retreats to regroup if the fight turns against it.',
      },
    },
  },
  {
    value: 'shadow mastiff alpha',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560912-shadow-mastiff-alpha',
      xp: 700,
      tags: ['monstrosity'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'cursed', probability: 0.3 },
        { area: 'underdark', probability: 0.3 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'forest', probability: 0.1 },
        { area: 'urban', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Observes and stalks prey from a distance.
        nearby: -50, // Fiercely aggressive in close combat.
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['undead'],
            creatureNames: ['wraith', 'shadow'],
            moralAlignments: ['evil'],
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
      behavior: {
        idle: 'The alpha watches over its pack, issuing silent commands through growls and gestures as it patrols its territory.',
        eating:
          'Like other shadow mastiffs, it does not eat traditionally but thrives on fear and despair.',
        hiding:
          'The alpha uses its enhanced abilities to cloak itself in shadow, making it almost impossible to detect.',
        tactics:
          'It coordinates its pack to attack with precision, focusing on isolating and overwhelming a single target. It prioritizes protecting its pack and retreats only if absolutely necessary.',
      },
    },
  },
  {
    value: 'shrieker',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17013-shrieker',
      xp: 10,
      tags: ['plant'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'cursed', probability: 0.1 },
        { area: 'swamp', probability: 0.1 },
      ],
      predisposition: {
        distant: 0, // Immobile and passive until disturbed.
        nearby: -50, // Aggressively attracts attention with loud noises.
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
        async (_creature: BaseRandomCreatureListItem) => {
          return true
        },
      ],
      behavior: {
        idle: 'The shrieker remains stationary in dark, damp environments, resembling an ordinary fungus until disturbed.',
        eating:
          'It absorbs nutrients from the soil and surrounding organic material, requiring little active feeding.',
        hiding:
          'The shrieker does not actively hide but blends into other fungal growths to avoid attention.',
        tactics:
          'It emits a piercing shriek to alert nearby creatures of intruders, relying on allies to defend it. It has no direct combat abilities.',
      },
    },
  },
  {
    value: 'skulk',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/skulk',
      xp: 100,
      tags: ['humanoid', 'undead'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'cursed', probability: 0.4 },
        { area: 'underdark', probability: 0.3 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'urban', probability: 0.05 },
        { area: 'forest', probability: 0.05 },
      ],
      predisposition: {
        distant: -30, // Elusive and avoids direct encounters.
        nearby: -50, // Aggressive and stealthy in close quarters.
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['undead', 'monstrosity'],
            creatureNames: ['wraith', 'shadow'],
            moralAlignments: ['evil'],
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
      behavior: {
        idle: 'The skulk moves silently through shadows, its pale form nearly invisible in the darkness.',
        eating:
          'It does not eat but survives on the negative emotions it generates in its prey.',
        hiding:
          'The skulk is naturally invisible in dim light or darkness, making it nearly impossible to detect without magic.',
        tactics:
          'In combat, it targets weak or isolated enemies, using its invisibility to remain undetected. It avoids direct confrontation, focusing on ambushes and quick strikes.',
      },
    },
  },
  {
    value: 'slithering tracker',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560918-slithering-tracker',
      xp: 700,
      ...defaultOozeProps,
      moralAlignments: ['evil'],
      legalAlignments: ['chaotic'],
      sizes: ['medium'],
      behavior: {
        idle: 'The slithering tracker glides silently across surfaces, relentlessly pursuing its chosen prey.',
        eating:
          'It absorbs the bodily fluids of its victims, leaving behind a dried husk.',
        hiding:
          'It flattens itself against the ground or walls, becoming nearly indistinguishable from its surroundings.',
        tactics:
          'It waits for the perfect moment to strike, grappling and engulfing its prey to drain their fluids. It focuses on incapacitating one foe at a time and retreats only if severely injured.',
      },
    },
  },
  {
    value: 'spectator',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17094-spectator',
      xp: 700,
      ...defaultBeholderProps,
      behavior: {
        idle: 'The spectator hovers in its assigned location, its many eyes constantly scanning for intruders.',
        eating:
          'It does not eat traditionally but draws energy from the magical force that sustains it.',
        hiding:
          'The spectator does not actively hide but uses its small size and hovering ability to position itself advantageously.',
        tactics:
          'In combat, it uses its eye rays to confuse and attack enemies, focusing on neutralizing threats to its warded area. It prioritizes protecting its assigned location over all else.',
      },
    },
  },
  {
    value: 'specter',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17017-specter',
      xp: 200,
      tags: ['undead'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'cursed', probability: 0.4 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'underdark', probability: 0.1 },
        { area: 'urban', probability: 0.1 },
        { area: 'forest', probability: 0.05 },
        { area: 'swamp', probability: 0.05 },
      ],
      predisposition: {
        distant: -30, // Aggressive and hostile at range.
        nearby: -50, // Extremely dangerous and relentless in close combat.
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
            tags: ['humanoid', 'celestial'],
            moralAlignments: ['good'],
          })
        },
      ],
      behavior: {
        idle: 'The specter drifts through its haunting grounds, its incorporeal form flickering with unearthly light.',
        eating:
          'It feeds on the life force of living creatures, growing stronger with each victim it drains.',
        hiding:
          'The specter melds into walls or shadows, becoming almost invisible until it attacks.',
        tactics:
          'It uses its Life Drain ability to weaken enemies, focusing on isolated or vulnerable targets. It retreats to the safety of darkness if overpowered.',
      },
    },
  },
  {
    value: 'sprite',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17020-sprite',
      xp: 50,
      tags: ['fey'],
      sizes: ['tiny'],
      legalAlignments: ['neutral'],
      moralAlignments: ['good'],
      areas: [
        { area: 'forest', probability: 0.6 },
        { area: 'grassland', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
        { area: 'cursed', probability: 0.05 },
        { area: 'hill', probability: 0.05 },
      ],
      predisposition: {
        distant: 20, // Wary but curious at a distance
        nearby: -10, // Defensive and evasive in close proximity
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['fey', 'druid', 'ranger'],
            moralAlignments: ['good', 'neutral'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'undead'],
            moralAlignments: ['evil'],
            diet: {
              dietTags: ['fey', 'plant'],
              dietSizes: getSizesLt('tiny'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The sprite flutters through its woodland home, observing intruders with wary curiosity and readying its bow.',
        eating:
          'It consumes nectar, berries, and small insects, often foraging during the early morning hours.',
        hiding:
          'The sprite uses its small size and magical invisibility to remain unseen, blending into natural surroundings.',
        tactics:
          'In combat, it uses its bow and poison to incapacitate foes, focusing on defense rather than aggression. It avoids direct combat and flees if overwhelmed.',
      },
    },
  },
  {
    value: 'stirge',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17023-stirge',
      xp: 25,
      tags: ['beast', 'insect'],
      sizes: ['tiny'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'swamp', probability: 0.4 },
        { area: 'forest', probability: 0.3 },
        { area: 'cursed', probability: 0.2 },
        { area: 'underdark', probability: 0.1 },
      ],
      predisposition: {
        distant: -10, // Opportunistic at range, preferring to avoid combat
        nearby: -40, // Aggressive when close to prey
      },
      allies: [],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            moralAlignments: ['good'],
          })
        },
      ],
      behavior: {
        idle: 'The stirge flutters lazily around dark caves or ruins, searching for warm-blooded prey.',
        eating:
          'It latches onto creatures and drains their blood, leaving them weakened or dead.',
        hiding:
          'The stirge clings to ceilings or dark corners, waiting for prey to wander close.',
        tactics:
          'In combat, it targets the closest creature, using its proboscis to attach and drain blood. It retreats if its prey escapes or if it is outnumbered.',
      },
    },
  },
  {
    value: 'swarm of bats',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17028-swarm-of-bats',
      xp: 50,
      tags: ['beast', 'mammal'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'underdark', probability: 0.2 },
        { area: 'urban', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Distrustful of intruders but non-aggressive at range
        nearby: -30, // Aggressive when their roost or swarm is threatened
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['beast', 'fey'],
            creatureNames: ['bat'],
          })
        },
      ],
      enemies: [
        (creature) => {
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
      behavior: {
        idle: 'The swarm flutters restlessly through caves or dense forests, emitting high-pitched squeaks as it navigates.',
        eating:
          'It feeds on insects, small animals, or fruit, depending on the species of bat.',
        hiding:
          'The swarm hides in dark, enclosed spaces like caves or hollow trees during the day.',
        tactics:
          'In combat, the swarm engulfs its enemies, using sheer numbers to harass and disorient. It avoids well-lit areas and disperses if severely threatened.',
      },
    },
  },
  {
    value: 'swarm of insects',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17029-swarm-of-insects',
      xp: 100,
      tags: ['beast', 'insect'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'swamp', probability: 0.3 },
        { area: 'grassland', probability: 0.2 },
        { area: 'dungeon', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Defensive but generally passive at range
        nearby: -50, // Highly aggressive in close proximity when disturbed
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['insect', 'arachnid'],
            creatureNames: ['beetle', 'centipede', 'spider', 'wasp'],
          })
        },
      ],
      enemies: [
        (creature) => {
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
      behavior: {
        idle: 'The swarm moves erratically, skittering over surfaces or buzzing through the air in search of food.',
        eating:
          'It devours organic matter, including plants, carrion, and sometimes living creatures.',
        hiding:
          'The swarm hides in crevices, under leaves, or in dark, damp areas, emerging when disturbed or hungry.',
        tactics:
          'In combat, the swarm overwhelms enemies with numbers, targeting exposed or vulnerable creatures. It retreats only if most of its members are destroyed.',
      },
    },
  },
  {
    value: 'swarm of poisonous snakes',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/swarm-of-poisonous-snakes',
      xp: 450,
      tags: ['beast', 'reptile'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'swamp', probability: 0.4 },
        { area: 'forest', probability: 0.3 },
        { area: 'grassland', probability: 0.15 },
        { area: 'dungeon', probability: 0.1 },
        { area: 'coastal', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Cautiously defensive at range
        nearby: -50, // Extremely aggressive when disturbed
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['reptile'],
            creatureNames: ['snake'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['mammal', 'bird', 'insect'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The swarm coils and writhes as the snakes move together, searching for warmth or prey.',
        eating:
          'It feeds on small creatures or scavenged meat, using venom to immobilize prey before consumption.',
        hiding:
          'The swarm hides in burrows, under debris, or in dense vegetation to avoid predators.',
        tactics:
          'In combat, the swarm bites repeatedly, injecting venom into its enemies. It focuses on creatures that pose the greatest threat and disperses if many snakes are killed.',
      },
    },
  },
  {
    value: 'swarm of rats',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17032-swarm-of-rats',
      xp: 50,
      tags: ['beast', 'mammal'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'urban', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'swamp', probability: 0.1 },
        { area: 'forest', probability: 0.05 },
        { area: 'cursed', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Skittish but opportunistic
        nearby: -30, // Aggressive when cornered or disturbed
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            creatureNames: ['rat'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'plant'],
              dietSizes: getSizesLt('small'),
            },
            moralAlignments: ['good'],
          })
        },
      ],
      behavior: {
        idle: 'The swarm scurries through tunnels or ruins, squeaking and sniffing as it searches for food.',
        eating:
          'It devours scraps, carrion, or anything edible, consuming food quickly with its sheer numbers.',
        hiding:
          'The swarm hides in small spaces like cracks, crevices, or burrows, avoiding detection until it emerges to feed.',
        tactics:
          'In combat, the swarm surrounds enemies, biting and clawing relentlessly. It flees if faced with overwhelming force or fire.',
      },
    },
  },
  {
    value: 'swarm of ravens',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17033-swarm-of-ravens',
      xp: 50,
      tags: ['beast', 'bird'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'urban', probability: 0.3 },
        { area: 'grassland', probability: 0.15 },
        { area: 'mountain', probability: 0.1 },
        { area: 'coastal', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Wary and opportunistic at range
        nearby: -30, // Aggressive in defense of territory or flock
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            creatureNames: ['raven', 'kenku'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            diet: {
              dietTags: ['insect', 'plant'],
              dietSizes: getSizesLt('medium'),
            },
            moralAlignments: ['good'],
          })
        },
      ],
      behavior: {
        idle: 'The swarm of ravens circles high above, cawing loudly or swooping low to investigate disturbances.',
        eating:
          'It feeds on carrion, small animals, or discarded food, scavenging in groups for efficiency.',
        hiding:
          'The swarm roosts in high trees or cliffs, blending into its surroundings until it takes flight.',
        tactics:
          'In combat, the swarm pecks and claws at enemies, focusing on soft targets or isolated individuals. It disperses if faced with significant resistance.',
      },
    },
  },
  {
    value: 'swarm of rot grubs',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560935-swarm-of-rot-grubs',
      xp: 100,
      tags: ['swarm', 'monstrosity', 'insect'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'dungeon', probability: 0.4 },
        { area: 'underdark', probability: 0.3 },
        { area: 'swamp', probability: 0.2 },
        { area: 'cursed', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Non-aggressive unless approached
        nearby: -50, // Extremely aggressive in close proximity, aiming to infest living hosts
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'insect', 'swarm'],
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
      behavior: {
        idle: 'The rot grubs burrow through decaying material, writhing as they feed and multiply.',
        eating:
          'They consume flesh, both living and dead, burrowing into their prey to feed from within.',
        hiding:
          'The swarm hides in corpses or piles of debris, waiting to infest creatures that come too close.',
        tactics:
          'In combat, the swarm attempts to infest and burrow into its enemies, spreading through their bodies. It focuses on incapacitating one target before moving to the next.',
      },
    },
  },
  {
    value: 'thorny vegepygmy',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560938-thorny-vegepygmy',
      xp: 200,
      ...defaultVegepygmyProps,
      behavior: {
        idle: 'The thorny vegepygmy patrols its fungal domain, tending to the plant life and defending its territory.',
        eating:
          'It absorbs nutrients from the soil or decaying organic matter, requiring no active feeding.',
        hiding:
          'The thorny vegepygmy blends into its environment, appearing as part of the surrounding flora.',
        tactics:
          'In combat, it attacks with spiked appendages, focusing on the nearest threat. It fights to protect its territory and will retreat only if all allies are defeated.',
      },
    },
  },
  {
    value: 'tiger',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17036-tiger',
      xp: 200,
      ...getDefaultPredatorProps('large'),
      areas: [
        { area: 'forest', probability: 0.5 },
        { area: 'grassland', probability: 0.3 },
        { area: 'mountain', probability: 0.05 },
        { area: 'swamp', probability: 0.05 },
      ],
      predisposition: {
        distant: -10, // Cautious and observant at range
        nearby: -30, // Aggressive and territorial in close combat
      },
      behavior: {
        idle: 'The tiger prowls its territory, moving silently and observing potential prey from a distance.',
        eating:
          'It hunts large animals, using stealth and powerful attacks to bring down its prey.',
        hiding:
          'The tiger uses its striped coat to blend into dense forests or tall grass, remaining undetected until it strikes.',
        tactics:
          'In combat, it ambushes its prey, leaping from hiding to deliver powerful bites and claw attacks. It retreats if outmatched, relying on its speed and agility.',
      },
    },
  },
  {
    value: 'vegepygmy',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560949-vegepygmy',
      xp: 50,
      ...defaultVegepygmyProps,
      behavior: {
        idle: 'The vegepygmy shuffles quietly through its fungal grove, tending to plants and spreading spores.',
        eating:
          'It absorbs nutrients from decaying organic matter, thriving in humid, dark environments.',
        hiding:
          'The vegepygmy uses its plant-like appearance to blend into its surroundings, avoiding detection until it moves.',
        tactics:
          'In combat, it attacks with simple weapons or claws, focusing on protecting its grove and allies. It avoids prolonged fights, retreating to safety when possible.',
      },
    },
  },
  {
    value: 'vegepygmy chief',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560948-vegepygmy-chief',
      xp: 450,
      ...defaultVegepygmyProps,
      behavior: {
        idle: 'The vegepygmy chief directs its tribe, overseeing the growth of its fungal domain and coordinating defensive efforts.',
        eating:
          'It absorbs nutrients from decaying organic matter, sharing resources with its tribe.',
        hiding:
          'The chief uses its plant-like appearance and dense vegetation to remain hidden, often standing motionless to avoid detection.',
        tactics:
          'In combat, it leads its tribe with strategic precision, targeting the most immediate threats. It prioritizes defending its grove and retreating only if necessary to preserve the tribe.',
      },
    },
  },
  {
    value: 'trapper',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560944-trapper',
      xp: 700,
      tags: ['monstrosity'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.4 },
        { area: 'mountain', probability: 0.2 },
        { area: 'cursed', probability: 0.1 },
      ],
      predisposition: {
        distant: -30, // Lures prey into its disguised form
        nearby: -50, // Aggressively attacks once its trap is sprung
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'ooze'],
            moralAlignments: ['neutral'],
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
              dietTags: ['beast', 'humanoid'],
              dietSizes: getSizesLte('large'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The trapper lies motionless on the ground or walls, blending perfectly with its surroundings to ambush prey.',
        eating:
          'It engulfs creatures that wander too close, dissolving them with its digestive fluids.',
        hiding:
          'The trapper mimics stone or other natural surfaces, remaining undetectable until it moves to attack.',
        tactics:
          'In combat, it lashes out to grapple and engulf its prey, focusing on incapacitating a single target. If threatened, it retreats to a safer position where it can blend in again.',
      },
    },
  },
  {
    value: 'tribal warrior',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17038-tribal-warrior',
      xp: 25,
      tags: ['humanoid'],
      sizes: ['medium'],
      legalAlignments: ['neutral', 'chaotic'],
      moralAlignments: ['neutral', 'good', 'evil'],
      areas: [
        { area: 'forest', probability: 0.3 },
        { area: 'grassland', probability: 0.25 },
        { area: 'hill', probability: 0.2 },
        { area: 'mountain', probability: 0.15 },
        { area: 'coastal', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Defensive at range but not overly aggressive
        nearby: -30, // More aggressive in melee combat
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['humanoid', 'druid', 'ranger'],
            moralAlignments: ['neutral', 'good'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['monstrosity', 'beast'],
            moralAlignments: ['evil'],
            diet: {
              dietTags: ['humanoid'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The tribal warrior sharpens its weapons or patrols the territory, maintaining readiness for potential threats.',
        eating:
          'It eats simple meals of hunted game or gathered plants, often shared communally with the tribe.',
        hiding:
          'The warrior uses natural cover and terrain to conceal its movements, especially when preparing an ambush.',
        tactics:
          'In combat, it fights with discipline and coordination, focusing on defending its tribe and targeting the most dangerous enemies first. It retreats if the tribe’s survival depends on regrouping.',
      },
    },
  },
  {
    value: 'troglodyte',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17204-troglodyte',
      xp: 50,
      tags: ['humanoid', 'reptile'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'mountain', probability: 0.15 },
        { area: 'cursed', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Wary and territorial at range
        nearby: -40, // Highly aggressive in close combat
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'and',
            tags: ['reptile', 'humanoid'],
            moralAlignments: ['evil'],
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
              dietTags: ['humanoid', 'beast'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The troglodyte prowls its dank lair, growling softly and marking its territory with a pungent musk.',
        eating:
          'It devours raw meat, scavenging or hunting for any creature that ventures into its domain.',
        hiding:
          'The troglodyte uses its natural stealth and cavernous surroundings to remain unseen, striking from the shadows when prey approaches.',
        tactics:
          'In combat, it uses its claws and teeth to overwhelm foes, focusing on weaker or isolated targets. It retreats into narrow tunnels if outnumbered.',
      },
    },
  },
  {
    value: 'twig blight',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17095-twig-blight',
      xp: 25,
      ...defaultBlightProps,
      sizes: ['small'],
      behavior: {
        idle: 'The twig blight stands motionless, appearing as an ordinary shrub until disturbed or commanded to move.',
        eating:
          'It absorbs nutrients from the soil and moisture in the air, requiring no active feeding.',
        hiding:
          'The twig blight blends into natural surroundings, its small size and plant-like appearance making it almost invisible.',
        tactics:
          'In combat, it uses its claws to attack, focusing on soft targets. It fights to protect its creator or its grove and retreats if severely outnumbered.',
      },
    },
  },
  {
    value: 'vampiric mist',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560946-vampiric-mist',
      xp: 700,
      tags: ['undead'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'cursed', probability: 0.4 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'underdark', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
      ],
      predisposition: {
        distant: -30, // Actively stalks prey when detected
        nearby: -50, // Extremely aggressive and relentless in close combat
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
            tags: ['humanoid', 'celestial'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['humanoid', 'beast'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The vampiric mist drifts aimlessly through dark, humid environments, seeking the scent of blood.',
        eating:
          'It feeds by draining the blood of living creatures, growing stronger with each victim it consumes.',
        hiding:
          'The mist uses its translucent form to blend into fog or shadows, making it difficult to detect until it attacks.',
        tactics:
          'In combat, it envelops its victims to drain their life force, targeting the weakest or most isolated enemies. It retreats into the shadows if overpowered.',
      },
    },
  },
  {
    value: 'veteran',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17045-veteran',
      xp: 700,
      tags: ['humanoid', 'mercenary'],
      sizes: ['medium'],
      legalAlignments: ['neutral', 'lawful', 'chaotic'],
      moralAlignments: ['good', 'neutral', 'evil'],
      areas: [
        { area: 'urban', probability: 0.4 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'forest', probability: 0.15 },
        { area: 'grassland', probability: 0.15 },
        { area: 'hill', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Strategic at a distance, often observes before engaging
        nearby: -40, // Skilled and aggressive in melee combat
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['mercenary', 'lawEnforcement'],
            legalAlignments: ['lawful', 'neutral'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['criminal', 'mercenary'],
            moralAlignments: ['evil'],
          })
        },
      ],
      behavior: {
        idle: 'The veteran sharpens their weapon or reflects on past battles, staying ever vigilant for new threats.',
        eating:
          'They eat hearty meals, often sharing stories of past exploits with companions during breaks.',
        hiding:
          'The veteran uses their experience to find strategic cover, avoiding unnecessary risks while observing the battlefield.',
        tactics:
          'In combat, they fight with precision and discipline, targeting key threats with calculated strikes. They prioritize protecting allies and maintaining formation over reckless aggression.',
      },
    },
  },
  {
    value: 'vine blight',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17216-vine-blight',
      xp: 100,
      ...defaultBlightProps,
      sizes: ['medium'],
      behavior: {
        idle: 'The vine blight shuffles through dense vegetation, nurturing its plant-based kin and spreading its tendrils.',
        eating:
          'It absorbs nutrients from the soil or through the creatures it ensnares and drains.',
        hiding:
          'The blight uses its vine-covered form to blend seamlessly into forests or overgrown ruins.',
        tactics:
          'In combat, it uses its vines to entangle enemies, focusing on immobilizing the most dangerous threats. It works with allies to overwhelm foes and retreats only if its grove is in jeopardy.',
      },
    },
  },
  {
    value: 'violet fungus',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17046-violet-fungus',
      xp: 50,
      tags: ['plant'],
      sizes: ['medium'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underdark', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'cursed', probability: 0.1 },
        { area: 'swamp', probability: 0.1 },
      ],
      predisposition: {
        distant: -10, // Passive until disturbed
        nearby: -50, // Aggressively attacks when approached
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
        async (_creature: BaseRandomCreatureListItem) => {
          return true
        },
      ],
      behavior: {
        idle: 'The violet fungus stands silently in dark, damp environments, its tendrils swaying gently in the air.',
        eating:
          'It feeds by rotting organic material with its necrotic touch, breaking down creatures that wander too close.',
        hiding:
          'The fungus remains stationary, blending into other fungal growths in its environment.',
        tactics:
          'In combat, it lashes out with its tendrils, targeting the closest enemies and spreading necrotic decay. It relies on its stationary position and environmental camouflage to deter attackers.',
      },
    },
  },
  {
    value: 'water weird',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17208-water-weird',
      xp: 700,
      tags: ['elemental', 'aquatic'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['neutral'],
      areas: [
        { area: 'underwater', probability: 0.4 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'coastal', probability: 0.2 },
        { area: 'swamp', probability: 0.1 },
      ],
      predisposition: {
        distant: -30, // Prefers guarding its territory at a distance
        nearby: -50, // Highly aggressive when an intruder is close
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['elemental', 'aquatic'],
            moralAlignments: ['neutral'],
          })
        },
      ],
      enemies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'beast'],
            moralAlignments: ['good', 'evil'],
          })
        },
      ],
      behavior: {
        idle: 'The water weird lies dormant in a body of water, waiting for intruders or disturbances to rouse it.',
        eating:
          'It does not eat in a traditional sense but draws strength from the magical energy sustaining its form.',
        hiding:
          'The weird becomes indistinguishable from the water around it, remaining invisible until it moves.',
        tactics:
          'In combat, it attempts to drown its enemies by dragging them into the water. It focuses on the nearest threats and retreats to its watery lair if overwhelmed.',
      },
    },
  },
  {
    value: 'wererat',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/wererat',
      xp: 450,
      tags: ['humanoid', 'shapeshifter'],
      sizes: ['medium'],
      legalAlignments: ['lawful'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'urban', probability: 0.5 },
        { area: 'dungeon', probability: 0.3 },
      ],
      predisposition: {
        distant: -20, // Wary and defensive from a distance
        nearby: -40, // Aggressive and territorial when close
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['humanoid', 'shapeshifter'],
            creatureNames: ['rat'],
            moralAlignments: ['neutral', 'evil'],
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
              dietTags: ['humanoid', 'mammal'],
              dietSizes: getSizesLt('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The wererat scurries through its lair, plotting schemes or scavenging for resources.',
        eating:
          'It eats whatever it can find, from fresh kills to scavenged scraps, often hoarding food for later.',
        hiding:
          'The wererat uses its small size and agility to evade detection, slipping into crevices or burrows when pursued.',
        tactics:
          'In combat, it relies on its speed and cunning, targeting weaker foes with hit-and-run tactics. It avoids prolonged fights, retreating to regroup if the battle turns against it.',
      },
    },
  },
  {
    value: 'werewolf',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17057-werewolf',
      xp: 700,
      tags: ['humanoid', 'shapeshifter'],
      sizes: ['medium'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'forest', probability: 0.4 },
        { area: 'urban', probability: 0.3 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'cursed', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Stalks prey and observes from the shadows
        nearby: -50, // Highly aggressive and predatory in close quarters
      },
      allies: [
        async (creature) => {
          return (
            creature.value !== 'giant wolf spider' &&
            (await getRelationshipFilter({
              creature,
              operation: 'or',
              tags: ['humanoid', 'shapeshifter', 'beast'],
              moralAlignments: ['neutral', 'evil'],
              creatureNames: ['wolf'],
            }))
          )
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
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The werewolf prowls its hunting grounds, its instincts constantly on edge for potential prey or rivals.',
        eating:
          'It devours raw flesh, often hunting large animals or attacking humanoid settlements for food.',
        hiding:
          'The werewolf uses its keen senses and agility to remain hidden, relying on stealth until it is ready to strike.',
        tactics:
          'In combat, it charges into battle with claws and teeth, focusing on the most immediate threats. It fights fiercely but retreats if outnumbered, aiming to strike again later.',
      },
    },
  },
  {
    value: 'wight',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17059-wight',
      xp: 700,
      tags: ['undead'],
      sizes: ['medium'],
      legalAlignments: ['lawful'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'cursed', probability: 0.4 },
        { area: 'dungeon', probability: 0.3 },
        { area: 'underdark', probability: 0.2 },
        { area: 'urban', probability: 0.1 },
      ],
      predisposition: {
        distant: -30, // Observes and stalks prey, preparing an ambush
        nearby: -50, // Deadly and relentless in melee combat
      },
      conditions: [
        { condition: 'dim', probability: 0.05 },
        { condition: 'bright', probability: 0 },
      ],
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
            tags: ['humanoid', 'celestial'],
            moralAlignments: ['good'],
            diet: {
              dietTags: ['humanoid'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The wight prowls its haunting grounds, its undead form radiating a cold, malevolent energy.',
        eating:
          'It does not eat but sustains itself by draining the life energy of living creatures.',
        hiding:
          'The wight uses its dark surroundings to blend into shadows, waiting for the opportune moment to strike.',
        tactics:
          'In combat, it uses its Life Drain ability to weaken enemies, focusing on isolated or vulnerable foes. It fights strategically, retreating if it faces overwhelming odds.',
      },
    },
  },
  {
    value: 'will-o-wisp',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17060-will-o-wisp',
      xp: 450,
      tags: ['undead'],
      sizes: ['tiny'],
      legalAlignments: ['chaotic'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'swamp', probability: 0.4 },
        { area: 'cursed', probability: 0.3 },
        { area: 'forest', probability: 0.2 },
        { area: 'dungeon', probability: 0.1 },
      ],
      predisposition: {
        distant: -20, // Lures prey with glowing lights to isolated locations
        nearby: -40, // Aggressive and feeds on life force
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['undead', 'aberration'],
            moralAlignments: ['evil'],
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
      behavior: {
        idle: "The will-o'-wisp drifts through swamps or ruins, its faint glow flickering as it lures wanderers deeper into danger.",
        eating:
          'It feeds on the fear and life energy of creatures, drawing sustenance from their despair.',
        hiding:
          "The will-o'-wisp dims its light and merges with the mist or darkness to remain undetected.",
        tactics:
          'It lures enemies into dangerous terrain or traps, using its Incorporeal Movement to evade attacks. It targets the weakest creatures, draining their life force before moving on.',
      },
    },
  },
  {
    value: 'winged kobold',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17210-winged-kobold',
      xp: 50,
      ...defaultKoboldProps,
      behavior: {
        idle: 'The winged kobold flits between rocks or ledges, scouting for threats or opportunities to scavenge.',
        eating:
          'It consumes insects, small animals, or scraps of food stolen from others.',
        hiding:
          'The kobold uses its wings to reach high perches, staying out of sight until it feels safe to emerge.',
        tactics:
          'In combat, it strikes from above, using its height advantage to drop rocks or attack with weapons. It prioritizes survival, retreating quickly if overwhelmed.',
      },
    },
  },
  {
    value: 'wolf',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17062-wolf',
      xp: 50,
      ...defaultWolfProps,
      behavior: {
        idle: 'The wolf patrols its territory, sniffing the air and howling to communicate with its pack.',
        eating:
          'It hunts in packs, bringing down larger prey and sharing the kill among its members.',
        hiding:
          'The wolf uses dense forests or rocky terrain to stay concealed while stalking its prey.',
        tactics:
          'In combat, it uses pack tactics to surround and overwhelm enemies, focusing on weaker or isolated targets. It retreats if the fight turns against the pack.',
      },
    },
  },
  {
    value: 'worg',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/worg',
      xp: 100,
      tags: ['beast', 'mammal'],
      sizes: ['large'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'forest', probability: 0.35 },
        { area: 'mountain', probability: 0.3 },
        { area: 'grassland', probability: 0.2 },
        { area: 'hill', probability: 0.1 },
        { area: 'swamp', probability: 0.05 },
      ],
      predisposition: {
        distant: -20, // Stalks prey cautiously from a distance
        nearby: -40, // Fiercely aggressive and territorial in close quarters
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['goblinoid', 'beast'],
            creatureNames: ['orc'],
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
              dietTags: ['mammal', 'beast'],
              dietSizes: getSizesLt('large'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The worg prowls its domain, snarling and growling as it asserts dominance over its pack or allied creatures.',
        eating:
          'It feeds on raw meat, often hunting large animals or scavenging kills from other predators.',
        hiding:
          'The worg uses natural cover and its dark fur to blend into its environment, waiting for the perfect moment to strike.',
        tactics:
          'In combat, it targets vulnerable foes, using its strength and cunning to disable them. It fights strategically, retreating to regroup if it encounters overwhelming resistance.',
      },
    },
  },
  {
    value: 'wretched sorrowsworn',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560963-wretched-sorrowsworn',
      xp: 50,
      tags: ['monstrosity'],
      sizes: ['small'],
      legalAlignments: ['neutral'],
      moralAlignments: ['evil'],
      areas: [
        { area: 'cursed', probability: 0.4 },
        { area: 'underdark', probability: 0.3 },
        { area: 'dungeon', probability: 0.2 },
        { area: 'swamp', probability: 0.05 },
        { area: 'forest', probability: 0.05 },
      ],
      predisposition: {
        distant: -30, // Stalks prey relentlessly at range
        nearby: -50, // Driven by sorrow and despair, highly aggressive up close
      },
      allies: [
        (creature) => {
          return getRelationshipFilter({
            creature,
            operation: 'or',
            tags: ['fiend', 'monstrosity'],
            creatureNames: ['shadow'],
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
              dietTags: ['humanoid'],
              dietSizes: getSizesLte('medium'),
            },
          })
        },
      ],
      behavior: {
        idle: 'The wretched sorrowsworn lurks in dark, desolate places, its body trembling as it seeks to feed on despair.',
        eating:
          "It consumes the emotions of fear and sorrow, growing stronger as its victims' despair deepens.",
        hiding:
          'The sorrowsworn uses shadows and its twisted form to blend into the environment, waiting for the perfect moment to attack.',
        tactics:
          'It targets emotionally vulnerable foes, using its powers to amplify their despair and weaken their resolve. It avoids direct combat, relying on its abilities to incapacitate prey.',
      },
    },
  },
  {
    value: 'xvart',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560965-xvart',
      xp: 25,
      ...defaultXvartProps,
      behavior: {
        idle: 'The xvart mutters to itself, scheming or preparing to pilfer from travelers or nearby settlements.',
        eating:
          'It scavenges for food, eating whatever it can find, including scraps and stolen goods.',
        hiding:
          'The xvart hides in caves or dense underbrush, using its small size to remain unnoticed.',
        tactics:
          'In combat, it fights with cunning and numbers, ambushing foes and retreating to regroup when outmatched. It relies on allies to overwhelm enemies.',
      },
    },
  },
  {
    value: 'xvart warlock of raxivort',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560964-xvart-warlock-of-raxivort',
      xp: 200,
      ...defaultXvartProps,
      behavior: {
        idle: 'The xvart warlock communes with the dark power of Raxivort, muttering incantations and directing its minions.',
        eating:
          'It eats small meals, often sacrificed by its followers as offerings to its patron.',
        hiding:
          'The warlock uses its magic to conceal itself, retreating to secure locations when threatened.',
        tactics:
          'In combat, it casts debilitating spells to weaken enemies, focusing on controlling the battlefield. It prioritizes self-preservation, retreating if its allies are defeated.',
      },
    },
  },
  {
    value: 'yuan-ti broodguard',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/2560971-yuan-ti-broodguard',
      xp: 450,
      ...defaultYuanTiProps,
      behavior: {
        idle: 'The yuan-ti broodguard patrols the lair, its serpentine eyes watching for intruders with unblinking intensity.',
        eating:
          'It consumes raw meat provided by its yuan-ti masters, often devouring prey whole.',
        hiding:
          'The broodguard relies on its speed and natural surroundings to evade detection, retreating into dark corners or shadows.',
        tactics:
          'It fights with savage ferocity, using its claws and bite to defend its masters. It prioritizes protecting the yuan-ti above all else, even at the cost of its life.',
      },
    },
  },
  {
    value: 'yuan-ti malison',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17122-yuan-ti-malison',
      xp: 700,
      ...defaultYuanTiProps,
      behavior: {
        idle: 'The yuan-ti malison moves gracefully through its domain, issuing commands to subordinates or meditating on its schemes.',
        eating:
          'It eats raw or lightly cooked meat, savoring the spoils of its conquests or hunts.',
        hiding:
          'The malison uses its cunning and magical abilities to evade detection, often retreating to heavily defended areas when threatened.',
        tactics:
          'In combat, it uses both physical attacks and magic, targeting enemies strategically to disrupt their coordination. It fights intelligently, retreating if the battle turns unfavorable.',
      },
    },
  },
  {
    value: 'yuan-ti pureblood',
    probability: function () {
      return getProbabilityMod(this.props)
    },
    props: {
      url: 'https://www.dndbeyond.com/monsters/17123-yuan-ti-pureblood',
      xp: 200,
      ...defaultYuanTiProps,
      behavior: {
        idle: 'The yuan-ti pureblood blends seamlessly into humanoid societies, gathering information and spreading influence.',
        eating:
          'It eats a varied diet, often mimicking the habits of the society it infiltrates.',
        hiding:
          'The pureblood uses its humanoid guise to hide in plain sight, rarely revealing its true nature unless absolutely necessary.',
        tactics:
          'In combat, it uses deception and magic to manipulate enemies, prioritizing subtlety over brute force. It retreats if its identity is compromised, regrouping to plan a counterattack.',
      },
    },
  },
]
