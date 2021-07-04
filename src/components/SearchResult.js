import { Row, Col, Switch } from 'antd'
import { useState } from 'react'

const SearchResultItem = ({ id, snippet }) => {
  const { title, previewUrl, channelTitle, viewsCount } = snippet
  return (
    <div className="video">
      <div className="video__preview">
        <img src={previewUrl} alt="" />
      </div>
      <div className="video__info">
        <h3 className="video__title">{title}</h3>
        <p className="video__channel">{channelTitle}</p>
        <p className="video__views-count">{viewsCount} просмотров</p>
      </div>
    </div>
  )
}

const SearchResult = ({ searchString, items }) => {
  const [isListView, setListView] = useState(true)

  const viewChangeHandler = (checked) => {
    setListView(checked)
  }

  // console.table(items)

  return (
    <div className="search-result page__content">
      <Row>
        <Col flex="auto">
          <p>
            Видео по запросу
            <span className="search-string"> "{searchString}"</span>
            <span className="result-counter">{items.length}</span>
          </p>
        </Col>
        <Col>
          <Switch
            checkedChildren={<span className="switch__ico">list</span>}
            unCheckedChildren={<span className="switch__ico">grid_view</span>}
            onChange={viewChangeHandler}
            defaultChecked
          />
        </Col>
      </Row>

      <div className={`items-container ${isListView && 'list-view'}`}>
        {items.map((item, i) => (
          <SearchResultItem key={i} {...item} />
        ))}
      </div>
    </div>
  )
}

export default SearchResult
