import { z } from 'zod'

export const ImageSchema = z.object({
  id: z.string(),
  title: z.string(),
  data: z.string(),
})

export type Image = {
  title: string
  data: string
}
export interface DBImage extends Image {
  id: string
}
