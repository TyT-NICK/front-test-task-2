import { useState } from 'react'
import { Input, Row, Col, Popover } from 'antd'
import { Link } from 'react-router-dom'

const AddToFavButton = ({ onAddToFavoriteClick }) => {
  const [isPopoverVisible, setPopoverVisible] = useState(false)

  const visibleChangeHandler = (visible) => {
    setPopoverVisible(visible)
  }

  return (
    <Popover
      trigger="click"
      visible={isPopoverVisible}
      onVisibleChange={visibleChangeHandler}
      placement="bottomRight"
      title={`Поиск сохранен в разделе "Избранное"`}
      content={<Link to="/favorites">Перейти в избранное</Link>}
    >
      <a href="/" onClick={onAddToFavoriteClick} size="small" className="button-favorite">
        favorite_border
      </a>
    </Popover>
  )
}

const SearchForm = (props) => {
  const { onSearch, onFavoriteAdd, initialValue, className, loading } = props

  const [search, setSearch] = useState(initialValue || '')

  const addToFavoriteClickHandler = (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (!search) return

    onFavoriteAdd(search)
  }

  const searchChangeHandler = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className={`search page__content ${className}`}>
      <Row>
        <Col flex="auto">
          <h1>Поиск видео</h1>
        </Col>
      </Row>
      <Row>
        <Input.Search
          size="large"
          onSearch={onSearch}
          onChange={searchChangeHandler}
          defaultValue={initialValue}
          placeholder="Что хотите посмотреть?"
          enterButton="Найти"
          loading={loading}
          suffix={<AddToFavButton onAddToFavoriteClick={addToFavoriteClickHandler} />}
        />
      </Row>
    </div>
  )
}

export default SearchForm
