import { CSSProperties } from 'react'

import { MapSegment, MapMeta, MapSegmentDictionary } from 'types/mapSegments'
import { toolConfig } from 'types/tools'

import { Panel } from 'components/Layout'
import { Inspector } from 'components/Toolbar'
import { InspectorView } from 'components/Toolbar/InspectorViews/InspectorView'
import { MapCanvas } from './MapCanvas'
import { ToolTile } from './ToolTile'
import { MapProvider } from 'providers/MapProvider'

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
    <MapProvider meta={meta} segments={segments}>
      <div style={style}>
        <MapCanvas />
        {/* TODO: Convert the bottom into a collapsible Toolbar component */}
        <Panel
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
          }}
        >
          <Inspector refetch={refetch}>
            <InspectorView
              props={{
                updateSegment,
              }}
            />
          </Inspector>
          <Panel>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {toolConfig.map(({ tool, icon }) => (
                <ToolTile tool={tool} icon={icon} />
              ))}
            </div>
          </Panel>
        </Panel>
      </div>
    </MapProvider>
  )
}
