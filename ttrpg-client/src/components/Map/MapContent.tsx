import { CSSProperties } from 'react'
import { useTheme } from '@mui/material/styles'

import { MapMeta, MapSegmentDictionary } from 'types/mapSegments'
import { toolConfig } from 'types/tools'

import { Panel } from 'components/Layout'
import { Inspector } from 'components/Toolbar'
import { InspectorView } from 'components/Toolbar/InspectorViews/InspectorView'
import { MapCanvas } from './MapCanvas'
import { ToolTile } from './ToolTile'
import { MapProvider } from 'providers/MapProvider'
import { ToolProvider } from 'providers/ToolProvider'

export function MapContent({
  meta,
  setMeta,
  segments,
  drawableSegments,
  setSegments,
  setDrawableSegments,
  refetch,
}: {
  meta: MapMeta
  setMeta: React.Dispatch<React.SetStateAction<MapMeta | null>>
  segments: MapSegmentDictionary
  drawableSegments: MapSegmentDictionary | null
  setSegments: React.Dispatch<React.SetStateAction<MapSegmentDictionary | null>>
  setDrawableSegments: React.Dispatch<
    React.SetStateAction<MapSegmentDictionary | null>
  >
  refetch: () => void
}) {
  const theme = useTheme()
  const style: CSSProperties = {
    display: 'flex',
    gap: theme.spacing(2),
  }

  return (
    <MapProvider
      meta={meta}
      setMeta={setMeta}
      refetch={refetch}
      segments={segments}
      drawableSegments={drawableSegments}
      setSegments={setSegments}
      setDrawableSegments={setDrawableSegments}
    >
      <ToolProvider>
        <div style={style}>
          <div style={{ display: 'block', flex: 'none' }}>
            <MapCanvas />
          </div>
          {/* TODO: Convert the bottom into a collapsible Toolbar component */}
          <Panel
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: theme.spacing(1),
            }}
          >
            <Inspector>
              <InspectorView />
            </Inspector>
            <Panel>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing(2),
                }}
              >
                {toolConfig.map(({ tool, icon }) => (
                  <ToolTile key={tool} tool={tool} icon={icon} />
                ))}
              </div>
            </Panel>
          </Panel>
        </div>
      </ToolProvider>
    </MapProvider>
  )
}
