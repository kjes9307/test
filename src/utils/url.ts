import { useMemo} from "react"
import { useSearchParams , URLSearchParamsInit } from "react-router-dom"
import {cleanObject} from "utils"
export const useUrlQueryParam = <K extends string>(keys:K[] ) =>{
    const [searchParmas,setSearchParam] = useSearchParams()
    return [
    useMemo(()=>keys.reduce((prev,  key )=>{
        return {...prev,[key]:searchParmas.get(key) || ''}
    },{} as {[key in K] : string}), [searchParmas]) ,
    
    (param:Partial<{[key in K] : unknown}>)=> {
        const o = cleanObject({...Object.entries(searchParmas),...param}) as URLSearchParamsInit
        return setSearchParam(o)
    }
    
    ] as const
}

