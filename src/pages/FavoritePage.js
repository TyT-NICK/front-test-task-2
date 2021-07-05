import { Layout, List, Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useContext, useEffect, useState } from 'react'
import FavoriteForm from '../components/FavoriteForm'
import PageHeader from '../components/PageHeader'
import useAuth from '../hooks/auth.hook'
import { Link } from 'react-router-dom'
import { FavoriteContext, FAVORITE_ACTION_TYPES } from '../reducers/favorite.reducer'

const { Content } = Layout
const { confirm } = Modal

const ListItem = ({ item, onEdit, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [changedItem, setChangedItem] = useState({ ...item })
  const [urlStr, setUrlStr] = useState(new URLSearchParams())

  useEffect(() => {
    urlStr.set('q', changedItem.searchString)
    urlStr.set('order', changedItem.order)
    urlStr.set('maxResults', changedItem.maxResults)

    setUrlStr(urlStr)
  }, [changedItem])

  const [form] = useForm()
  useEffect(() => {
    form.setFieldsValue({ ...item })
  }, [])

  const deleteHandler = (e) => {
    e.preventDefault()
    onDelete()
  }

  const editHandler = (e) => {
    e.preventDefault()

    setModalVisible(true)
  }

  const closeModalHandler = () => {
    setModalVisible(false)
    setChangedItem({ ...item })
    setTimeout(() => {
      form.setFieldsValue({ ...item })
    }, 250)
  }

  const okModalHandler = () => {
    setModalVisible(false)
    onEdit(changedItem)
  }

  return (
    <List.Item className="favorite-item">
      <Link to={`/search?${urlStr.toString()}`} style={{ display: 'contents' }}>
        <h2 className="favorite-item__title">{item.title}</h2>
        <span className="favorite-item__extra">
          {`${item.searchString}, ${item.order}, ${item.maxResults}`}
        </span>
      </Link>
      <div className="favorite-item__actions">
        <a href="/" className="favorite-item__edit" onClick={editHandler}>
          Изменить
        </a>
        <a href="/" className="favorite-item__delete" onClick={deleteHandler}>
          Удалить
        </a>
      </div>
      <Modal
        title="Изменить запрос"
        closable={false}
        maskClosable
        visible={modalVisible}
        onCancel={closeModalHandler}
        onOk={okModalHandler}
        okText="Сохранить запрос"
        cancelText="Отмена"
      >
        <FavoriteForm form={form} onChange={(values) => setChangedItem({ ...values })} />
      </Modal>
    </List.Item>
  )
}

const FavoritePage = () => {
  const { login } = useAuth()
  const fContext = useContext(FavoriteContext)

  const itemDeleteHandler = (index) => {
    confirm({
      title: 'Удалить избранный запрос?',
      maskClosable: true,
      okText: 'Удалить',
      cancelText: 'Отмена',
      onOk: () => {
        fContext.dispatch({
          type: FAVORITE_ACTION_TYPES.DELETE_FAVORITE,
          payload: { login, index },
        })
      },
    })
  }

  const itemEditHandler = (index, item) => {
    fContext.dispatch({
      type: FAVORITE_ACTION_TYPES.EDIT_FAVORITE,
      payload: { login, index, item },
    })
  }

  return (
    <Layout className="page">
      <PageHeader />
      <Content>
        <div className="page__content">
          <h1>Избранное</h1>
          <List
            dataSource={fContext.state[login] || []}
            renderItem={(item, i) => (
              <ListItem
                item={item}
                onEdit={(item) => itemEditHandler(i, item)}
                onDelete={() => itemDeleteHandler(i)}
              />
            )}
          />
        </div>
      </Content>
    </Layout>
  )
}

export default FavoritePage
