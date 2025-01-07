import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from '@mui/material'

import { useList } from 'hooks/useList'
import { Panel } from 'components/Layout'

import {
  areas as areaOptions,
  regions as regionOptions,
  Area,
  Region,
} from 'types/lists'
import {
  light as lightOptions,
  heat as heatOptions,
  visibility as visibilityOptions,
  precipitationAmount as precipitationAmountOptions,
  precipitationSize as precipitationSizeOptions,
  EnvironmentalCondition,
  HeatCondition,
  PrecipitationAmount,
  PrecipitationSize,
} from 'types/environmentalConditions'

const AIConfig: React.FC<{
  useAI: boolean
  setUseAI: (useAI: boolean) => void
}> = ({ useAI, setUseAI }) => {
  return (
    <FormControl component="fieldset">
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={useAI} onChange={() => setUseAI(!useAI)} />
          }
          label="Use AI"
          labelPlacement="start" // This prop positions the label before the checkbox
          style={{ marginRight: 0, flex: 1 }} // Remove default margin
        />
      </FormGroup>
    </FormControl>
  )
}

const ConfigCheckbox: React.FC<{
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  index: string
  checked: boolean
}> = ({ index, checked, onChange }) => {
  return (
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
        key={index}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox checked={checked} onChange={onChange} name={index} />
          }
          label={index.charAt(0).toUpperCase() + index.slice(1)}
          labelPlacement="start" // This prop positions the label before the checkbox
          style={{ marginRight: 0, flex: 1 }} // Remove default margin
        />
      </div>
    </Grid>
  )
}

const CheckBoxSection: React.FC<{
  options: string[]
  current: string[] | null
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ options, current, onChange }) => {
  return (
    <FormGroup>
      <Grid container spacing={1}>
        {options.map((option) => (
          <ConfigCheckbox
            index={option}
            checked={current ? current.includes(option) : false}
            onChange={onChange}
          />
        ))}
      </Grid>
    </FormGroup>
  )
}

const WeatherConfig: React.FC<{
  conditions: EnvironmentalCondition[]
  precipitationAmount: PrecipitationAmount
  precipitationSize: PrecipitationSize
  setConditions: (conditions: EnvironmentalCondition[]) => void
  setHeat: (heat: HeatCondition) => void
  setPrecipitationAmount: (precipitationAmount: PrecipitationAmount) => void
  setPrecipitationSize: (precipitationSize: PrecipitationSize) => void
}> = ({
  conditions,
  setConditions,
  setHeat,
  precipitationAmount,
  setPrecipitationAmount,
  precipitationSize,
  setPrecipitationSize,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedConditions = (
      event.target.checked
        ? [...(conditions || []), event.target.name]
        : (conditions || []).filter(
            (condition) => condition !== event.target.name,
          )
    ) as EnvironmentalCondition[]
    setConditions(updatedConditions)
  }

  const handleHeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeat(event.target.name as HeatCondition)
  }

  // Sections for light, heat, visibility, precipitationAmount, and precipitationSize
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Light Conditions</FormLabel>
        <CheckBoxSection
          options={[...lightOptions]}
          current={conditions}
          onChange={handleCheckboxChange}
        />
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Visibility Conditions</FormLabel>
        <CheckBoxSection
          options={[...visibilityOptions]}
          current={conditions}
          onChange={handleCheckboxChange}
        />
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Heat Conditions</FormLabel>
        <CheckBoxSection
          options={[...heatOptions]}
          current={conditions}
          onChange={(event) => {
            handleCheckboxChange(event)
            handleHeatChange(event)
          }}
        />
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Precipitation Amount</FormLabel>
        <CheckBoxSection
          options={[...precipitationAmountOptions]}
          current={[precipitationAmount]}
          onChange={(event) => {
            setPrecipitationAmount(event.target.name as PrecipitationAmount)
          }}
        />
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Precipitation Size</FormLabel>
        <CheckBoxSection
          options={[...precipitationSizeOptions]}
          current={[precipitationSize]}
          onChange={(event) => {
            setPrecipitationSize(event.target.name as PrecipitationSize)
          }}
        />
      </FormControl>
    </>
  )
}

