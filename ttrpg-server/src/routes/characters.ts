import express, { Request, Response } from 'express'

import {
  createCharacter,
  getCharacter,
  getCharacters,
  updateCharacter,
} from 'controllers/characters'
import { CreateCharacterSchema, UpdateCharacterSchema } from 'types/characters'
import { validateCharacter } from 'utils/validators'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const characters = await getCharacters()
    res.json(characters)
  } catch (error) {
    console.error('Error getting characters:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const character = await getCharacter(id)
    res.json(character)
  } catch (error) {
    console.error('Error getting character:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const validator = validateCharacter(CreateCharacterSchema, req.body)
    if (validator.success) {
      const newCharacter = await createCharacter(validator.data)
      return res.status(201).json(newCharacter)
    }
    res.status(400).json({ errors: validator.errors })
  } catch (error) {
    console.error('Error creating character:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const validator = validateCharacter(UpdateCharacterSchema, req.body)
    if (validator.success) {
      const updatedCharacter = await updateCharacter(id, validator.data)
      if (!updatedCharacter) {
        return res.status(404).json({ error: 'Character not found' })
      }
      return res.status(200).json(updatedCharacter)
    }
    res.status(400).json({ errors: validator.errors })
  } catch (error) {
    console.error('Error updating character:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export { router as charactersRouter }
