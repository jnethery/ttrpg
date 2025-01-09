import { useEffect, useState, useCallback } from 'react'
import { config } from 'config'

import { Area, Region, Party, ContextOverrides } from 'types/lists'
import {
  EnvironmentalCondition,
  HeatCondition,
  PrecipitationAmount,
  PrecipitationSize,
} from 'types/environmentalConditions'

export const useList = () => {
  const [creatures, setCreatures] = useState<string[]>([])
  const [creatureName, setCreatureName] = useState('')

  const [conditions, setConditions] = useState<EnvironmentalCondition[]>([
    'cool',
  ])
  const [heat, setHeat] = useState<HeatCondition>('cool')
  const [precipitationAmount, setPrecipitationAmount] =
    useState<PrecipitationAmount>('dry')
  const [precipitationSize, setPrecipitationSize] =
    useState<PrecipitationSize>('light')

  const [areas, setAreas] = useState<Area[]>([])
  const [regions, setRegions] = useState<Region[]>([])
  const [party, setParty] = useState<Party | null>(null)
  const [overrides, setOverrides] = useState<ContextOverrides>({})

  const [useAI, setUseAI] = useState(false)

  const [error, setError] = useState(false)
  const [loadingOutput, setLoadingOutput] = useState(false)
  const [loadingCreatures, setLoadingCreatures] = useState(false)
  const [output, setOutput] = useState<string | null>(null)

  const fetchCreatures = useCallback(() => {
    setLoadingCreatures(true)
    fetch(`${config.server.host}:${config.server.port}/lists/creatureList`)
      .then((response) => response.json())
      .then((data) => {
        setCreatures(data)
      })
      .catch((error) => {
        console.error('Error fetching creature data:', error)
        setError(true)
      })
      .finally(() => setLoadingCreatures(false))
  }, [])

  const fetchData = useCallback(() => {
    const paramObject: Record<string, string> = {
      useAI: useAI ? 'true' : 'false',
    }
    if (areas) {
      paramObject.areas = JSON.stringify(areas)
    }
    if (regions) {
      paramObject.regions = JSON.stringify(regions)
    }
    if (conditions) {
      paramObject.conditions = JSON.stringify(conditions)
    }
    if (party) {
      paramObject.party = JSON.stringify(party)
    }
    paramObject.overrides = JSON.stringify(overrides)
    if (heat) {
      paramObject.heat = heat
    }
    if (precipitationAmount) {
      paramObject.precipitationAmount = precipitationAmount
    }
    if (precipitationSize) {
      paramObject.precipitationSize = precipitationSize
    }
    if (creatureName && creatureName !== '') {
      paramObject.creatureName = creatureName
    }
    const params = Object.keys(paramObject).length
      ? new URLSearchParams(paramObject)
      : ''
    setLoadingOutput(true)
    fetch(`${config.server.host}:${config.server.port}/lists?${params}`)
      .then((response) => response.json())
      .then((data) => {
        setOutput(data ?? 'Nothing happens.')
      })
      .catch((error) => {
        console.error('Error fetching output data:', error)
        setError(true)
      })
      .finally(() => setLoadingOutput(false))
  }, [
    areas,
    conditions,
    creatureName,
    heat,
    party,
    precipitationAmount,
    precipitationSize,
    regions,
    useAI,
    overrides,
  ])

  useEffect(() => {
    fetchCreatures()
  }, [])

  return {
    loading: loadingOutput || loadingCreatures,
    output,
    areas,
    conditions,
    creatureName,
    creatures,
    error,
    heat,
    party,
    precipitationAmount,
    precipitationSize,
    refetch: fetchData,
    regions,
    overrides,
    setAreas,
    setConditions,
    setCreatureName,
    setHeat,
    setParty,
    setPrecipitationAmount,
    setPrecipitationSize,
    setRegions,
    setUseAI,
    setOverrides,
    useAI,
  }
}
