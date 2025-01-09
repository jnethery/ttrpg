const swamp_sounds = [
  { value: 'croaking frogs', probability: 1 },
  { value: 'buzzing insects', probability: 1 },
  { value: 'splashing water', probability: 0.9 },
  { value: 'chirping crickets', probability: 1 },
  { value: 'rustling reeds', probability: 0.8 },
  { value: 'bird calls', probability: 0.7 },
  { value: 'distant thunder', probability: 0.4 },
  { value: 'gurgling streams', probability: 0.9 },
  { value: 'howling wind', probability: 0.6 },
  { value: 'plopping sounds', probability: 0.8 },
  { value: 'splashing fish', probability: 0.7 },
  { value: 'snapping branches', probability: 0.5 },
  { value: 'low growls', probability: 0.3 },
  { value: 'wing beats', probability: 0.6 },
  { value: 'distant murmurs', probability: 0.4 },
  { value: 'hissing snakes', probability: 0.3 },
  { value: 'dripping water', probability: 1 },
  { value: 'slurping mud', probability: 0.7 },
  { value: 'groaning trees', probability: 0.5 },
  { value: 'chittering rodents', probability: 0.6 },
]

const grassland_sounds = [
  { value: 'rustling grass', probability: 1 },
  { value: 'chirping crickets', probability: 1 },
  { value: 'singing birds', probability: 0.9 },
  { value: 'buzzing bees', probability: 0.8 },
  { value: 'whistling wind', probability: 1 },
  { value: 'lowing cattle', probability: 0.6 },
  { value: 'fluttering wings', probability: 0.7 },
  { value: 'distant thunder', probability: 0.4 },
  { value: 'howling coyotes', probability: 0.3 },
  { value: 'bubbling streams', probability: 0.8 },
  { value: 'galloping hooves', probability: 0.5 },
  { value: 'crunching footsteps', probability: 0.6 },
  { value: 'grassy sways', probability: 0.7 },
  { value: 'insect droning', probability: 1 },
  { value: 'distant whoops', probability: 0.4 },
  { value: 'leaping antelope', probability: 0.5 },
  { value: 'rustling bushes', probability: 0.7 },
  { value: 'morning bird calls', probability: 0.9 },
  { value: 'evening frog croaks', probability: 0.6 },
  { value: 'rolling thunderclaps', probability: 0.3 },
]

const bubbling_sounds = [
  { value: 'gurgling', probability: 1 },
  { value: 'popping', probability: 0.8 },
  { value: 'hissing', probability: 0.9 },
  { value: 'slurping', probability: 0.7 },
  { value: 'squishing', probability: 0.6 },
  { value: 'plopping', probability: 0.8 },
  { value: 'crackling', probability: 0.7 },
  { value: 'snapping', probability: 0.5 },
  { value: 'fizzing', probability: 0.4 },
  { value: 'sizzling', probability: 0.6 },
  { value: 'churning', probability: 0.7 },
  { value: 'dripping', probability: 1 },
  { value: 'spluttering', probability: 0.9 },
  { value: 'gulping', probability: 0.6 },
  { value: 'spurting', probability: 0.5 },
  { value: 'bubbling', probability: 1 },
  { value: 'oozing', probability: 0.7 },
  { value: 'splattering', probability: 0.5 },
  { value: 'squelching', probability: 0.6 },
  { value: 'burbling', probability: 0.8 },
]

const forest_sounds = [
  {
    value: 'The rustling of leaves as the wind moves through the trees',
    probability: 1,
  },
  { value: 'The distant chirping of birds in the canopy', probability: 1 },
  { value: 'The sound of a branch snapping underfoot', probability: 0.9 },
  {
    value: 'The faint creak of trees swaying in the breeze',
    probability: 0.8,
  },
  {
    value: 'The chatter of a squirrel darting between branches',
    probability: 0.7,
  },
  {
    value: 'The rhythmic drumming of a woodpecker in the distance',
    probability: 0.8,
  },
  { value: 'The buzzing of insects hovering nearby', probability: 0.7 },
  { value: 'The soft patter of rain on the forest floor', probability: 0.9 },
  {
    value: 'The occasional croak of a frog in a nearby pond',
    probability: 0.6,
  },
  {
    value: 'The distant howl of a wolf echoing through the forest',
    probability: 0.5,
  },
  {
    value: 'The rustle of small animals moving through the underbrush',
    probability: 1,
  },
  {
    value: 'The soft crunch of leaves as something moves nearby',
    probability: 0.8,
  },
  { value: 'The gentle babble of a nearby stream', probability: 0.9 },
  { value: 'The trill of crickets as dusk approaches', probability: 0.7 },
  { value: 'The distant hoot of an owl', probability: 0.6 },
  {
    value: 'The echo of a falling acorn hitting the forest floor',
    probability: 0.8,
  },
  { value: 'The occasional call of a crow overhead', probability: 0.7 },
  { value: 'The faint hum of bees around a hive', probability: 0.6 },
  {
    value: 'The sound of a deer stepping cautiously through the forest',
    probability: 0.7,
  },
  {
    value: 'The rustling of a snake moving through tall grass',
    probability: 0.5,
  },
  {
    value: 'The distant crash of a tree falling deeper in the woods',
    probability: 0.4,
  },
  { value: 'The flutter of wings as a bird takes flight', probability: 0.9 },
  {
    value: 'The bubbling of a small spring hidden among the trees',
    probability: 0.8,
  },
  {
    value: 'The eerie silence as all forest sounds pause for a moment',
    probability: 0.7,
  },
  {
    value: 'The sharp call of a jay breaking the stillness',
    probability: 0.6,
  },
]

