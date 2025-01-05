import express, { Request, Response } from 'express'

import { generateOutput } from 'controllers/lists'
import { ListContextSchema, ListContextRequestSchema } from 'types/lists'
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

    const { creatureName, areas, regions, conditions, party } =
      requestValidator.data
    const parsedContext = {
      creatureName,
      areas: areas ? JSON.parse(areas) : undefined,
      regions: regions ? JSON.parse(regions) : undefined,
      conditions: conditions ? JSON.parse(conditions) : undefined,
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

router.get('/creatureList', async (_req: Request, res: Response) => {
  const list = preprocessedCreatures.map((creature) => creature.value)
  res.json(list)
})

export { router as listsRouter }
