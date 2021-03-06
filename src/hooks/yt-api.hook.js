import { useCallback, useState } from 'react'

const apiKey = 'AIzaSyCt0jMegkduXb1KWIn89Ducjhcba5O0CIw'

const useYTApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const videoRequest = useCallback(async (videoId, part = 'statistics') => {
    setLoading(true)

    const queryString = new URL('https://youtube.googleapis.com/youtube/v3/videos')
    queryString.searchParams.set('id', videoId)
    queryString.searchParams.set('part', part)
    queryString.searchParams.set('key', apiKey)

    try {
      const response = await fetch(queryString)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error.message)

      setLoading(false)
      return data.items[0]
    } catch (e) {
      setLoading(false)
      setError(e.message)

      throw e
    }
  }, [])

  const searchRequest = useCallback(async (searchString, maxResults = 12, order = 'relevance') => {
    setLoading(true)

    const queryString = new URL('https://youtube.googleapis.com/youtube/v3/search')
    queryString.searchParams.set('part', 'snippet')
    queryString.searchParams.set('type', 'video')
    queryString.searchParams.set('q', searchString)
    queryString.searchParams.set('maxResults', maxResults)
    queryString.searchParams.set('order', order)
    queryString.searchParams.set('key', apiKey)

    try {
      const response = await fetch(queryString)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error.message)

      setLoading(false)
      return data.items.map((item) => ({ id: item.id, snippet: item.snippet }))
    } catch (e) {
      setLoading(false)
      setError(e.message)

      throw e
    }
  }, [])

  return { searchRequest, loading, error, videoRequest }
}

export default useYTApi
