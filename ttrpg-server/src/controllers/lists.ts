import { evaluateList } from 'lib/lists/evaluate'

export const generateOutput = () => {
  return evaluateList()
}

// Need to convert all this garbage to TS somehow
/*

// Imports
createInstance = {import:create-instance-plugin}
roll = {import:dice-plugin}
be = {import:be-plugin}
noun = {import:abstract-noun}
adjective = {import:adjective}
adverb = {import:manner-adverb}

// Settings and Variables
config =  {
  areas: ["none"],
  party: {
    avgLevel: 4,
    numPlayers: 4,
  },
  title: "Eternal Song Encounters",
  xpThreshholds: {
    4: {
      easy: 125,
      medium: 250,
      hard: 375,
      deadly: 500,
    },
    20: {
      easy: 2800,
      medium: 5700,
      hard: 8500,
      deadly: 12700,
    }
  },
  getXPMultipliers: {
    1: 1,
    2: 1.5,
    3: 2,
    4: 2,
    7: 2.5,
    11: 3,
    15: 4
  }
}

// XP Functions
// Gets the XP threshhold for the current party level
getXPThreshholdForParty(type) =>
  const { avgLevel } = config.party
  return config?.xpThreshholds?.[avgLevel]?.[type] ?? 0

// Gets the XP multiplier based on the number of creatures in the encounter
getXPMultiplier(numCreatures) =>
  const { getXPMultipliers: multipliers } = config
  for (let key in multipliers) {
    if (numCreatures <= key) return multipliers[key]
  }
  return 4 // Fallback

// Helper Functions
// Function to calculate weights based on a normal distribution
weight(target, current, skew) =>
  // Adjust these parameters to fine-tune the curve
  const variance = (50 - -50) / 8
  const mean = target // Center the distribution around the target
  // Adjust current with skew
  return Math.exp(-Math.pow(current + skew - mean, 2) / (2 * Math.pow(variance, 2)))

// Linear interpolation function
lerp(x, x0, x1, y0, y1) =>
  const m = (y1 - y0) / (x1 - x0)
  const b = y0 - m*x0
  return m*x + b

// Randomly sorts and array
randomizeArray(array) =>
  return array.sort(() => Math.random() - Math.random())

// Main Functions
reset(region) =>
  areas = region ? [region] : ["none"]
  manualEncounterOutput = ''
  update()

getCreaturesToChooseFrom(factionId) =>
  let chosenCreatures = 0
  let creatures = {}
  let creaturesToChooseFrom = []
  const maxCreatures = 1 + Math.floor(Math.random() * 3)

  let encounterXP = 0
  // TODO: Average encounter difficulty should be LOWER depending on the strength of the faction.
  const targetXP = getXPThreshholdForParty(encounterDifficulty.selectOne)
  
  let tries = 0
  const maxTries = 100
  
  // Loop through the units until you get a sufficient amount
  let monsterUnitsPicked = false
  while (!monsterUnitsPicked && tries < maxTries) {
    if (creaturesToChooseFrom.length > maxCreatures) {
      monsterUnitsPicked = true
      continue
    }
    const prospectiveUnitName = unit[factionId].evaluateItem
    const prospectiveUnit = {
      name: prospectiveUnitName,
      xp: unit[factionId][prospectiveUnitName].xp
    }
    // If the creature is individually past the XP threshhold or already picked, exclude
    if (!creaturesToChooseFrom.find(c => c.name == prospectiveUnitName) && prospectiveUnit.xp <= targetXP) {
      creaturesToChooseFrom.push(prospectiveUnit)
    }
    tries++
  }

  let numCreatures = 0
  
  // Iterate throught the list, unit by unit, until either the list is empty of the xp threshhold has been met
  while (encounterXP < targetXP && creaturesToChooseFrom.length > 0) {
    // Randomly sort the list before each loop
    randomizeArray(creaturesToChooseFrom)
    for (const { name, xp } of [...creaturesToChooseFrom]) {
      if (encounterXP > targetXP) {
        continue
      }
      if (!creatures[name]) {
        creatures[name] = { count: 0, base_xp: 0}
      }
      if (!unit[factionId][name].max || !!unit[factionId][name].max && creatures[name].count <= unit[factionId][name].max) {
        creatures[name].count++
        creatures[name].base_xp += xp
        const baseEncounterXP = Object.keys(creatures).reduce((acc, cur) => {
          acc.count += creatures[cur].count
          acc.base_xp += creatures[cur].base_xp
          return acc
        }, { count: 0, base_xp: 0 })
        numCreatures = baseEncounterXP.count
        encounterXP = getXPMultiplier(baseEncounterXP.count) * baseEncounterXP.base_xp
      } else {
        // Remove it from the list
        creaturesToChooseFrom = creaturesToChooseFrom.filter(c => c.name !== name)
      }
    }
  }
  return {
    creatures,
    encounterXP,
    numCreatures
  }
  
generateEncounter(factionId, secondary, creaturesOverride) =>
  reputation = faction[factionId].rep['party']
  skew = faction[factionId].pred

  let { encounterXP, creatures, numCreatures } = creaturesOverride ?? getCreaturesToChooseFrom(factionId)

  if (encounterXP == 0) {
    manualEncounterOutput = [mundane].selectOne
    return manualEncounterOutput
  }

  creatures = Object.keys(creatures).reduce((acc, cur) => {
    acc[cur] = creatures[cur].count
    return acc
  }, {})

  const sentiment = attitude.selectOne
  f = factionId
  const want = wants.selectOne
  const action = secondary ? 'fighting' : doing.selectOne.evaluateItem
  const locationString = `Location: ${area == "none" ? "open field" : area}`
  const flavorString = `Flavor suggestions: ${[adjective]} - ${[adverb]} - ${[noun]}`
  const xpString = `XP: ${encounterXP}`
  
  const encounterString = `
    <li>${locationString}</li>
    <li>${flavorString}</li>
    <li>a group of ${numCreatures} ${factionId.replace('_', ' ').pluralForm}</li>
    <li>${xpString}</li>
    <li>${action}</li>
  `
  const unitsString = `<li>${getUnitsString(factionId, creatures)}</li>`
  const attitudeString = `<li>${sentiment}</li><li>${sentiment.dc <= 0 ? 'willing' : 'unwilling'} to trade</li>`
  const plansToRob = `${sentiment.dc >= 15 && !!want.rob ? ' and will take it from you' : ''}`
  const wantsString = `<li>want ${want}${plansToRob}</li><li>If the party can fulfill their wish, negotiation DC -5 and reputation +1</li>`

  const negotiationTable = `
    <p>Negotiations: </p>
    <table>
      <tr>
        <th>DC Result</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>${sentiment.dc > 0 ? sentiment.dc : "No check needed"}</td>
        <td>Opposes the adventurers’ actions and might take risks to do so.</td>
      </tr>
      <tr>
        <td>${sentiment.dc > -10 ? sentiment.dc + 10 : "No check needed"}</td>
        <td>Offers no help but does no harm.</td>
      </tr>
      <tr>
        <td>${sentiment.dc > -20 ? sentiment.dc + 20 : "No check needed"}</td>
        <td>Does as asked as long as no risks or sacrifices are involved.</td>
      </tr>
      <tr>
        <td>${sentiment.dc > -30 ? sentiment.dc + 30 : "No check needed"}</td>
        <td>Accepts a minor risk or sacrifice to do as asked.</td>
      </tr>
      <tr>
        <td>${sentiment.dc > -40 ? sentiment.dc + 40 : "No check needed"}</td>
        <td>Accepts a significant risk or sacrifice to do as asked.</td>
      </tr>
    </table>
  `

  let combatantEncounterString = ''
  if (action.includes('fighting') && !secondary) {
    const otherFaction = action.split('fighting ')[1].singularForm
    combatantEncounterString = generateEncounter(otherFaction, true)
  }
  
  manualEncounterOutput = `<ul>${[encounterString, unitsString, attitudeString, wantsString].join('')}</ul></p>${negotiationTable}<br/>${combatantEncounterString}`  
  return manualEncounterOutput

getOtherFaction(factionId) =>
  let otherFaction = factionId
  while (otherFaction == factionId) {
    otherFaction = faction.evaluateItem
  }
  return otherFaction
  
getCreatureName(factionId, creature) =>
  return (unit?.[factionId]?.[creature]?.name ?? creature).replaceAll('_', ' ')
  
getUnitsString(factionId, creatures) =>
  const formatCreature = (creature, last) => {
    const numCreatures = creatures[creature]
    const name = getCreatureName(factionId, creature)
    return numCreatures + " " + (last && numCreatures == 1 ? name : name + "(s)")
  }
  const creatureList = Object.keys(creatures)  

  if (creatureList.length > 1) {
    // Insert "and" before the last item
    
    const lastCreature = creatureList.pop()
    return "There are " 
      + creatureList.map(creature => formatCreature(creature)).join(', ') 
      + " and " 
      + formatCreature(lastCreature, true)
  } else {
    // Only one item in the list
    const lastCreature = creatureList.pop()
    return "There " + be() + " " + formatCreature(lastCreature, true)
  }

getNumCreatures(factionId) => 
  const min = faction[factionId].min
  const max = faction[factionId].max
  const str = faction[factionId].str
  const avg = lerp(str, 0, 10, min, max)
  const stdDev = (max - min) / 6
  const numCreatures = Math.ceil((avg - stdDev) + (Math.random() * 2 * stdDev))
  const clampedMax = numCreatures > max ? max : numCreatures
  return clampedMax < min ? min : clampedMax

generateLocation() =>
  const locationName = location.evaluateItem
  const l = createInstance(location[locationName])
  if (!!l.desc) {
    const findBlock = l.find_dc != "none" ?
      `
        <li>to find: DC ${l.find_dc} ${l.find_skill}</li>
        <li>find: ${l.find_desc}</li>
      ` : ''

    const idBlock = l.id_dc != "none" ?
      `
        <li>to id: DC ${l.id_dc} ${l.id_skill}</li>
        <li>id: ${l.id_desc}</li>
      ` : ''
    
    return `
      You discover:
      <ul>
        <li>${locationName}</li>
        <li>${l.desc}</li>
        <li>smell: ${l.smell}</li>
        <li>sound: ${l.sound}</li>
        <li>effect: ${l.effect}</li>
        ${findBlock}
        ${idBlock}
      </ul>
    ` 
  }
  return `You discover a ${l}`
  
generateTracks() =>
  const f = faction.evaluateItem
  const creatures = getCreaturesToChooseFrom(f)
  const c = Object.keys(creatures.creatures)[0] ?? 'old, unidentifiable'

  const trackString = `
    <ul>
      <li>${getCreatureName(f, c)} tracks</li>
      <li> Survival DC ${[dc]} to see moving ${[direction]}</li>
    </ul>
  `

  if (c == "old, unidentfiable") {
    return trackString
  }

  const encounterString = `
    If followed:
    ${generateEncounter(f, false, creatures)}
  `
  return `${trackString}${encounterString}`
  
manualEncounterOutput = ''
output
  [event] ^[manualEncounterOutput.length == 0]
  [manualEncounterOutput] ^[manualEncounterOutput.length > 0]

dc
  {1-30}

distributed_dc
  {1-10} ^2
  {10-15} ^5
  {15-20} ^3
  {20-30}

direction
  north
  northeast
  east
  southeast
  south
  southwest
  west
  northwest

event
  [mundane] ^4
  [generateLocation()] ^2
  [hardship] ^2
  [tracks] ^3
  [encounter] ^1

// Need 5-10 variations
tracks
  [generateTracks()]

encounter
  [generateEncounter(faction.evaluateItem)]

attitude
  hateful ^[weight(-50, reputation, skew)]
    dc=25
  violent^[weight(-40, reputation, skew)]
    dc=20
  hostile ^[weight(-30, reputation, skew)]
    dc=15
  distrustful ^[weight(-20, reputation, skew)]
    dc=10
  wary ^[weight(-10, reputation, skew)]
    dc=5
  neutral ^[weight(0, reputation, skew)]
    dc=0
  cordial ^[weight(10, reputation, skew)]
    dc=-5
  welcoming ^[weight(20, reputation, skew)]
    dc=-10
  friendly ^[weight(30, reputation, skew)]
    dc=-15
  supportive ^[weight(40, reputation, skew)]
    dc=-20
  adoring ^[weight(50, reputation, skew)]
    dc=-25

wants
  to {rest|shelter|have leisure}
  to find [object_wants]
    rob=true
  to {find territory|assert dominance|prove themselves}
    rob=true
  to go somewhere else
  to avoid contact
  to {destroy|kill|take something|take someone}
  to help allies [wants]
  to find {item|place|person|knowledge}

doing
  {in their lair|at their camp}
  {hunting|raiding}
  fighting [getOtherFaction(f).pluralForm]
  {stuck|trapped|hurt}
  {fleeing|lost}
  {patrolling|guarding}
  travelling somewhere else
  exploring

object_wants
  {food|valuables} ^[f != 'ratfolk']
  {tasties|shinies} ^[f == 'ratfolk']

// Factions
// TODO: Add Bullywugs to factions and units to swamp
// Add Centaur faction
// Add Drow faction
// Add Fey factions
// Add plants faction
faction
  ratfolk ^[area == "swamp"]
    str = 4 // Strength, how robust their forces are. range {0, 10}
    rep // Reputation, the relationship they have with the target. range {-50, 50}
      party = -20
      predator = -40
      prey = 0
    pred = 0 // Predisposition, how predisposed they are towards a sentiment. range {-50, 50}
  predator
    str = 9
    rep
      party = -30
      ratfolk = -40
      prey = -40
    pred = -10
  prey
    str = 9
    rep
      party = -20
      ratfolk = -10
      predator = -40
    pred = -10

// Units
// Might want to move this to its own list
unit
  ratfolk
    freak
      xp=1100
    captain
      max=1
      xp=200 // CR 1
    inventor ^2
      xp=100
    scavenger ^5
      xp=50
  predator // Beasts and monsters
    // SWAMP
    giant crocodile ^[area == "swamp"]
      xp=1800
    swarm of poisonous snakes ^[area == "swamp"]
      xp=450
    giant constrictor snake ^[area == "swamp"]
      xp=450
    shadow mastif ^[area == "swamp"]
      xp=450
    giant toad ^[area == "swamp"]
      xp=200
    giant spider ^[area == "swamp"]
      xp=200
    swarm of insects ^[area == "swamp"]
      xp=100
    swarm of wasps ^[area == "swamp"]
      xp=100
    crocodile ^[area == "swamp"]
      xp=100
    swarm of rot grubs ^[area == "swamp"]
      xp=100
    swarm of beetles ^[area == "swamp"]
      xp=100
    swarm of centipedes ^[area == "swamp"]
      xp=100
    swarm of spiders ^[area == "swamp"]
      xp=100
    constrictor snake ^[area == "swamp"]
      xp=50
    giant poisonous snake ^[area == "swamp"]
      xp=50
    giant frog ^[area == "swamp"]
      xp=50
    giant lizard ^[area == "swamp"]
      xp=50
    // CAVE
    
  swarm
    swarm of poisonous snakes ^[area == "swamp"]
      xp=450
    swarm of insects ^[area == "swamp"]
      xp=100
    swarm of wasps ^[area == "swamp"]
      xp=100
    swarm of rot grubs ^[area == "swamp"]
      xp=100
    swarm of beetles ^[area == "swamp"]
      xp=100
    swarm of centipedes ^[area == "swamp"]
      xp=100
    swarm of spiders ^[area == "swamp"]
      xp=100
  prey // Good/small beasts
    // Mountain Goat -> SHOULD BE MOUNTAIN!
    // Sea horse -> Coastal
    // 
    // Unspecific location
    bat
      xp=10
    frog
      xp=10
    hawk
      xp=10
    lizard
      xp=10
    spider
      xp=10
    weasel
      xp=10
    stirge ^[area == "swamp"]
      xp=25
    diseased giant rat ^[area == "swamp"]
      xp=25
    poisonous snake ^[area == "swamp"]
      xp=25
    giant rat ^[area == "swamp"]
      xp=25
    rat ^[area == "swamp"]
      xp=10
    raven ^[area == "swamp"]
      xp=10

mundane
  // Common mundane events
  nothing happens
  nada
  nope
  you feel a stiff breeze

//
// sinking islet - submerges slowly, reveals buried ruins, traps unwary travelers
// ancient stone circle - activates magical effects, channels spirits, marks a leyline
// mud-choked shrine - reveals divine power, curses explorers, holds an ancient artifact
// sunken shipwreck - hides treasure, unleashes ghostly spirits, harbors dangerous creatures
// glowing moss - illuminates surroundings, repels insects, marks a hidden path
// abandoned fisher’s shack - contains useful tools, home to a lurking monster, holds local lore
// tar pit - traps creatures, ignites when exposed to fire, preserves ancient fossils
// skull-covered altar - triggers a curse, grants temporary power, tied to a forgotten deity
// strangling vines - restrict movement, emit a soothing fragrance, house tiny creatures
// floating corpse - a warning of danger, source of disease, holds valuable loot
// misty glade - conceals paths, warps perception, opens into another plane at night
// petrified tree - emits a strange hum, marks an ancient burial site, immovable but unyielding
// blackened clearing - site of a lightning strike, home to unique flora, radiates ominous energy
// weeping willow - emits spectral cries, offers sanctuary, feeds on negative emotions
// abandoned burial mound - conceals treasure, releases spirits, acts as a safe resting place
// collapsed aqueduct - leads to ancient ruins, obstructs paths, stores freshwater
// glimmering fen - creates illusions, attracts adventurers, reveals truth under moonlight
// rotting canoe - floats precariously, holds old maps, collapses under weight
// murky cave - hides a predator, stores relics, echoes unsettling sounds
// drifting lantern - beckons travelers, vanishes abruptly, leads to peril or treasure
// giant snail shell - source of alchemical material, home to aggressive insects, curiously warm
// sunken totem pole - emits energy, reveals ancient secrets, repels supernatural beings
// bloated animal carcass - spreads disease, conceals trinkets, attracts scavengers
// whispering reeds - convey faint voices, hide lurking dangers, point toward ancient sites
// luminous fungi - emit hypnotic glow, induce hallucinations, serve as alchemical ingredients
// eroded stone staircase - leads to ruins, collapses easily, marks a sacred site
//

location
  clearing
  a mummified [unit.predator] hand
  bubbling gas ^[area == "swamp"]
    color
      black
      green
      yellow
      teal
    desc=bubbling swamp slime, colored [this.color]
    smell=[smells.rotting]
    sound=[sounds.bubbling]
    find_dc=none
    id_skill={nature,survival|arcana}
    id_dc=[distributed_dc]
    effects
      {poison|healing} {1-2}d{4|6|8}
      DC [distributed_dc] CON or acquire {bog lung|rot lung} disease for {1-7} days ^[this.getParent.id_skill == "nature,survival"]
      DC [distributed_dc] DEX for half {1-2}d{4|6|8} explosion damage ^[this.getParent.id_skill == "nature,survival"]
      restores {1-3} spell slots of up to level {1-3} ^[this.getParent.id_skill == "arcana"]
    effect=[this.effects.selectOne]
    id_desc
      source of magical power ^[this.getParent.effect.includes("spell slots")]
      seems medicinal ^[this.getParent.effect.includes("healing")]
      seems dangerous ^[this.getParent.effect.includes("poison") || this.getParent.effect.includes("disease") || this.getParent.effect.includes("explosion")]
  tree ^[area == "swamp"]
    desc=a rotting {oak|cypress|willow|mangrove|maple|gum|ash} {tree|stump|log}
    smell=[smells.rotting]
    sound=none
    find_skill=perception,investigation (10 min)
    find_dc=[distributed_dc]
    find_desc={hole near roots|rotted out portion}
    id_skill=nature
    id_dc=[distributed_dc]
    effects
      You find [r = roll('1d100'), individual_treasure_5_10]
      You discover a family of {1-6} [unit.prey](s). It/they want [wants]
      Releases spores. DC [distributed_dc] CON or acquire rot lung for {1-7} days
      Releases a [unit.swarm]
    effect=[this.effects.selectOne]
    id_desc
      a hole where someone has hidden something ^[this.getParent.effect.includes("find")]
      a den ^[this.getParent.effect.includes("family") || this.getParent.effect.includes("Releases a")]
      a sign of disease ^[this.getParent.effect.includes("spores")]
  crystal clear pool ^[area == "swamp"]
    desc=a pool of clear, shimmering water
    smell=like [smells.sweet]
    sound=[sounds.crystal]
    find_dc=none
    id_skill={arcana|nature,survival}
    id_dc=[distributed_dc]
    effects
      A pure, refreshing drink. Relieves thirst and heals you for 1d{4|6} hp
      A portal. This transports you {5-10} miles to the [direction] ^[this.getParent.id_skill == "arcana"]
      A mirage. It's hiding [trinket]. ^[this.getParent.id_skill == "arcana"]
    effect=[this.effects.selectOne]
    id_desc
      drinking water ^[this.getParent.effect.includes("pure")]
      a magical portal ^[this.getParent.effect.includes("portal")]
      an illusion. it contains something. ^[this.getParent.effect.includes("mirage")]
  twisting mangroves ^[area == "swamp"]
    desc=a twisted, thick plot of mangroves
    smell=[smells.swampy]
    sound=[sounds['still water']]
    find_dc=none
    id_dc=[distributed_dc]
    id_skill=survival
    effects
      lost in the mangroves. pass a DC [distributed_dc] Survival check or lose 2 hours.
      turn around. pass a DC [distributed_dc] Survival check or go back one mile in the direction you came from.
      diseased water. pass a DC[distributed_dc] Constitution check or contract {marsh rot|cold sleep} for {1-7} days.
      you pass through with no trouble
    effect=[this.effects.selectOne]
    id_desc
      it looks like it will take a while to navigate ^[this.getParent.effect.includes("lost")]
      it looks like a maze. we will get turned around ^[this.getParent.effect.includes("turn")]
      this water looks stagnant and sickly. ^[this.getParent.effect.includes("diseased")]
      looks harmless ^[this.getParent.effect.includes("pass")]
  
 
hardship
  something bad happens

individual_treasure_5_10
  [roll('4d6') * 100] cp & [roll('1d6') * 10] ep ^[r >= 1 && r <= 30]
  [roll('6d6') * 10] sp & [roll('2d6') * 10] gp ^[r >= 31 && r <= 60]
  [roll('1d6') * 100] ep & [roll('2d6') * 10] gp ^[r >= 61 && r <= 70]
  [roll('4d6') * 10] gp ^[r >= 71 && r <= 95]
  [roll('2d6') * 10] gp & [roll('3d6')] pp ^[r >= 96]

sounds
  still water
    gentle lapping  
    soft rippling  
    distant splashing  
    occasional drip  
    muffled bubbling  
    subtle gurgling  
    quiet sloshing  
    faint trickling  
    sporadic plopping  
    reedy rustling  
    insect buzzing  
    frog croaking  
    fish jumping  
    leaf falling into water  
    water sucking through roots  
    mud squelching  
    distant bird calls  
    hollow echoes  
    low creaking of wood  
    soft hum of wind through reeds
  bubbling
    gurgling  
    popping
    hissing
    slurping
    squishing
    plopping
    crackling 
    snapping
    fizzing
    sizzling 
    churning
    dripping
    spluttering  
    gulping
    spurting
    bubbling
    oozing
    splattering  
    squelching
    burbling
  crystal
    humming  
    resonating  
    tinkling  
    chiming  
    shimmering  
    clinking  
    ringing  
    crackling  
    glittering  
    crystalline  
    echoing  
    pinging  
    whistling  
    thrumming  
    vibrating  
    glacial creak  
    soft crack  
    bell-like  
    twinkling  
    melodic hum

smells
  swampy
    earthy  
    sulfuric  
    briny  
    muddy  
    musty  
    peaty  
    organic  
    damp  
    fishy  
    marshy  
    salty  
    rotten egg  
    decaying leaves  
    stagnant water  
    fermented  
    pungent  
    acrid  
    mossy  
    oceanic  
    silt-like
  sweet
    vanilla  
    lavender  
    citrus  
    jasmine  
    rose  
    mint  
    honeysuckle  
    fresh linen  
    eucalyptus
    pine  
    almond  
    orchid  
    coconut  
    apple blossom  
    lemon balm  
    lilac  
    fresh rainwater  
    gardenia  
    chamomile  
    white tea
  rotting
    sweet
    putrid
    sour
    musty
    rancid
    earthy
    fermented
    moldy
    metallic
    pungent
    cloying
    fishy
    acrid
    stale
    fetid
    smoky
    chemical
    sulfuric
    gamey
    vinegary  

trinket
  a mummified hand  
  a piece of crystal that faintly glows in the moonlight
  a gold coin minted in an unknown land
  a diary written in a language you don’t know
  a brass ring that never tarnishes
  an old chess piece made from glass
  a pair of knucklebone dice, each with a skull symbol on the side that would normally show six pips  
  a small idol depicting a nightmarish creature that gives you unsettling dreams when you sleep near it  
  a rope necklace from which dangles four mummified elf fingers  
  the deed for a parcel of land in a realm unknown to you  
  a 1-ounce block made from an unknown material  
  a small cloth doll skewered with needles  
  a tooth from an unknown beast  
  an enormous scale, perhaps from a dragon  
  a bright green feather  
  an old divination card bearing your likeness  
  a glass orb filled with moving smoke  
  a 1-pound egg with a bright red shell  
  a pipe that blows bubbles  
  a glass jar containing a weird bit of flesh floating in pickling fluid  
  a tiny gnome-crafted music box that plays a song you dimly remember from your childhood  
  a small wooden statuette of a smug halfling  
  a brass orb etched with strange runes  
  a multicolored stone disk  
  a tiny silver icon of a raven  
  a bag containing forty-seven humanoid teeth, one of which is rotten  
  a shard of obsidian that always feels warm to the touch  
  a dragon's bony talon hanging from a plain leather necklace  
  a pair of old socks  
  a blank book whose pages refuse to hold ink, chalk, graphite, or any other substance or marking  
  a silver badge in the shape of a five-pointed star  
  a knife that belonged to a relative  
  a glass vial filled with nail clippings  
  a rectangular metal device with two tiny metal cups on one end that throws sparks when wet  
  a white, sequined glove sized for a human  
  a vest with one hundred tiny pockets  
  a small, weightless stone block  
  a tiny sketch portrait of a [unit.predator] 
  an empty glass vial that smells of perfume when opened  
  a gemstone that looks like a lump of coal when examined by anyone but you  
  a scrap of cloth from an old banner  
  a rank insignia from a lost legionnaire  
  a tiny silver bell without a clapper  
  a mechanical canary inside a gnome-crafted lamp  
  a tiny chest carved to look like it has numerous feet on the bottom  
  a dead sprite inside a clear glass bottle  
  a metal can that has no opening but sounds as if it is filled with liquid, sand, spiders, or broken glass  
  a glass orb filled with water, in which swims a clockwork goldfish  
  a silver spoon with an M engraved on the handle  
  a whistle made from gold-colored wood  
  a dead scarab beetle the size of your hand  
  two toy soldiers, one with a missing head  
  a small box filled with different-sized buttons  
  a candle that can’t be lit  
  a tiny cage with no door  
  an old key  
  an indecipherable treasure map  
  a hilt from a broken sword  
  a rabbit’s foot  
  a glass eye  
  a cameo carved in the likeness of a hideous person  
  a silver skull the size of a coin  
  an alabaster mask  
  a pyramid of sticky black incense that smells very bad  
  a nightcap that, when worn, gives you pleasant dreams  
  a single caltrop made from bone  
  a gold monocle frame without the lens  
  a 1-inch cube, each side painted a different color  
  a crystal knob from a door  
  a small packet filled with pink dust  
  a fragment of a beautiful song, written as musical notes on two pieces of parchment  
  a silver teardrop earring made from a real teardrop  
  the shell of an egg painted with scenes of human misery in disturbing detail  
  a fan that, when unfolded, shows a sleeping cat  
  a set of bone pipes  
  a four-leaf clover pressed inside a book discussing manners and etiquette  
  a sheet of parchment upon which is drawn a complex mechanical contraption  
  an ornate scabbard that fits no blade you have found so far  
  an invitation to a party where a murder happened  
  a bronze pentacle with an etching of a rat's head in its center  
  a purple handkerchief embroidered with the name of a powerful archmage  
  half of a floorplan for a temple, castle, or some other structure  
  a bit of folded cloth that, when unfolded, turns into a stylish cap  
  a receipt of deposit at a bank in a far-flung city  
  a diary with seven missing pages  
  an empty silver snuffbox bearing an inscription on the surface that says 'dreams'  
  an iron holy symbol devoted to an unknown god  
  a book that tells the story of a legendary hero's rise and fall, with the last chapter missing  
  a vial of dragon blood  
  an ancient arrow of elven design  
  a needle that never bends  
  an ornate brooch of dwarven design  
  an empty wine bottle bearing a pretty label that says, 'The Wizard of Wines Winery, Red Dragon Crush, 331422-W'  
  a mosaic tile with a multicolored, glazed surface  
  a petrified mouse  
  a black pirate flag adorned with a dragon's skull and crossbones  
  a tiny mechanical crab or spider that moves about when it’s not being observed  
  a glass jar containing lard with a label that reads, 'Griffon Grease'  
  a wooden box with a ceramic bottom that holds a living worm with a head on each end of its body  
  a metal urn containing the ashes of a hero

encounterDifficulty
  easy ^4
  medium ^3
  hard ^2
  deadly

*/
