import { z } from 'zod'

import {
  MapMeta,
  MapSegment,
  MapMetaSchema,
  MapSegmentSchema,
} from 'types/mapSegments'

export const MapDataSchema = z.object({
  meta: MapMetaSchema,
  segments: z.array(MapSegmentSchema),
})

export type MapData = {
  meta: MapMeta
  segments: MapSegment[]
}
