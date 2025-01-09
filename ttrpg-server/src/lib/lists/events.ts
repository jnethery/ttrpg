import OpenAI from 'openai'

import { generateLocation } from 'lib/lists/locations'
import { getListItemFromKey, evaluateItem } from 'lib/lists/evaluate'
import { getContext } from 'lib/lists/context'
import { RandomListItem } from 'types/lists'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

type HappeningListItem = RandomListItem & { props: { type: string } }

// const getCombatEncounterPrompt = () => {
//   ;`
//     Summarize this D&D 5E encounter from the perspective of a party of adventurers, narrated like "You see a...",
//     describing the scene: ${result}.
//     ${isHidingAction ? 'do not reveal the presence of the creatures or hint at their existence, but instead describe the scary and tense ambience of the scene.' : ''}
//     ${
//       !isHidingAction
//         ? `
//       Prefer to describe the creatures rather than using their names.
//       Their difficulty and alignment should be implicitly stated, but not explicit.
//       For instance, if a group is 'chaotic evil',
//       they or their actions should be described as a synonym for chaotic,
//       like "frantic", and their morality should be represented by their viciousness.
//     `
//         : ''
//     }
//     It should be 3 sentences at max.
//   `
// }

const getHappeningStringForPrompt = async (
  happening: null | HappeningListItem,
) => {
  // TODO: Parse out the values from the happening to pass into the AI
  if (happening) {
    return await evaluateItem(happening)
  }
  return `<li>Nothing happens</li>`
}

export const generateEvent = async () => {
  const location = await generateLocation()
  const locationString = await evaluateItem(location)
  let locationStringForPrompt = locationString

  for (const key of ['discovery', 'id', 'effect']) {
    const regex = new RegExp(`<li id="location_${key}">[\\s\\S]*?<\\/li>`, 'g')
    locationStringForPrompt = locationStringForPrompt.replace(regex, '')
  }

  const happening = (await getListItemFromKey(
    'event',
  )) as HappeningListItem | null
  const happeningString = happening
    ? await evaluateItem(happening)
    : '<li>Nothing happens</li>'

  // Need to parse this to see what values to pass into the AI
  const eventStringForPrompt = `${locationStringForPrompt}${await getHappeningStringForPrompt(happening)}`
  const eventString = `${locationString}${happeningString}`

  const useAI = getContext()?.useAI ?? false
  if (useAI) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `
            Summarize this D&D 5E encounter from the perspective of a party of adventurers, narrated like "You see a...", 
            describing the scene: ${eventStringForPrompt}. 
            It should be 3 sentences at max using descriptive English at a 7th grade reading level.
          `,
        },
      ],
    })

    return `${eventString}<br/>Location Summary: ${completion.choices[0].message.content}`
  }

  return eventString
}
