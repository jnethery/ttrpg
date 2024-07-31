import { z } from 'zod'

export const MapContextSchema = z.enum(['world', 'local'])
export type MapContext = z.infer<typeof MapContextSchema>
