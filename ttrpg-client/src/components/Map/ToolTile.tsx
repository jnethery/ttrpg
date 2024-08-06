import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import { Tool } from 'types/tools'
import { colorConfig } from 'types/colors'
import { Tile } from 'components/Layout'
import { useToolContext } from 'hooks/useToolContext'

interface ToolTileProps {
  tool: Tool
  icon: IconDefinition
}

export const ToolTile: FC<ToolTileProps> = ({ tool, icon }) => {
  const { selectedTool, setSelectedTool } = useToolContext()

  return (
    <Tile
      dimensions={{
        height: 50,
        width: 50,
        border: 1,
      }}
      style={{
        borderColor: colorConfig.dark.rgbString,
        borderRadius: 10,
      }}
      children={<FontAwesomeIcon icon={icon} />}
      selectionOptions={
        selectedTool == tool
          ? {
              selected: true,
              selectionStyle: {
                borderColor: colorConfig.primary.rgbString,
              },
            }
          : undefined
      }
      onClick={() => setSelectedTool(tool)}
    />
  )
}
