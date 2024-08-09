import { useState, useEffect, useCallback } from 'react'

import { ImageSchema } from 'types/images'
import { config } from 'config'

export const useImageData = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [error, setError] = useState(false)

  const fetchData = useCallback(() => {
    fetch(`${config.server.host}:${config.server.port}/images/1`)
      .then((response) => response.json())
      .then((data) => {
        const parsedData = ImageSchema.parse(data)
        const img = new Image()
        img.src = `data:image/png;base64,${parsedData.data}`
        img.onload = () => {
          setImage(img)
        }
      })
      .catch((error) => {
        console.error('Error fetching map data:', error)
        setError(true)
      })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    image,
    error,
    refetch: fetchData,
  }
}
