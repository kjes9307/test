import {useEffect} from 'react'
import {getListData} from 'redux/slice/listSlice'
import {useSelector,useAppDispatch} from 'redux/hook'
import { useUrlQueryParam } from 'utils/url';
export const Sol2 = () =>{
    const [param,setParam] = useUrlQueryParam(['country'])
    const loading = useSelector(state=>state.dataList.loading)
    const error = useSelector(state=>state.dataList.error)
    const list = useSelector(state=>state.dataList.list)
    const dispatch = useAppDispatch()   
    useEffect(()=>{
        let str= `http://localhost:3001/articles`
        if(param.country) str+=`?country=${param.country}`
        dispatch(getListData(str))
    },[])
    if(loading){
        return <h1>....loading</h1>
    }
    return (
        <div>
            {
                list && list?.map(x=>{
                    return <li key={x.author}>{x.source}</li>
                })
            }
        </div>
    )
}