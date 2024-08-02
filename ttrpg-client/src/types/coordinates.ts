import { z } from 'zod'

export const TwoDimensionalCoordinatesSchema = z.object({
  x: z.number(),
  y: z.number(),
})

export const ThreeDimensionalCoordinatesSchema =
  TwoDimensionalCoordinatesSchema.extend({
    z: z.number(),
  })

export type TwoDimensionalCoordinatesString = `${number},${number}`

export type TwoDimensionalCoordinates = z.infer<
  typeof TwoDimensionalCoordinatesSchema
>
export type ThreeDimensionalCoordinates = z.infer<
  typeof ThreeDimensionalCoordinatesSchema
>
