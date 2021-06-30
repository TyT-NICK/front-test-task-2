import { useCallback, useState } from 'react'

const apiKey = 'AIzaSyBcB235f7RSIijZELkqmyN_Vk5UArL146k'

const useYTApi = () => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (searchString, maxResults = 12, order = 'relevance') => {
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

  return [request, isLoading, error]
}

export default useYTApi