const underdark_sounds = [
  {
    value: 'The faint drip of water echoing through distant caverns',
    probability: 1,
  },
  {
    value: 'The soft rustle of unseen creatures scurrying in the dark',
    probability: 0.9,
  },
  { value: 'The distant rumble of shifting earth or rock', probability: 0.8 },
  { value: 'The eerie hum of glowing fungi', probability: 0.7 },
  {
    value: 'The occasional crack of stone splitting under pressure',
    probability: 0.8,
  },
  {
    value:
      'The sound of a distant, low growl reverberating through the tunnels',
    probability: 0.6,
  },
  {
    value: 'The faint sound of rushing water from an underground river',
    probability: 0.9,
  },
  {
    value: 'The chittering of small creatures echoing off the cavern walls',
    probability: 0.7,
  },
  {
    value: 'A strange, rhythmic tapping sound coming from deep within the dark',
    probability: 0.6,
  },
  {
    value: 'The sudden splash of something falling into a pool of water',
    probability: 0.8,
  },
  {
    value:
      'The unsettling noise of faint whispers that seem to come from nowhere',
    probability: 0.5,
  },
  { value: 'The flutter of leathery wings passing by', probability: 0.7 },
  {
    value: 'The echo of a pebble falling and bouncing into the abyss',
    probability: 0.8,
  },
  { value: 'The faint creak of shifting stalactites above', probability: 0.7 },
  {
    value: 'The sound of bubbling from a nearby sulfurous pool',
    probability: 0.6,
  },
  {
    value: 'A series of faint clicks, like a creature using echolocation',
    probability: 0.7,
  },
  {
    value: 'The sloshing of something moving through shallow water',
    probability: 0.8,
  },
  {
    value: 'The sharp hiss of escaping steam from a nearby vent',
    probability: 0.5,
  },
  { value: 'The scratching of claws against stone', probability: 0.7 },
  { value: 'The faint hum of subterranean air currents', probability: 0.8 },
  { value: 'The distant clang of metal striking stone', probability: 0.6 },
  {
    value: 'The muted roar of a distant waterfall echoing through the darkness',
    probability: 0.9,
  },
  {
    value: 'The soft, wet squelch of something moving nearby',
    probability: 0.7,
  },
  {
    value:
      'A sudden, deep silence as if the world itself is holding its breath',
    probability: 0.8,
  },
  {
    value: 'The distant screech of a creature unknown to you',
    probability: 0.6,
  },
]

const hill_sounds = [
  { value: 'The soft rustle of grass swaying in the breeze', probability: 1 },
  { value: 'The distant call of a hawk circling overhead', probability: 0.9 },
  { value: 'The crunch of loose rocks shifting underfoot', probability: 0.8 },
  { value: 'The faint hum of wind sweeping over the hills', probability: 0.9 },
  { value: 'The occasional bleat of grazing sheep', probability: 0.7 },
  {
    value: 'The echoing bark of a fox from a nearby thicket',
    probability: 0.6,
  },
  { value: 'The whisper of leaves in isolated trees', probability: 0.8 },
  {
    value: 'The chirping of crickets hidden among the grasses',
    probability: 0.7,
  },
  {
    value: 'The distant splash of a brook tumbling downhill',
    probability: 0.9,
  },
  {
    value: 'The faint buzz of insects flitting between wildflowers',
    probability: 0.6,
  },
  {
    value: 'The rustle of a hare darting through the grass',
    probability: 0.7,
  },
  {
    value: 'The low rumble of thunder rolling across the hills',
    probability: 0.5,
  },
  {
    value: 'The soft sigh of a breeze through tall grasses',
    probability: 0.8,
  },
  {
    value: 'The occasional call of a crow perched on a rocky outcrop',
    probability: 0.7,
  },
  {
    value: 'The distant murmur of voices carried on the wind',
    probability: 0.6,
  },
  { value: 'The faint clang of a shepherd’s bell', probability: 0.7 },
  {
    value: 'The chatter of sparrows flitting between bushes',
    probability: 0.6,
  },
  {
    value: 'The sudden trill of a skylark ascending into the air',
    probability: 0.8,
  },
  { value: 'The faint patter of rain on exposed rocks', probability: 0.9 },
  { value: 'The eerie silence before a storm breaks', probability: 0.5 },
  { value: 'The crack of a twig beneath your boot', probability: 0.8 },
  {
    value: 'The howl of wind funneled through narrow valleys',
    probability: 0.6,
  },
  { value: 'The lowing of cattle grazing in the distance', probability: 0.7 },
  {
    value: 'The distant roar of a waterfall hidden in the hills',
    probability: 0.8,
  },
  {
    value: 'The rustle of birds taking flight from a nearby bush',
    probability: 0.7,
  },
]

