import { Layout } from 'antd'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SearchForm from '../components/SearchForm'
import SearchResult from '../components/SearchResult'
import useAuth from '../hooks/auth.hook'
import useYTApi from '../hooks/yt-api.hook'
import { FavoriteContext, FAVORITE_ACTION_TYPES } from '../reducers/favorite.reducer'

const { Content } = Layout

const SearchPage = () => {
  const location = useLocation()
  const history = useHistory()
  const { login } = useAuth()
  const { searchRequest, videoRequest, loading } = useYTApi()

  const [items, setItems] = useState([])

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location])

  useEffect(
    () =>
      (async () => {
        const searchString = queryParams.get('q')
        const maxResults = queryParams.get('maxResults') || 12
        const order = queryParams.get('order') || 'relevance'

        const items = await searchRequest(searchString, maxResults, order)

        items.forEach(async (item, i) => {
          const data = await videoRequest(item.id.videoId)
          item.viewCount = data.statistics.viewCount

          setItems(items.map((x, k) => (k === i ? item : x)))
        })

        setItems(items)
      })(),
    [queryParams, searchRequest, videoRequest]
  )

  const searchHandler = (value) => {
    if (!value) return

    const updatedSearchparams = new URLSearchParams()
    updatedSearchparams.set('q', value)
    history.push(`/search?${updatedSearchparams.toString()}`)
  }

  const fContext = useContext(FavoriteContext)
  const favoriteAddHandler = (value) => {
    const newFavItem = {
      searchString: value,
      title: value,
      order: 'relevance',
      maxResults: 12,
    }

    fContext.dispatch({
      type: FAVORITE_ACTION_TYPES.ADD_FAVORITE,
      payload: { login, item: newFavItem },
    })
  }

  return (
    <Layout className="page">
      <PageHeader />
      <Content className={queryParams.get('q') || 'search-empty'}>
        <SearchForm
          onSearch={searchHandler}
          initialValue={queryParams.get('q')}
          onFavoriteAdd={favoriteAddHandler}
          loading={loading}
        />
        {queryParams.get('q') && <SearchResult searchString={queryParams.get('q')} items={items} />}
      </Content>
    </Layout>
  )
}

export default SearchPage
