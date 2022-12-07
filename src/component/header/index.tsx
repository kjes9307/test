import axios from 'axios'
import {useUrlQueryParam} from 'utils/url'
import { cleanObject } from 'utils';
import { useDebounce  } from 'utils';

export const useProject = (param:string) =>{
    // 第一參數為 監控key值
    return axios.get(`https://newsapi.org/v2/top-headlines?country=${param}&apiKey=dc01149c7c004404a03a135efd861e6e`)


}

export const Header = () =>{
    const [, setParam] = useUrlQueryParam(["country"]);
    // const {data} = useProject(useDebounce(param.newsSearch,1000))
    return <input onChange={(e)=>setParam({country:e.target.value})}></input>
}
