import express, { Request, Response } from 'express'

import { getMapSegments } from 'controllers/mapSegments'
import { biomeSettings } from 'config/biomes'

const router = express.Router()

// Test to generate world map
router.get('/', async (_req: Request, res: Response) => {
  try {
    const mapSegments = await getMapSegments(biomeSettings.plains)
    res.json(mapSegments)
  } catch (error) {
    console.error('Error getting mapSegments:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export { router as mapSegmentsRouter }
