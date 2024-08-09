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
  segments,
  refetch,
}: {
  meta: MapMeta
  segments: MapSegmentDictionary
  setSegments: (segments: MapSegmentDictionary) => void
  refetch: () => void
}) {
  const theme = useTheme()
  const style: CSSProperties = {
    display: 'flex',
    gap: theme.spacing(2),
  }

  return (
    <MapProvider meta={meta} segments={segments}>
      <ToolProvider>
        <div style={style}>
          <MapCanvas />
          {/* TODO: Convert the bottom into a collapsible Toolbar component */}
          <Panel
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: theme.spacing(1),
            }}
          >
            <Inspector refetch={refetch}>
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
                  <ToolTile tool={tool} icon={icon} />
                ))}
              </div>
            </Panel>
          </Panel>
        </div>
      </ToolProvider>
    </MapProvider>
  )
}