const RegionConfig: React.FC<{
  regions: string[]
  setRegions: (regions: Region[]) => void
}> = ({ regions, setRegions }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedRegions = (
      event.target.checked
        ? [...(regions || []), event.target.name]
        : (regions || []).filter((region) => region !== event.target.name)
    ) as Region[]
    setRegions(updatedRegions)
  }

  return (
    <FormControl component="fieldset">
      <FormGroup>
        <Grid container spacing={1}>
          {regionOptions.map((region) => (
            <ConfigCheckbox
              index={region}
              checked={regions ? regions.includes(region) : false}
              onChange={handleCheckboxChange}
            />
          ))}
        </Grid>
      </FormGroup>
    </FormControl>
  )
}

const AreaConfig: React.FC<{
  areas: Area[]
  setAreas: (areas: Area[]) => void
}> = ({ areas, setAreas }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAreas = (
      event.target.checked
        ? [...(areas || []), event.target.name]
        : (areas || []).filter((area) => area !== event.target.name)
    ) as Area[]
    setAreas(updatedAreas)
  }

  return (
    <FormControl component="fieldset">
      <FormGroup>
        <Grid container spacing={1}>
          {areaOptions.map((area) => (
            <ConfigCheckbox
              index={area}
              checked={areas ? areas.includes(area) : false}
              onChange={handleCheckboxChange}
            />
          ))}
        </Grid>
      </FormGroup>
    </FormControl>
  )
}

const CreatureConfig: React.FC<{
  creatures: string[]
  creatureName: string
  setCreatureName: (creatureName: string) => void
}> = ({ creatures, creatureName, setCreatureName }) => {
  return (
    <FormControl component="fieldset">
      <FormGroup>
        <FormLabel component="legend">Creature Name</FormLabel>
        <select
          value={creatureName}
          onChange={(event) => setCreatureName(event.target.value)}
        >
          <option value="">Random</option>
          {creatures.map((creature) => (
            <option key={creature} value={creature}>
              {creature}
            </option>
          ))}
        </select>
      </FormGroup>
    </FormControl>
  )
}

export const List = () => {
  const {
    areas,
    conditions,
    creatureName,
    creatures,
    error,
    loading,
    output,
    precipitationAmount,
    precipitationSize,
    refetch,
    regions,
    setAreas,
    setConditions,
    setCreatureName,
    setHeat,
    setPrecipitationAmount,
    setPrecipitationSize,
    setRegions,
    setUseAI,
    useAI,
  } = useList()

  return (
    <Panel>
      <Typography variant="h1">List Generator</Typography>
      <Typography variant="h2">Creature Config</Typography>
      <CreatureConfig
        creatures={creatures}
        creatureName={creatureName}
        setCreatureName={setCreatureName}
      />
      <Typography variant="h2">AI Config</Typography>
      <AIConfig useAI={useAI} setUseAI={setUseAI} />
      <Typography variant="h2">Weather Config</Typography>
      <WeatherConfig
        setHeat={setHeat}
        precipitationAmount={precipitationAmount}
        setPrecipitationAmount={setPrecipitationAmount}
        precipitationSize={precipitationSize}
        setPrecipitationSize={setPrecipitationSize}
        conditions={conditions}
        setConditions={setConditions}
      />
      <Typography variant="h2">Region Config</Typography>
      <RegionConfig regions={regions} setRegions={setRegions} />
      <Typography variant="h2">Area Config</Typography>
      <AreaConfig areas={areas} setAreas={setAreas} />
      <Button onClick={refetch}>Generate</Button>
      {loading && <CircularProgress />}
      {error && <Typography variant="body1">Error fetching data</Typography>}
      {!loading && (
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: output || '' }}
        />
      )}
    </Panel>
  )
}
