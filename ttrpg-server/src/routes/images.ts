import express, { Request, Response } from 'express'

import { getImage } from 'controllers/images'

const router = express.Router()

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const image = await getImage(id)
    res.json(image)
  } catch (error) {
    console.error('Error getting image:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export { router as imagesRouter }
