import React, { createContext, useState } from 'react'

import { MapMeta, MapSegment, MapSegmentDictionary } from 'types/mapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'

type MapContextType = {
  inspectedSegment: MapSegment | null
  destinationCoordinateString: TwoDimensionalCoordinatesString | null
  interimCoordinateStrings: TwoDimensionalCoordinatesString[]
  meta: MapMeta
  refetch: () => void
  segments: MapSegmentDictionary
  setSegments: React.Dispatch<React.SetStateAction<MapSegmentDictionary | null>>
  originCoordinateString: TwoDimensionalCoordinatesString | null
  setDestinationCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setInterimCoordinateStrings: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString[]>
  >
  setOriginCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setInspectedSegment: React.Dispatch<React.SetStateAction<MapSegment | null>>
}

export const MapContext = createContext<MapContextType | undefined>(undefined)

interface MapProviderProps {
  meta: MapMeta
  refetch: () => void
  segments: MapSegmentDictionary
  setSegments: React.Dispatch<React.SetStateAction<MapSegmentDictionary | null>>
  children: React.ReactNode
}

export const MapProvider: React.FC<MapProviderProps> = ({
  meta,
  refetch,
  segments,
  setSegments,
  children,
}) => {
  const [inspectedSegment, setInspectedSegment] = useState<MapSegment | null>(
    null,
  )
  const [originCoordinateString, setOriginCoordinateString] =
    useState<TwoDimensionalCoordinatesString | null>(null)
  const [destinationCoordinateString, setDestinationCoordinateString] =
    useState<TwoDimensionalCoordinatesString | null>(null)
  const [interimCoordinateStrings, setInterimCoordinateStrings] = useState<
    TwoDimensionalCoordinatesString[]
  >([])

  const value = {
    refetch,
    destinationCoordinateString,
    inspectedSegment,
    interimCoordinateStrings,
    meta,
    originCoordinateString,
    setSegments,
    segments,
    setDestinationCoordinateString,
    setInspectedSegment,
    setInterimCoordinateStrings,
    setOriginCoordinateString,
  }

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}
