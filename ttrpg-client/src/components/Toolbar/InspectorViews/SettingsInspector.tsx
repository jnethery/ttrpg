import React, { CSSProperties } from 'react'
import { useTheme } from '@mui/material/styles'
import { useFormik, FormikProps } from 'formik'

import { MapMeta } from 'types/mapSegments'
import { Panel, Button, TwoColumnListItem } from 'components/Layout'
import { useMapContext } from 'hooks/useMapContext'
import { TextField, Divider, Typography, List } from '@mui/material'

export const SaveLoadButtons: React.FC = () => {
  const theme = useTheme()
  const { refetch } = useMapContext()

  const style: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  }

  return (
    <div style={style}>
      <Button style={{ flex: 1 }} onClick={refetch}>
        Refetch
      </Button>
      <div
        style={{
          display: 'flex',
          gap: theme.spacing(2),
        }}
      >
        <Button style={{ flex: 1 }}>Save</Button>
        <Button style={{ flex: 1 }}>Load</Button>
      </div>
    </div>
  )
}

interface FormValues {
  width: string
  length: string
}

const getValues = (meta: MapMeta): FormValues => {
  return {
    width: meta.width.toString(),
    length: meta.length.toString(),
  }
}

const parseValues = (values: FormValues) => {
  const meta = {} as MapMeta
  const parsedWidth = parseFloat(values.width)
  const parsedLength = parseFloat(values.length)

  meta.width = !isNaN(parsedWidth) ? parsedWidth : 0
  meta.length = !isNaN(parsedLength) ? parsedLength : 0
  return meta
}

export const SettingsInspector: React.FC = () => {
  const { meta, setMeta } = useMapContext()

  const formik = useFormik<FormValues>({
    initialValues: getValues(meta),
    enableReinitialize: true,
    onSubmit: (values) => {
      setMeta((prev) => {
        if (!prev) {
          return null
        }
        return {
          ...prev,
          ...parseValues(values),
        }
      })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Panel elevation={2}>
        <Panel elevation={3}>
          <Typography variant="h6">Grid Settings</Typography>
          <Divider />
          <List>
            <TwoColumnField
              formik={formik}
              label={`Length (${meta.lateralUnits})`}
              field="length"
            />
            <TwoColumnField
              formik={formik}
              label={`Width (${meta.lateralUnits})`}
              field="width"
            />
            <TwoColumnListItem label="Grid Increments" value="4" />
          </List>
        </Panel>
        <Panel elevation={3}>
          <Typography variant="h6">Topographical Settings</Typography>
          <Divider />
          <List>
            <TwoColumnListItem label="Local Max Height (feet)" value="2000" />
            <TwoColumnListItem label="Local Min Height (feet)" value="-2000" />
          </List>
        </Panel>
        <Panel elevation={3}>
          <Typography variant="h6">Units</Typography>
          <Divider />
          <List>
            <TwoColumnListItem label="Lateral Units" value="miles" />
            <TwoColumnListItem label="Vertical Units" value="feet" />
          </List>
        </Panel>
        <Panel elevation={3}>
          <SaveLoadButtons />
        </Panel>
      </Panel>
    </form>
  )
}

interface FieldProps {
  formik: FormikProps<FormValues>
  label: string
  field: keyof FormValues
  isStatic?: boolean
}

const TwoColumnField: React.FC<FieldProps> = ({
  formik,
  label,
  field,
  isStatic,
}) => {
  const fieldValue = isStatic ? (
    <Typography>
      {formik.values[field].length > 0
        ? Number(formik.values[field]).toFixed(2)
        : 'N/A'}
    </Typography>
  ) : (
    <TextField
      type="number"
      variant="outlined"
      placeholder="0.00"
      name={field.toString()}
      value={formik.values[field] ?? 'N/A'}
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

  return <TwoColumnListItem label={label} value={fieldValue} />
}
