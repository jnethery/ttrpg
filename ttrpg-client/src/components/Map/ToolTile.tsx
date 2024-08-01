import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import { Tool } from 'types/tools'
import { colorConfig } from 'types/colors'

import { Tile } from 'components/Layout'

interface ToolTileProps {
  tool: Tool
  icon: IconDefinition
  selectedTool: Tool
  setSelectedTool: (tool: Tool) => void
}

export const ToolTile: FC<ToolTileProps> = ({
  tool,
  icon,
  selectedTool,
  setSelectedTool,
}) => {
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
