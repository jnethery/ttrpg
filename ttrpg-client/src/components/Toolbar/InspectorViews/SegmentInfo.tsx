import React, { CSSProperties, useEffect } from 'react'
import { useFormik, FormikProps } from 'formik'
import { TextField } from '@mui/material'

import { MapSegment } from 'types/mapSegments'

interface FormValues {
  waterDepth: string
}

const getValues = (segment: MapSegment | null): FormValues => {
  return {
    waterDepth: segment?.waterDepth.toString() ?? '',
  }
}

const parseValues = (values: FormValues): Partial<MapSegment> => {
  const segment = {} as Partial<MapSegment>
  const parsedWaterDepth = parseFloat(values.waterDepth)
  if (!isNaN(parsedWaterDepth)) {
    segment.waterDepth = parsedWaterDepth
  }
  return segment
}

export const SegmentInfo: React.FC<{
  title: string
  segment: MapSegment | null
  updateSegment?: (segment: MapSegment) => void
}> = ({ title, segment, updateSegment }) => {
  const formik = useFormik<FormValues>({
    initialValues: getValues(segment),
    enableReinitialize: true,
    onSubmit: (values) => {
      if (segment && updateSegment) {
        const parsedValues = parseValues(values)
        if (Object.keys(parsedValues).length > 0) {
          updateSegment({
            ...segment,
            ...parsedValues,
          })
        }
      }
    },
  })

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

  const coordinateInfoString = segment
    ? `location: {${segment.coordinates.x}, ${
        segment.coordinates.y
      }}, height: ${segment.coordinates.z.toFixed(2)}`
    : 'location: N/A, height: N/A'

  return (
    <form style={style} onSubmit={formik.handleSubmit}>
      <div>{title}</div>
      <div>{coordinateInfoString}</div>
      <WaterDepthField formik={formik} isStatic={!updateSegment} />
      <div>Terrain: {segment?.terrain ?? 'N/A'}</div>
    </form>
  )
}

interface WaterDepthFieldProps {
  formik: FormikProps<FormValues>
  isStatic?: boolean
}

const WaterDepthField: React.FC<WaterDepthFieldProps> = ({
  formik,
  isStatic,
}) => {
  const labelText = 'Water Depth'

  return (
    <div>
      {!isStatic && (
        <TextField
          type="number"
          variant="outlined"
          placeholder="0.00"
          name="waterDepth"
          label={labelText}
          value={formik.values.waterDepth ?? 'N/A'}
          onChange={(event) => {
            formik.handleChange(event)
            const parsedValue = parseFloat(event.target.value)
            if (
              !isNaN(parsedValue) &&
              event.target.value === parsedValue.toString()
            ) {
              formik.handleSubmit()
            }
          }}
        />
      )}
      {isStatic && (
        <div>
          {labelText}:{' '}
          {formik.values.waterDepth.length > 0
            ? formik.values.waterDepth
            : 'N/A'}
        </div>
      )}
    </div>
  )
}
