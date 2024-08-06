import React, { createContext, useState } from 'react'

import { MapMeta, MapSegmentDictionary } from 'types/mapSegments'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'

type MapContextType = {
  destinationSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  interimCoordinateStrings: TwoDimensionalCoordinatesString[]
  meta: MapMeta
  segments: MapSegmentDictionary
  selectedSegmentCoordinateString: TwoDimensionalCoordinatesString | null
  setDestinationSegmentCoordinateString: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString | null>
  >
  setInterimCoordinateStrings: React.Dispatch<
    React.SetStateAction<TwoDimensionalCoordinatesString[]>
  >
  setSelectedSegmentCoordinateString: React.Dispatch<
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
  const [selectedSegmentCoordinateString, setSelectedSegmentCoordinateString] =
    useState<TwoDimensionalCoordinatesString | null>(null)
  const [
    destinationSegmentCoordinateString,
    setDestinationSegmentCoordinateString,
  ] = useState<TwoDimensionalCoordinatesString | null>(null)
  const [interimCoordinateStrings, setInterimCoordinateStrings] = useState<
    TwoDimensionalCoordinatesString[]
  >([])

  const value = {
    destinationSegmentCoordinateString,
    interimCoordinateStrings,
    meta,
    segments,
    selectedSegmentCoordinateString,
    setDestinationSegmentCoordinateString,
    setInterimCoordinateStrings,
    setSelectedSegmentCoordinateString,
  }

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}
