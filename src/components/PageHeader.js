import { Layout, Menu, Row, Col } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import logo from '../resources/sibdev-logo.png'

const { Header } = Layout
const PageHeader = () => {
  const location = useLocation()

  console.log(location.pathname)
  return (
    <Header>
      <Row className="header page__content" justify="space-between">
        <Col>
          <Link className="header__logo" to="/search">
            <img src={logo} alt="logo" />
          </Link>
        </Col>
        <Col flex="auto">
          <Menu mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key={'/search'}>
              <Link to={'/search'}>Поиск</Link>
            </Menu.Item>
            <Menu.Item key={'/favorites'}>
              <Link to={'/favorites'}>Избранное</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col className="header__signout">
          <Link to="/signout">Выйти</Link>
        </Col>
      </Row>
    </Header>
  )
}

export default PageHeader
