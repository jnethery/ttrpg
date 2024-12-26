import { useState, useEffect, useCallback } from 'react'
import { config } from 'config'

export const useList = () => {
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState(false)

  const fetchData = useCallback(() => {
    fetch(`${config.server.host}:${config.server.port}/lists`)
      .then((response) => response.json())
      .then((data) => {
        setOutput(data ?? 'Nothing happens.')
      })
      .catch((error) => {
        console.error('Error fetching output data:', error)
        setError(true)
      })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    output,
    error,
    refetch: fetchData,
  }
}
