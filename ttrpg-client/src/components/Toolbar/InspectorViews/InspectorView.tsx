import { isSelectedSegmentInspectorProps } from 'utils/InspectorViews/selectedSegmentInspector'
import { useMapContext } from 'hooks/useMapContext'

import {
  SelectedSegmentInspectorProps,
  SelectedSegmentInspector,
} from './SelectedSegmentInspector'

type SomeOtherViewProps = {
  test: string
}

interface InspectorViewProps {
  props: SelectedSegmentInspectorProps | SomeOtherViewProps
}

export const InspectorView: React.FC<InspectorViewProps> = ({ props }) => {
  const { selectedTool } = useMapContext()
  console.log('selectedTool', selectedTool)

  if (selectedTool === 'pointer') {
    if (isSelectedSegmentInspectorProps(props)) {
      const { updateSegment } = props
      return <SelectedSegmentInspector updateSegment={updateSegment} />
    }
  }
  return (
    <div>
      {selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)} inspector
      not implemented
    </div>
  )
}
