import {
  Typography,
  Button,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  Grid,
} from '@mui/material'

import { useList } from 'hooks/useList'
import { Panel } from 'components/Layout'

import { areas as AREAS, Area } from 'types/lists'

const AreaConfig: React.FC<{
  areas: Area[]
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ areas, handleCheckboxChange }) => {
  const areaOptions = AREAS

  return (
    <FormControl component="fieldset">
      <FormGroup>
        <Grid container spacing={1}>
          {areaOptions.map((area) => (
            <Grid
              item
              xs={2}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'column',
              }}
            >
              <div
                key={area}
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  flex: 1,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={areas ? areas.includes(area) : false}
                      onChange={handleCheckboxChange}
                      name={area}
                    />
                  }
                  label={area.charAt(0).toUpperCase() + area.slice(1)}
                  labelPlacement="start" // This prop positions the label before the checkbox
                  style={{ marginRight: 0, flex: 1 }} // Remove default margin
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </FormControl>
  )
}

export const List = () => {
  const { output, refetch, setAreas, areas } = useList()

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAreas = (
      event.target.checked
        ? [...(areas || []), event.target.name]
        : (areas || []).filter((area) => area !== event.target.name)
    ) as Area[]
    console.log({ updatedAreas })
    setAreas(updatedAreas)
  }

  return (
    <Panel>
      <Typography variant="h1">List Generator</Typography>
      <Typography variant="h2">Area Config</Typography>
      <AreaConfig areas={areas} handleCheckboxChange={handleCheckboxChange} />
      <Button onClick={refetch}>Generate</Button>
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{ __html: output || '' }}
      />
    </Panel>
  )
}
