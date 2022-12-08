import {useUrlQueryParam} from 'utils/url'
export const Header = () =>{
    const [param, setParam] = useUrlQueryParam(["country"]);
    const {country} = param
    return <input value={country} onChange={(e)=>setParam({country:e.target.value})}></input>
}
