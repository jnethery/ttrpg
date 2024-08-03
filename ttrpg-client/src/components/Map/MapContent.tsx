import { CSSProperties, useEffect, useState, useRef } from 'react'

import { MapSegment, MapData, MapSegmentDictionary } from 'types/mapSegments'
import { Tool, toolConfig } from 'types/tools'
import { getLineCoordinates } from 'utils/math'

import { Panel } from 'components/Layout'
import { Inspector } from 'components/Toolbar'
import { InspectorView } from 'components/Toolbar/InspectorViews/InspectorView'
import { MapCanvas } from './MapCanvas'
import { ToolTile } from './ToolTile'

export function MapContent({
  mapData,
  setMapData,
  refetch,
}: {
  mapData: MapData
  setMapData: (mapData: MapData) => void
  refetch: () => void
}) {
  const drawableSegmentsRef = useRef<MapSegmentDictionary | null>(null)
  useEffect(() => {}, [mapData])

  const [selectedTool, setSelectedTool] = useState<Tool>('pointer')
  const [selectedSegment, setSelectedSegment] = useState<MapSegment | null>(
    null,
  )
  const [destinationSelectedSegment, setDestinationSelectedSegment] =
    useState<MapSegment | null>(null)
  // TODO: Refactor this to store coordinates instead of entire segments
  const [interimSegments, setInterimSegments] = useState<MapSegment[]>([])

  const handleClick = (event: React.MouseEvent, segment: MapSegment) => {
    if (selectedTool == 'pointer') {
      if (event.shiftKey) {
        if (
          selectedSegment &&
          !(
            segment.coordinates.x === selectedSegment.coordinates.x &&
            segment.coordinates.y === selectedSegment.coordinates.y
          )
        ) {
          setDestinationSelectedSegment(segment)
        }
      } else {
        setSelectedSegment(segment)
        setDestinationSelectedSegment(null)
      }
    }
  }

  const [lastPaintedSegment, setLastPaintedSegment] =
    useState<MapSegment | null>(null)

  const handleMouseOver = (event: React.MouseEvent, segment: MapSegment) => {
    if (selectedTool == 'brush') {
      if (event.buttons === 0) {
        setLastPaintedSegment(null)
      } else if (event.buttons === 1) {
        if (selectedSegment || destinationSelectedSegment) {
          setSelectedSegment(null)
          setDestinationSelectedSegment(null)
        }
        // TODO: Do this interpolation logic in the Canvas element
        // Make it more sophisticated by drawing a theoretical curve between the last 2 points and the current one,
        // and then finding the segments that lie closest to the intersection with that curve between the last point and the current one
        let interpolatedSegments: MapSegment[] = []
        if (lastPaintedSegment) {
          // Check that the last painted segment is over 1 tile away from the current segment
          if (
            Math.abs(lastPaintedSegment.coordinates.x - segment.coordinates.x) +
              Math.abs(
                lastPaintedSegment.coordinates.y - segment.coordinates.y,
              ) >
            1
          ) {
            const coordinates = getLineCoordinates({
              origin: lastPaintedSegment.coordinates,
              destination: segment.coordinates,
            })
            interpolatedSegments = coordinates
              .map(({ x, y }) => mapData.segments[`${x},${y}`])
              .filter((segment) => segment !== undefined)
          }
        }
        setLastPaintedSegment(segment)
        setInterimSegments([
          ...interimSegments,
          ...interpolatedSegments,
          segment,
        ])
      }
    }
  }

  useEffect(() => {
    if (selectedSegment && destinationSelectedSegment) {
      const coordinates = getLineCoordinates({
        origin: selectedSegment.coordinates,
        destination: destinationSelectedSegment.coordinates,
      })
      const segments = coordinates
        .map(({ x, y }) => mapData.segments[`${x},${y}`])
        .filter((segment) => segment !== undefined)
      setInterimSegments(segments)
      // Handle cases for 0 dx or dy
    } else {
      setInterimSegments([])
    }
  }, [selectedSegment, destinationSelectedSegment, mapData.segments])

  const style: CSSProperties = {
    display: 'flex',
    gap: 10,
  }

  const updateSegment = (segment: MapSegment) => {
    const updatedSegments = {
      ...mapData.segments,
      [`${segment.coordinates.x},${segment.coordinates.y}`]: segment,
    }
    setMapData({
      ...mapData,
      segments: updatedSegments,
    })
  }

  return (
    <div style={style}>
      <MapCanvas
        meta={mapData.meta}
        segments={Object.values(mapData.segments)}
        selectedSegments={[
          selectedSegment,
          destinationSelectedSegment,
          ...interimSegments,
        ].filter((segment) => segment !== null)}
        onClick={handleClick}
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
                meta: mapData.meta,
                selectedSegment,
                destinationSelectedSegment,
                interimSegments,
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
