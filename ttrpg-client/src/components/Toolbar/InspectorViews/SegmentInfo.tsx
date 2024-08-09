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

interface FormValues {
  waterDepth: string
  terrain: Terrain
}

const getValues = (segment: MapSegment | null): FormValues => {
  return {
    waterDepth: segment?.waterDepth.toString() ?? '',
    terrain: segment?.terrain ?? 'rock',
  }
}

const parseValues = (values: FormValues): Partial<MapSegment> => {
  const segment = {} as Partial<MapSegment>
  const parsedWaterDepth = parseFloat(values.waterDepth)
  if (!isNaN(parsedWaterDepth)) {
    segment.waterDepth = parsedWaterDepth
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
        <TwoColumnListItem
          label="Location"
          value={
            <Typography>
              {segment ? segment.coordinates.x : 'N/A'},{' '}
              {segment ? segment.coordinates.y : 'N/A'}
            </Typography>
          }
        />
        <TwoColumnListItem
          label="Height"
          value={
            <Typography>
              {segment ? segment.coordinates.z.toFixed(2) : 'N/A'}
            </Typography>
          }
        />
        <WaterDepthField formik={formik} isStatic={!updateSegment} />
        <TerrainField
          segment={segment}
          formik={formik}
          isStatic={!updateSegment}
        />
      </List>
    </form>
  )
}

const TwoColumnListItem: React.FC<{
  label: string
  value: React.ReactNode
}> = ({ label, value }) => {
  return (
    <ListItem>
      <Container sx={{ textAlign: 'left' }}>
        <Typography fontWeight={'fontWeightBold'}>{label}</Typography>
      </Container>
      <Container sx={{ textAlign: 'right' }}>{value}</Container>
    </ListItem>
  )
}

interface WaterDepthFieldProps {
  formik: FormikProps<FormValues>
  isStatic?: boolean
}

interface TerrainFieldProps {
  segment: MapSegment | null
  formik: FormikProps<FormValues>
  isStatic?: boolean
}

const TerrainField: React.FC<TerrainFieldProps> = ({ formik, isStatic }) => {
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

const WaterDepthField: React.FC<WaterDepthFieldProps> = ({
  formik,
  isStatic,
}) => {
  const fieldValue = isStatic ? (
    <Typography>
      {formik.values.waterDepth.length > 0 ? formik.values.waterDepth : 'N/A'}
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
