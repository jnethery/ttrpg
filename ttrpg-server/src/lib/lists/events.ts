import OpenAI from 'openai'

import { generateLocation } from 'lib/lists/locations'
import { getListItemFromKey, evaluateItem } from 'lib/lists/evaluate'
import { getContext } from 'lib/lists/context'
import { RandomListItem } from 'types/lists'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

type HappeningListItem = RandomListItem & { props: { type: string } }

const getHappeningStringForPrompt = async (
  happening: null | HappeningListItem,
) => {
  if (happening) {
    if (happening.props.type === 'tracks') {
      return ''
    }
  }

  return '<li>Nothing happens</li>'
}

export const generateEvent = async () => {
  const location = await generateLocation()
  const locationString = await evaluateItem(location)
  const happening = (await getListItemFromKey(
    'event',
  )) as HappeningListItem | null
  const happeningString = happening
    ? await evaluateItem(happening)
    : '<li>Nothing happens</li>'

  // Need to parse this to see what values to pass into the AI
  const eventStringForPrompt = `${locationString}${getHappeningStringForPrompt(happening)}`
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
