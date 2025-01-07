import { generateTracks } from 'lib/lists/tracks'
import { RandomList } from 'types/lists'

/* 
1	0.69%	8.33%	15.97%	Encounter
2-4	10.41%	25%	39.58%	Sign of Encounter
5-6	13.89%	16.67%	19.45%	Hardship
7-8	19.45%	16.67%	13.89%	Location
9-12	55.55%	33.33%	11.2%	Nothing
*/

/*
 * Mundane -
 *    Mundane events can build atmosphere or contribute to a landscape,
 *    but ultimately do not require the party to do anything.
 * Location -
 *    Location events are areas where there is a special location,
 *    some sort of unique interaction, such as discovering a magic pool, or a cave for shelter.
 * Hardship -
 *    Hardships are weather events and problems such as wagon wheels breaking or an animal stealing supplies.
 * Tracks -
 *    Tracks indicate that there is an encounter nearby, and reveals the nature of the encounter.
 *    All encounters should be surrounded by at least one set of tracks in a surrounding tile.
 * Encounter -
 *    This is where you will find either friends of foes in the world.
 */

export const event: RandomList = [
  { value: '[mundane]', probability: 4 / 12, debug: true },
  { value: '[hardship]', probability: 2 / 12 },
  { value: generateTracks, probability: 3 / 12 },
  { value: '[encounter]', probability: 1 / 12 },
]
