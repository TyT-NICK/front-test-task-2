import React from 'react'

const STORAGE_NAME = 'userFavorites'

export const FAVORITE_ACTION_TYPES = {
  // INIT_ITEMS: 'items/init',
  ADD_FAVORITE: 'items/add-favorite',
  EDIT_FAVORITE: 'items/edit-favorite',
  DELETE_FAVORITE: 'items/delete-favorite',
}

export const FavoriteContext = React.createContext({
  state: {},
  dispatch: () => {},
})

const handleAction = {
  [FAVORITE_ACTION_TYPES.ADD_FAVORITE]: (state, payload) => {
    const { login, item } = payload

    const newArray = state[login] ? [...state[login], item] : [item]

    return { ...state, [login]: newArray }
  },

  [FAVORITE_ACTION_TYPES.DELETE_FAVORITE]: (state, payload) => {
    const { login, index } = payload

    const newArray = [...state[login]].splice(index, 1)

    return { ...state, [login]: newArray }
  },

  [FAVORITE_ACTION_TYPES.EDIT_FAVORITE]: (state, payload) => {
    const { login, index, item } = payload

    return { ...state, [login]: state[login].map((x, i) => (i === index ? item : x)) }
  },
}

const favoriteReducer = () => {
  const initialState = { ...JSON.parse(localStorage.getItem(STORAGE_NAME)) }

  const reducer = (state, action) => {
    const newState = handleAction[action.type]
      ? handleAction[action.type](state, action.payload)
      : state

    localStorage.setItem(STORAGE_NAME, JSON.stringify(newState))
    return newState
  }

  return [reducer, initialState]
}

export default favoriteReducer
