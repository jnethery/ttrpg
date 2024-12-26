require('dotenv').config()
const express = require('express')
const cors = require('cors')

import { Request, Response } from 'express'

import { charactersRouter } from 'routes/characters'
import { listsRouter } from 'routes/lists'
import { imagesRouter } from 'routes/images'
import { mapSegmentsRouter } from 'routes/mapSegments'

const app = express()
const PORT = process.env.PORT

if (!PORT) {
  console.error('PORT is not defined in .env')
  process.exit(1)
}

// TODO: Lock this down if you intend on deploying this
app.use(cors())

// Run the server on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (_req: Request, res: Response) => {
  res.send('Greetings, adventurer! Welcome to the TTRPG Server!')
})

app.use(express.json())
app.use('/characters', charactersRouter)
app.use('/lists', listsRouter)
app.use('/images', imagesRouter)
app.use('/mapSegments', mapSegmentsRouter)
