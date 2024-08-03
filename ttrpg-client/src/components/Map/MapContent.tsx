import { CSSProperties, useEffect, useState } from 'react'

import { MapSegment, MapMeta, MapSegmentDictionary } from 'types/mapSegments'
import { Tool, toolConfig } from 'types/tools'
import { getLineCoordinates, calculateLinearDistance } from 'utils/math'

import { Panel } from 'components/Layout'
import { Inspector } from 'components/Toolbar'
import { InspectorView } from 'components/Toolbar/InspectorViews/InspectorView'
import { MapCanvas } from './MapCanvas'
import { ToolTile } from './ToolTile'
import { TwoDimensionalCoordinatesString } from 'types/coordinates'

export function MapContent({
  meta,
  segments,
  setSegments,
  refetch,
}: {
  meta: MapMeta
  segments: MapSegmentDictionary
  setSegments: (segments: MapSegmentDictionary) => void
  refetch: () => void
}) {
  const [selectedTool, setSelectedTool] = useState<Tool>('pointer')
  const [selectedSegmentCoordinateString, setSelectedSegmentCoordinateString] =
    useState<TwoDimensionalCoordinatesString | null>(null)
  const [
    destinationSelectedSegmentCoordinateString,
    setDestinationSelectedSegmentCoordinateString,
  ] = useState<TwoDimensionalCoordinatesString | null>(null)
  const [interimSegmentCoordinateStrings, setInterimSegmentCoordinateStrings] =
    useState<TwoDimensionalCoordinatesString[]>([])

  const [
    lastPaintedSegmentCoordinateString,
    setLastPaintedSegmentCoordinateString,
  ] = useState<TwoDimensionalCoordinatesString | null>(null)

  // TODO: Remove this once it's handled in the canvas
  const handleMouseOver = (event: React.MouseEvent, segment: MapSegment) => {
    if (selectedTool == 'brush') {
      if (event.buttons === 0) {
        setLastPaintedSegmentCoordinateString(null)
      } else if (event.buttons === 1) {
        if (
          selectedSegmentCoordinateString ||
          destinationSelectedSegmentCoordinateString
        ) {
          // setSelectedSegment(null)
          // setDestinationSelectedSegment(null)
        }
        // TODO: Do this interpolation logic in the Canvas element
        // Make it more sophisticated by drawing a theoretical curve between the last 2 points and the current one,
        // and then finding the segments that lie closest to the intersection with that curve between the last point and the current one
        let interpolatedSegments: TwoDimensionalCoordinatesString[] = []
        if (lastPaintedSegmentCoordinateString) {
          // Check that the last painted segment is over 1 tile away from the current segment
          if (
            calculateLinearDistance(
              lastPaintedSegmentCoordinateString,
              segment.coordinates,
            ) > 1
          ) {
            const coordinates = getLineCoordinates({
              origin: lastPaintedSegmentCoordinateString,
              destination: segment.coordinates,
            })
            interpolatedSegments = coordinates
              .map(({ x, y }) => segments[`${x},${y}`])
              .filter((segment) => segment !== undefined)
              .map(
                (segment) =>
                  `${segment.coordinates.x},${segment.coordinates.y}` as TwoDimensionalCoordinatesString,
              )
          }
        }
        setLastPaintedSegmentCoordinateString(
          `${segment.coordinates.x},${segment.coordinates.y}`,
        )
        setInterimSegmentCoordinateStrings([
          ...interimSegmentCoordinateStrings,
          ...interpolatedSegments,
          `${segment.coordinates.x},${segment.coordinates.y}`,
        ])
      }
    }
  }

  // TODO: Move this into the canvas util
  useEffect(() => {
    if (
      selectedSegmentCoordinateString &&
      destinationSelectedSegmentCoordinateString
    ) {
      const coordinates = getLineCoordinates({
        origin: selectedSegmentCoordinateString,
        destination: destinationSelectedSegmentCoordinateString,
      })
      const newSegments = coordinates
        .map(({ x, y }) => segments[`${x},${y}`])
        .filter((segment) => segment !== undefined)
        .map(
          (segment) =>
            `${segment.coordinates.x},${segment.coordinates.y}` as TwoDimensionalCoordinatesString,
        )
      setInterimSegmentCoordinateStrings(newSegments)
    } else {
      setInterimSegmentCoordinateStrings([])
    }
  }, [
    selectedSegmentCoordinateString,
    destinationSelectedSegmentCoordinateString,
    segments,
  ])

  const style: CSSProperties = {
    display: 'flex',
    gap: 10,
  }

  const updateSegment = (segment: MapSegment) => {
    const updatedSegments = {
      ...segments,
      [`${segment.coordinates.x},${segment.coordinates.y}`]: segment,
    }
    setSegments(updatedSegments)
  }

  return (
    <div style={style}>
      <MapCanvas
        tool={selectedTool}
        meta={meta}
        segments={segments}
        setDestinationSegmentCoordinateString={
          setDestinationSelectedSegmentCoordinateString
        }
        setSelectedSegmentCoordinateString={setSelectedSegmentCoordinateString}
        onMouseOver={handleMouseOver}
      />
      {/* TODO: Convert the bottom into a collapsible Toolbar component */}
      <Panel
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
        }}
      >
        <Inspector
          refetch={refetch}
          inspectorView={
            <InspectorView
              tool={selectedTool}
              props={{
                meta,
                selectedSegment: selectedSegmentCoordinateString
                  ? segments[selectedSegmentCoordinateString]
                  : null,
                destinationSelectedSegment:
                  destinationSelectedSegmentCoordinateString
                    ? segments[destinationSelectedSegmentCoordinateString]
                    : null,
                interimSegments: interimSegmentCoordinateStrings.map(
                  (coordinateString) => segments[coordinateString],
                ),
                updateSegment,
              }}
            />
          }
        />
        <Panel>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {toolConfig.map(({ tool, icon }) => (
              <ToolTile
                tool={tool}
                icon={icon}
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
              />
            ))}
          </div>
        </Panel>
      </Panel>
    </div>
  )
}
