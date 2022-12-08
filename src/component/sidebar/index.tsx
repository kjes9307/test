import {FC} from 'react'
import Icon from 'component/Icon';
import {IconName} from '@fortawesome/fontawesome-common-types';
type SideBarDataProps =  {
    onChange: (val:string)=> void
  }
export const SideBar:FC<SideBarDataProps> = (props) =>{
    const {onChange} = props
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
                    <p onClick={()=>{onChange(i.routes);}}>{i.name}</p>
                </li>
                
            )})}
        </ul>
    )
}