const coastal_sounds = [
  { value: 'The rhythmic crashing of waves on the shore', probability: 1 },
  { value: 'The cry of seagulls circling overhead', probability: 1 },
  {
    value: 'The soft hiss of seafoam retreating from the sand',
    probability: 0.9,
  },
  { value: 'The distant horn of a ship out at sea', probability: 0.7 },
  { value: 'The chatter of pebbles tumbling in the surf', probability: 0.8 },
  {
    value: 'The rustle of dry seaweed moving with the tide',
    probability: 0.6,
  },
  { value: 'The distant call of seals on a rocky outcrop', probability: 0.7 },
  {
    value: 'The rhythmic creak of a docked boat rocking on the waves',
    probability: 0.8,
  },
  {
    value: 'The faint whisper of wind through dune grasses',
    probability: 0.9,
  },
  {
    value: 'The soft bubbling of a tide pool being replenished',
    probability: 0.7,
  },
  { value: 'The sharp crack of a breaking wave', probability: 0.8 },
  { value: 'The hum of a distant lighthouse horn', probability: 0.6 },
  {
    value: 'The faint slap of waves against the hull of a boat',
    probability: 0.7,
  },
  {
    value: 'The distant chatter of fishermen hauling in their nets',
    probability: 0.6,
  },
  { value: 'The squawk of gulls fighting over a fish', probability: 0.8 },
  { value: 'The steady drip of water from a docked boat', probability: 0.7 },
  { value: 'The crackle of drying seaweed underfoot', probability: 0.9 },
  { value: 'The faint hum of wind across an empty beach', probability: 0.8 },
  {
    value: 'The echo of a distant wave crashing against a cliff',
    probability: 0.7,
  },
  { value: 'The scuttling sound of crabs on the sand', probability: 0.6 },
  { value: 'The clinking of shells tumbling in the surf', probability: 0.8 },
  {
    value: 'The soft plop of a fish jumping out of the water',
    probability: 0.7,
  },
  {
    value: 'The faint murmur of people walking along the shore',
    probability: 0.6,
  },
  {
    value: 'The howl of wind funneled through a rocky crevasse',
    probability: 0.7,
  },
  { value: 'The gentle lap of water against smooth rocks', probability: 0.8 },
]

const crystal_sounds = [
  { value: 'humming', probability: 1 },
  { value: 'resonating', probability: 0.9 },
  { value: 'tinkling', probability: 0.8 },
  { value: 'chiming', probability: 0.7 },
  { value: 'shimmering', probability: 0.8 },
  { value: 'clinking', probability: 0.6 },
  { value: 'ringing', probability: 0.7 },
  { value: 'crackling', probability: 0.5 },
  { value: 'glittering', probability: 0.4 },
  { value: 'crystalline', probability: 0.6 },
  { value: 'echoing', probability: 0.7 },
  { value: 'pinging', probability: 1 },
  { value: 'whistling', probability: 0.9 },
  { value: 'thrumming', probability: 0.6 },
  { value: 'vibrating', probability: 0.5 },
  { value: 'glacial creak', probability: 0.7 },
  { value: 'soft crack', probability: 0.8 },
  { value: 'bell-like', probability: 0.7 },
  { value: 'twinkling', probability: 0.6 },
  { value: 'melodic hum', probability: 0.8 },
]

export default {
  // Regional Sounds
  grassland_sounds,
  swamp_sounds,
  forest_sounds,
  hill_sounds,
  coastal_sounds,
  underdark_sounds,

  // Environmental Sounds
  bubbling_sounds,
  crystal_sounds,
}
