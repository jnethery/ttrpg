import { CSSProperties, useState } from 'react'

import { MapSegment, MapMeta, MapSegmentDictionary } from 'types/mapSegments'
import { Tool, toolConfig } from 'types/tools'

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
        destinationSelectedSegmentCoordinateString={
          destinationSelectedSegmentCoordinateString
        }
        meta={meta}
        interimSegmentCoordinateStrings={interimSegmentCoordinateStrings}
        segments={segments}
        selectedSegmentCoordinateString={selectedSegmentCoordinateString}
        setDestinationSegmentCoordinateString={
          setDestinationSelectedSegmentCoordinateString
        }
        setInterimCoordinateStrings={setInterimSegmentCoordinateStrings}
        setSelectedSegmentCoordinateString={setSelectedSegmentCoordinateString}
        tool={selectedTool}
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
