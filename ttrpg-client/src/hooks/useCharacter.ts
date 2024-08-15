import { useState, useEffect, useCallback } from 'react'
import { HydratedCharacter, HydratedCharacterSchema } from 'types/characters'
import { config } from 'config'

interface UseCharacterProps {
  id: string
}

export const useCharacter = ({ id }: UseCharacterProps) => {
  const [character, setCharacter] = useState<HydratedCharacter | null>(null)
  const [error, setError] = useState(false)

  const fetchData = useCallback(() => {
    fetch(`${config.server.host}:${config.server.port}/characters/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const parsedData = HydratedCharacterSchema.parse(data)
        setCharacter(parsedData)
      })
      .catch((error) => {
        console.error('Error fetching character data:', error)
        setError(true)
      })
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    character,
    setCharacter,
    error,
    refetch: fetchData,
  }
}
