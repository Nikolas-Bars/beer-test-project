import {ActionBeerType, getBeerReducer} from "./reducers/get-beer-reducer";
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";

export const reducer = combineReducers({
    beerReducer: getBeerReducer
})

export const store = createStore(reducer, applyMiddleware(thunkMiddleware))

export type AppStoreType = ReturnType<typeof reducer>

export type AppActionType = ActionBeerType

export type ThunksDispatch = ThunkDispatch<AppStoreType, any, AppActionType>

export const useAppDispatch = () => useDispatch<ThunksDispatch>()