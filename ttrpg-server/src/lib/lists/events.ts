import OpenAI from 'openai'

import { generateLocation } from 'lib/lists/locations'
import { getEvaluatedListItemFromKey, evaluateItem } from 'lib/lists/evaluate'
import { getContext } from 'lib/lists/context'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generateEvent = async () => {
  const location = await generateLocation()
  const locationString = await evaluateItem(location)
  const event = await getEvaluatedListItemFromKey('event')

  // Need to parse this to see what values to pass into the AI
  const eventString = `${locationString}${event}`

  const useAI = getContext()?.useAI ?? false
  if (useAI) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `
            Summarize this D&D 5E encounter from the perspective of a party of adventurers, narrated like "You see a...", 
            describing the scene: ${eventString}. 
            It should be 3 sentences at max using descriptive English at a 7th grade reading level.
          `,
        },
      ],
    })

    return `${eventString}<br/>Location Summary: ${completion.choices[0].message.content}`
  }

  return eventString
}
