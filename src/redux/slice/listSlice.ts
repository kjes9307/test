import { createSlice,PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {Datatype} from 'utils/type'

interface ListState{
    list : Datatype[],
    loading: boolean,
    error: string|null,
    endStr:string
}
const initialState:ListState ={
    loading: false,
    error: null,
    list:[],
    endStr:''
}
export const getListData = createAsyncThunk(
    'list/getData',
    async (url:string) =>{
        const {data} = await axios.get(url)
        return data 
    }
)
export const listSlice = createSlice({
    name:"dataList",
    initialState,
    reducers:{
        onChangeNav:(state,action)=>{
            state.endStr = action.payload
        }
    },
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