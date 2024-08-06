import { isSelectedSegmentInspectorProps } from 'utils/InspectorViews/selectedSegmentInspector'
import { useToolContext } from 'hooks/useToolContext'

import {
  SelectedSegmentInspectorProps,
  SelectedSegmentInspector,
} from './SelectedSegmentInspector'
import { BrushSettingsInspector } from './BrushSettingsInspector'

type SomeOtherViewProps = {
  test: string
}

interface InspectorViewProps {
  props: SelectedSegmentInspectorProps | SomeOtherViewProps
}

export const InspectorView: React.FC<InspectorViewProps> = ({ props }) => {
  const { selectedTool } = useToolContext()

  if (selectedTool === 'pointer') {
    if (isSelectedSegmentInspectorProps(props)) {
      const { updateSegment } = props
      return <SelectedSegmentInspector updateSegment={updateSegment} />
    }
  } else if (selectedTool === 'brush') {
    return <BrushSettingsInspector />
  }
  return (
    <div>
      {selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)} inspector
      not implemented
    </div>
  )
}
