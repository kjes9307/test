import axios from 'axios'
import {useUrlQueryParam} from 'utils/url'
import { cleanObject } from 'utils';
import { useDebounce  } from 'utils';
export const Header = () =>{
    const [param, setParam] = useUrlQueryParam(["country"]);
    const {country} = param
    return <input value={country} onChange={(e)=>setParam({country:e.target.value})}></input>
}
