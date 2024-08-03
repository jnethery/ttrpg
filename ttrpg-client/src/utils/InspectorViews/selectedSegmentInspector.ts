import { SelectedSegmentInspectorProps } from 'components/Toolbar/InspectorViews/SelectedSegmentInspector'

export const isSelectedSegmentInspectorProps = (
  props: unknown,
): props is SelectedSegmentInspectorProps => {
  return (
    (props as SelectedSegmentInspectorProps).meta !== undefined &&
    (props as SelectedSegmentInspectorProps).selectedSegment !== undefined &&
    (props as SelectedSegmentInspectorProps).destinationSelectedSegment !==
      undefined &&
    (props as SelectedSegmentInspectorProps).interimSegments !== undefined &&
    (props as SelectedSegmentInspectorProps).updateSegment !== undefined
  )
}
