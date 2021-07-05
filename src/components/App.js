import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import '../styles/App.css'
import SearchPage from '../pages/SearchPage'
import AuthPage from '../pages/AuthPage'
import FavoritePage from '../pages/FavoritePage'
import favoriteReducer, { FavoriteContext } from '../reducers/favorite.reducer'
import { useReducer } from 'react'
import SignOutPage from '../pages/SignOutPage'
import useAuth from '../hooks/auth.hook'

const App = () => {
  const [fReducer, fInitial] = favoriteReducer()
  const [favoriteState, dispatchFavorite] = useReducer(fReducer, fInitial)
  const { login } = useAuth()

  return (
    <FavoriteContext.Provider value={{ state: favoriteState, dispatch: dispatchFavorite }}>
      <Router>
        <Switch>
          <Route path="/auth">
            <AuthPage />
          </Route>
          {!login && <Redirect to="/auth" />}

          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/favorites">
            <FavoritePage />
          </Route>
          <Route path="/signout">
            <SignOutPage />
          </Route>
          <Redirect to="/search" />
        </Switch>
      </Router>
    </FavoriteContext.Provider>
  )
}

export default App
