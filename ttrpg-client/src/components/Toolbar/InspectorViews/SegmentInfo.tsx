import React, { CSSProperties, useEffect } from 'react'
import { useFormik, FormikProps } from 'formik'
import {
  TextField,
  Typography,
  List,
  ListItem,
  Divider,
  Container,
  MenuItem,
} from '@mui/material'

import { MapSegment } from 'types/mapSegments'
import { Terrain, terrains } from 'types/terrains'
import { TwoColumnListItem } from 'components/Layout'

interface FormValues {
  waterDepth: string
  height: string
  terrain: Terrain
}

const getValues = (segment: MapSegment | null): FormValues => {
  return {
    waterDepth: segment?.waterDepth.toString() ?? '',
    height: segment?.coordinates.z.toString() ?? '',
    terrain: segment?.terrain ?? 'rock',
  }
}

const parseValues = (values: FormValues) => {
  const segment = {} as Partial<MapSegment> & { height?: number }
  const parsedWaterDepth = parseFloat(values.waterDepth)
  if (!isNaN(parsedWaterDepth)) {
    segment.waterDepth = parsedWaterDepth
  }
  const parsedHeight = parseFloat(values.height)
  if (!isNaN(parsedHeight)) {
    segment.height = parsedHeight
  }
  segment.terrain = values.terrain
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
            coordinates: {
              ...segment.coordinates,
              z: parsedValues.height ?? segment.coordinates.z,
            },
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

  return (
    <form style={style} onSubmit={formik.handleSubmit}>
      <List>
        <ListItem>
          <Container sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{title}</Typography>
          </Container>
        </ListItem>
        <Divider />
        {!updateSegment && (
          <TwoColumnListItem
            label="Location"
            value={
              <Typography>
                {segment ? segment.coordinates.x : 'N/A'},{' '}
                {segment ? segment.coordinates.y : 'N/A'}
              </Typography>
            }
          />
        )}
        <HeightField formik={formik} isStatic={!updateSegment} />
        <WaterDepthField formik={formik} isStatic={!updateSegment} />
        <TerrainField formik={formik} isStatic={!updateSegment} />
      </List>
    </form>
  )
}

interface FieldProps {
  formik: FormikProps<FormValues>
  isStatic?: boolean
}

interface FieldProps {
  formik: FormikProps<FormValues>
  isStatic?: boolean
}

const HeightField: React.FC<FieldProps> = ({ formik, isStatic }) => {
  const fieldValue = isStatic ? (
    <Typography>
      {formik.values.height.length > 0
        ? Number(formik.values.height).toFixed(2)
        : 'N/A'}
    </Typography>
  ) : (
    <TextField
      type="number"
      variant="outlined"
      placeholder="0.00"
      name="height"
      value={formik.values.height ?? 'N/A'}
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
  )

  return <TwoColumnListItem label="Height" value={fieldValue} />
}

const TerrainField: React.FC<FieldProps> = ({ formik, isStatic }) => {
  const fieldValue = isStatic ? (
    <Typography>{formik.values.terrain ?? 'N/A'}</Typography>
  ) : (
    <TextField
      select
      variant="outlined"
      name="terrain"
      value={formik.values.terrain}
      onChange={(event) => {
        formik.handleChange(event)
        formik.handleSubmit()
      }}
    >
      {terrains.map((terrain) => (
        <MenuItem key={terrain} value={terrain}>
          {terrain}
        </MenuItem>
      ))}
    </TextField>
  )

  return <TwoColumnListItem label="Terrain" value={fieldValue} />
}

const WaterDepthField: React.FC<FieldProps> = ({ formik, isStatic }) => {
  const fieldValue = isStatic ? (
    <Typography>
      {formik.values.waterDepth.length > 0
        ? Number(formik.values.waterDepth).toFixed(2)
        : 'N/A'}
    </Typography>
  ) : (
    <TextField
      type="number"
      variant="outlined"
      placeholder="0.00"
      name="waterDepth"
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
  )

  return <TwoColumnListItem label="Water Depth" value={fieldValue} />
}
