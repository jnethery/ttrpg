import React, { createContext, useState } from 'react'

import { MapMeta, MapSegmentDictionary } from 'types/mapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'

type MapContextType = {
  destinationCoordinateString: TwoDimensionalCoordinatesString | null
  interimCoordinateStrings: TwoDimensionalCoordinatesString[]
  meta: MapMeta
  segments: MapSegmentDictionary
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
}

export const MapContext = createContext<MapContextType | undefined>(undefined)

interface MapProviderProps {
  meta: MapMeta
  segments: MapSegmentDictionary
  children: React.ReactNode
}

export const MapProvider: React.FC<MapProviderProps> = ({
  meta,
  segments,
  children,
}) => {
  const [originCoordinateString, setOriginCoordinateString] =
    useState<TwoDimensionalCoordinatesString | null>(null)
  const [destinationCoordinateString, setDestinationCoordinateString] =
    useState<TwoDimensionalCoordinatesString | null>(null)
  const [interimCoordinateStrings, setInterimCoordinateStrings] = useState<
    TwoDimensionalCoordinatesString[]
  >([])

  const value = {
    destinationCoordinateString,
    interimCoordinateStrings,
    meta,
    segments,
    originCoordinateString,
    setDestinationCoordinateString,
    setInterimCoordinateStrings,
    setOriginCoordinateString,
  }

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}
