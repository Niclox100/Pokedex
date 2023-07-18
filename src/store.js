import { applyMiddleware, legacy_createStore as createStore } from "redux"
import { createWrapper } from 'next-redux-wrapper'
import { pokemonsReducer } from "./reducers/pokemons"
import { logger } from "./middelwares"
import thunk from "redux-thunk"

const makeStore = () => createStore(pokemonsReducer, applyMiddleware(thunk ,logger))

export const wrapper = createWrapper(makeStore)
