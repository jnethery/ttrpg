import express, { Request, Response } from 'express'

import { generateOutput } from 'controllers/lists'
import { ListContextSchema, ListContextRequestSchema } from 'types/lists'
import { CreatureTag } from 'types/creatures'
import { getPrecipitationString } from 'types/environmentalConditions'
import { preprocessedCreatures } from 'lib/lists/preprocessedCreatures'
import {
  validateListContext,
  validateListRequestContext,
} from 'utils/validators'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    // Get the query params from the request
    const requestValidator = validateListRequestContext(
      ListContextRequestSchema,
      req.query,
    )
    if (!requestValidator.success) {
      res.status(400).json({ errors: requestValidator.errors })
      return
    }

    const {
      precipitationSize,
      precipitationAmount,
      heat,
      creatureName,
      areas,
      regions,
      conditions,
      party,
      useAI,
    } = requestValidator.data

    const precipitationCondition = getPrecipitationString(
      precipitationSize,
      precipitationAmount,
      heat,
    )
    const parsedConditions = conditions ? JSON.parse(conditions) : []
    if (precipitationCondition) {
      parsedConditions.push(precipitationCondition)
    }

    const parsedContext = {
      creatureName,
      useAI: useAI === 'true',
      areas: areas ? JSON.parse(areas) : undefined,
      regions: regions ? JSON.parse(regions) : undefined,
      conditions: parsedConditions,
      party: party ? JSON.parse(party) : undefined,
    }

    const validator = validateListContext(ListContextSchema, parsedContext)
    if (validator.success) {
      const output = await generateOutput(validator.data)
      res.json(output)
      return
    }
    res.status(400).json({ errors: validator.errors })
  } catch (error) {
    console.error('Error getting output:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/creatureList', async (req: Request, res: Response) => {
  // TODO: Protect this route with schema, but frankly who cares atm
  const { tags } = req.query
  const list = preprocessedCreatures
    .filter((creature) => {
      if (tags) {
        const parsedTags: string[] = JSON.parse(tags as string)
        return parsedTags.every(
          (tag) =>
            creature.props.tags &&
            creature.props.tags.includes(tag as CreatureTag),
        )
      }
    })
    .map((creature) => creature.value)
  res.json(list)
})

export { router as listsRouter }
