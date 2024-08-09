import { DBImage } from 'types/images'

export const getImage = async (id: string): Promise<DBImage | null> => {
  // For now, loading images directly from the filesystem
  const fs = require('fs')
  const path = require('path')
  const imagesDir = path.join(__dirname, '../assets/images')
  // Get tile.png
  const tilePath = path.join(imagesDir, 'tile.png')
  const tile = fs.readFileSync(tilePath)
  return { id: '1234', title: 'tile', data: tile }
}
