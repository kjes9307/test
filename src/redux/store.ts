import { combineReducers,configureStore } from '@reduxjs/toolkit'
import {listSlice} from 'redux/slice/listSlice'

const rootReducer = combineReducers({
    dataList: listSlice.reducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store ;