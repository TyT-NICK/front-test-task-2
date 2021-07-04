import { Layout } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SearchForm from '../components/SearchForm'
import SearchResult from '../components/SearchResult'
import useYTApi from '../hooks/yt-api.hook'

const { Content } = Layout

const SearchPage = () => {
  const location = useLocation()
  const history = useHistory()
  const [request, loading] = useYTApi()

  const [items, setItems] = useState([])

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location])

  useEffect(
    () =>
      (async () => {
        const items = await request(searchParams.get('q'))
        setItems(items)
      })(),
    [searchParams]
  )

  const searchHandler = (value) => {
    if (!value) return

    searchParams.set('q', value)
    history.push(`/search?${searchParams.toString()}`)
  }

  const favoriteAddHandler = (value) => {
    console.log(value)
  }

  return (
    <Layout className="page">
      <PageHeader />
      <Content className={searchParams.get('q') || 'search-empty'}>
        <SearchForm
          onSearch={searchHandler}
          initialValue={searchParams.get('q')}
          onFavoriteAdd={favoriteAddHandler}
          {...loading}
        />
        {searchParams.get('q') && (
          <SearchResult searchString={searchParams.get('q')} items={items} />
        )}
      </Content>
    </Layout>
  )
}

export default SearchPage
