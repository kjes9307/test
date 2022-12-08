import {useState,useEffect,FC} from 'react'
import {listSlice,getListData} from 'redux/slice/listSlice'
import {useSelector,useAppDispatch} from 'redux/hook'
import { Route, Routes } from "react-router";
import { Link , Navigate , useNavigate , useLocation  } from 'react-router-dom';
import Icon from 'component/Icon';
import {IconName} from '@fortawesome/fontawesome-common-types';
import {Container,Row,Col,Card } from 'react-bootstrap'
import {Datatype} from 'utils/type'
import {useDebounce} from 'utils'
type DataProps =  {
  data : Datatype[]
}

const Header = () =>{
  const dispatch = useAppDispatch() 
  const [search,setSearch] = useState('')
  const delayVal = useDebounce(search,1000)
  const location = useLocation()
  const navigate = useNavigate();
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setSearch(e.currentTarget.value)
  }
  const {search:pathname} = location
  useEffect(()=>{
    if(pathname){
      let value = pathname.split("=")[1]
      setSearch(value)
    }
  },[])
  useEffect(()=>{
    console.log("@")
    if(delayVal !== '' ){
      navigate(`?country=${delayVal}`)
      dispatch(listSlice.actions.onChangeNav(delayVal))
    }
  },[delayVal,dispatch,navigate])
  return <input value={search} onChange = {handleChange}></input>
}
const SideBar:FC = () =>{
    const dispatch = useAppDispatch() 
    const onHandleNews = (val:string)=>{
      let value =val.split('=')[1]
      dispatch(listSlice.actions.onChangeNav(value))
    }
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
                    <Link to={`${i.routes}`} onClick={()=>{onHandleNews(i.routes);}}>{i.name}</Link>
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
    // const endStr = useSelector(state=>state.dataList.endStr)
    const dispatch = useAppDispatch()   
    const location = useLocation()
    const {search} = location
    useEffect(()=>{
        console.log("@")
        // if(params&&params.country !==''){
        //   let str= `http://localhost:3001/articles?country=${params.country}`
        //   dispatch(listSlice.actions.onChangeNav(params.country))
        //   dispatch(getListData(str))
        //   return
        // }
        let value = search.split('=')[1]
        let str= !search ?`http://localhost:3001/articles`:`http://localhost:3001/articles?country=${value}`
        // console.log(value,str,!search)
        dispatch(getListData(str))
    },[dispatch,search])
    if(loading){
        return <h1>....loading</h1>
    }
    return (
        <Container>
          <Header />
        <Row>
          <Col md='2'>
          <SideBar />
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