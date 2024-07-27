import express, { Request, Response } from 'express'

import { getMapSegments } from 'controllers/mapSegments'

const router = express.Router()

// Test to generate world map
router.get('/', async (_req: Request, res: Response) => {
  try {
    const mapSegments = await getMapSegments()
    res.json(mapSegments)
  } catch (error) {
    console.error('Error getting mapSegments:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export { router as mapSegmentsRouter }
