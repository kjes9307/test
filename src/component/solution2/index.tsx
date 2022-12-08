import {useEffect,FC} from 'react'
import {listSlice,getListData} from 'redux/slice/listSlice'
import {useSelector,useAppDispatch} from 'redux/hook'
import { Route, Routes } from "react-router";
import { Link , Navigate } from 'react-router-dom';
import Icon from 'component/Icon';
import {IconName} from '@fortawesome/fontawesome-common-types';
import {Container,Row,Col,Card } from 'react-bootstrap'
import {Datatype} from 'utils/type'
type DataProps =  {
  data : Datatype[]
}
type SideBarDataProps =  {
    onChange: (val:string)=> void
  }
const Header = () =>{
  const endStr = useSelector(state=>state.dataList.endStr)
  const dispatch = useAppDispatch() 
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    dispatch(listSlice.actions.onChangeNav(e.currentTarget.value))
  }
  return <input value={endStr} onChange = {handleChange}></input>
}
const SideBar:FC<SideBarDataProps> = (props) =>{
    const {onChange} = props
    let array:{name:string,icon:IconName,routes:string}[] = [
        {routes:"/articles?country=news",name:'熱門報導',icon:'envelope'},
        {routes:"/articles?country=tw",name:'台灣',icon:"envelope"},
        {routes:"/articles?country=cn",name:"中國",icon:"envelope"},
        {routes:"/articles?country=global",name:"全球",icon:"envelope"},
        {routes:"/articles?country=entertain",name:"娛樂",icon:"envelope"},
        {routes:"/articles?country=business",name:"商業",icon:"envelope"}
    ]
    return ( 
        <ul className={`sidebar list-unstyled border border-black`}>
            {array?.map(i=>{return(
                
                <li key={i.name} className='mt-1 d-flex align-items-center justify-content-center'>
                    <div><Icon icon={i.icon} color='black' size='1x' /></div>
                    <Link to={`${i.routes}`} onClick={()=>{onChange(i.routes);}}>{i.name}</Link>
                </li>
                
            )})}
        </ul>
    )
}
const MainPage:FC<DataProps> =(props) =>{
    const {data}  = props;
    return (
      <Container>
          <Row>
        {data?.map((x,id)=>{
          return (
            <Col md='4' key={id}>
            <Card className='card mt-2'>
              <Card.Img variant="top" src="https://fakeimg.pl/250x100/" />
              <Card.Body>
                <Card.Title>{x.title}</Card.Title>
                <Card.Text>
                {x.desc} 
                </Card.Text>
                <Card.Text>
                {x.source} 
                </Card.Text>
                <Card.Footer>
                <span>{x.author}</span>
                </Card.Footer>
              </Card.Body>
            </Card>
           </Col>
          )
        })}
        </Row>
        </Container>
    )
  }
export const Sol2 = () =>{
    const loading = useSelector(state=>state.dataList.loading)
    const list = useSelector(state=>state.dataList.list)
    const endStr = useSelector(state=>state.dataList.endStr)
    const dispatch = useAppDispatch()   
    const onHandleNews = (val:string)=>{
      let value =val.split('=')[1]
      dispatch(listSlice.actions.onChangeNav(value))
    }
  
    useEffect(()=>{
        console.log("@")
        // if(params&&params.country !==''){
        //   let str= `http://localhost:3001/articles?country=${params.country}`
        //   dispatch(listSlice.actions.onChangeNav(params.country))
        //   dispatch(getListData(str))
        //   return
        // }
        let str= !endStr?`http://localhost:3001/articles`:`http://localhost:3001/articles?country=${endStr}`
        dispatch(getListData(str))
    },[endStr,dispatch])
    if(loading){
        return <h1>....loading</h1>
    }
    return (
        <Container>
          <Header />
        <Row>
          <Col md='2'>
          <SideBar onChange={onHandleNews}/>
          </Col>
          <Col md='10'> 
          <Routes>
            <Route path='articles' element={<MainPage data={list || []} />} ></Route>
            <Route index element={<Navigate to="articles" replace={true} />} />
          </Routes>
          </Col>
        </Row>
      </Container>
    )
}