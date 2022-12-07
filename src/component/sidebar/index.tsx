import Icon from 'component/Icon';
import {useState} from 'react'
import {IconName} from '@fortawesome/fontawesome-common-types';
import { Link } from 'react-router-dom';

export const SideBar = () =>{
    const [colapse,setColapse] = useState(false)
    let array:{name:string,icon:IconName,routes:string}[] = [
        {routes:"news",name:'熱門報導',icon:'envelope'},
        {routes:"tw",name:'台灣',icon:"envelope"},
        {routes:"cn",name:"中國",icon:"envelope"},
        {routes:"global",name:"全球",icon:"envelope"},
        {routes:"entertain",name:"娛樂",icon:"envelope"},
        {routes:"business",name:"商業",icon:"envelope"}
    ]
    return ( 
        <ul className={`sidebar list-unstyled border border-black`}>
            {array?.map(i=>{return(
                
                <li key={i.name} className='mt-1 d-flex align-items-center justify-content-center'>
                    <div><Icon icon={i.icon} color='black' size='1x' /></div>
                    <Link to={i.routes}>{i.name}</Link>
                </li>
                
            )})}
        </ul>
    )
}