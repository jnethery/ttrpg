import express, { Request, Response } from 'express'

import { generateOutput } from 'controllers/lists'
import { preprocessedCreatures } from 'lib/lists/preprocessedCreatures'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const output = await generateOutput()
    res.json(output)
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
