import Icon from "component/Icon"
import {IconName} from '@fortawesome/fontawesome-common-types';
import { useState } from 'react';
export const Test = () =>{
    const [show, setShow] = useState(false);
    let array:{name:string,icon:IconName,routes:string}[] = [
        {routes:"news",name:'熱門報導',icon:'envelope'},
        {routes:"tw",name:'台灣',icon:"envelope"},
        {routes:"cn",name:"中國",icon:"envelope"},
        {routes:"global",name:"全球",icon:"envelope"},
        {routes:"entertain",name:"娛樂",icon:"envelope"},
        {routes:"business",name:"商業",icon:"envelope"}
    ]
    return (
    <section className={show ? 'space-toggle' : ''}>
        <header className={` ${show ? 'space-toggle' : ''}`}>
        <Icon icon='coffee' size='1x' onClick={() => setShow(!show)}  />
            123
        </header>
        <ul className={`sidebar ${show ? 'show' : ''}`}>
            {array?.map(i=>{return(
                <li key={i.name} >
                    <div><Icon icon={i.icon} color='black' size='1x' /></div>
                    <span>{i.name}</span>
                </li>  
            )})}
        </ul>
        <div>
            content
        </div>
    </section>
    )
}