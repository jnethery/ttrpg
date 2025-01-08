import { getListItemFromKey, evaluateItem } from 'lib/lists/evaluate'
import { setContext } from 'lib/lists/context'
import { DEFAULT_KEY, ListContext } from 'types/lists'

export const generateOutput = async (context: ListContext): Promise<string> => {
  const formattedContext: ListContext = {
    areas: context.areas && context.areas.length ? context.areas : [],
    regions: context.regions && context.regions.length ? context.regions : [],
    conditions:
      context.conditions && context.conditions.length ? context.conditions : [],
    party: context.party ?? {
      avgLevel: 4,
      numPlayers: 4,
      crMultiplier: 1,
    },
    creatureName: context.creatureName,
    useAI: context.useAI ?? false,
  }
  setContext(formattedContext)
  const item = await getListItemFromKey(DEFAULT_KEY)
  return item ? await evaluateItem(item) : ''
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

// Linear interpolation function
lerp(x, x0, x1, y0, y1) =>
  const m = (y1 - y0) / (x1 - x0)
  const b = y0 - m*x0
  return m*x + b

// Main Functions
reset(region) =>
  areas = region ? [region] : ["none"]
  manualEncounterOutput = ''
  update()



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

*/
