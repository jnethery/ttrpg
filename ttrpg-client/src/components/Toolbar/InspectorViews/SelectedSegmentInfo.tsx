import React, { CSSProperties, useEffect } from 'react'
import { useFormik } from 'formik'

import { MapSegment } from 'types/mapSegments'

const getValues = (segment: MapSegment | null) => {
  return {
    waterDepth: segment?.waterDepth.toString() ?? '',
  }
}

export const SelectedSegmentInfo: React.FC<{
  title: string
  segment: MapSegment | null
  updateSegment: (segment: MapSegment) => void
}> = ({ title, segment, updateSegment }) => {
  const formik = useFormik({
    initialValues: getValues(segment),
    enableReinitialize: true,
    onSubmit: (values) => {
      if (segment) {
        updateSegment({
          ...segment,
          waterDepth: parseFloat(values.waterDepth),
        })
      }
    },
  })

  // For some reason, this causes everything to break
  useEffect(() => {
    const newValues = getValues(segment)

    // Only update formik values if they have changed
    if (JSON.stringify(formik.values) !== JSON.stringify(newValues)) {
      formik.setValues(newValues)
    }
  }, [segment])

  const style: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  }

  const coordinatesString = segment
    ? `location: {${segment.coordinates.x}, ${
        segment.coordinates.y
      }}, height: ${segment.coordinates.z.toFixed(2)}`
    : 'location: N/A, height: N/A'

  return (
    <form style={style} onSubmit={formik.handleSubmit}>
      <div>{title}</div>
      <div>{coordinatesString}</div>
      <div>
        Water Depth:{' '}
        <input
          type="text"
          placeholder="0.00"
          name="waterDepth"
          value={formik.values.waterDepth ?? 'N/A'}
          onChange={formik.handleChange}
        />
      </div>
      <div>Terrain: {segment?.terrain ?? 'N/A'}</div>
      <button type="submit">Update</button>
    </form>
  )
}
