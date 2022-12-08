import { createSlice,PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {Datatype} from 'utils/type'

interface ListState{
    list : Datatype[],
    loading: boolean,
    error: string|null
}
const initialState:ListState ={
    loading: false,
    error: null,
    list:[]
}
export const getListData = createAsyncThunk(
    'list/getData',
    async (id:string) =>{
        let str = id? `?${id}` : '' 
        const {data} = await axios.get("http://localhost:3001/articles"+str)
        return data 
    }
)
export const listSlice = createSlice({
    name:"dataList",
    initialState,
    reducers:{},
    extraReducers:{
        // createAsyncThunk的name+ 三種狀態
        [getListData.pending.type]:(state)=>{
            state.loading = true
        },
        [getListData.fulfilled.type]:(state,action)=>{
            state.loading = false
            state.error = null
            state.list = action.payload
        },
        [getListData.rejected.type]:(state,action:PayloadAction<string|null>)=>{
            state.loading = false
            state.error = action.payload
        }
    }
})