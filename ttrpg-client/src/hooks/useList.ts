import { useState, useCallback } from 'react'
import { config } from 'config'

import { Area } from 'types/lists'

export const useList = () => {
  const [areas, setAreas] = useState<Area[]>([])
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState(false)

  const fetchData = useCallback(() => {
    const paramObject: Record<string, string> = {}
    console.log({ areas })
    if (areas) {
      paramObject.areas = JSON.stringify(areas)
    }
    const params = Object.keys(paramObject).length
      ? new URLSearchParams(paramObject)
      : ''
    fetch(`${config.server.host}:${config.server.port}/lists?${params}`)
      .then((response) => response.json())
      .then((data) => {
        setOutput(data ?? 'Nothing happens.')
      })
      .catch((error) => {
        console.error('Error fetching output data:', error)
        setError(true)
      })
  }, [areas])

  return {
    output,
    error,
    refetch: fetchData,
    areas,
    setAreas,
  }
}
