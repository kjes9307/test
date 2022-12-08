import { useState,useEffect} from 'react';
import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom"
import axios from 'axios';
import { useUrlQueryParam } from 'utils/url';
import {Datatype} from 'utils/type'
import {Container,Row,Col } from 'react-bootstrap'
import {MainPage} from 'component/homepage'
import {SideBar} from 'component/sidebar'
import { Header } from 'component/header';

export const Sol = () =>{
    const [param,setParam] = useUrlQueryParam(['country'])
    // 這不是一個props就可以解決的?
    const [data,setData] = useState<Datatype[]|null>(null)
    
    const onHandleNews = (val:string)=>{
      setParam({country:val})
    }
    //https://newsapi.org/v2/top-headlines?country=tw&apiKey=dc01149c7c004404a03a135efd861e6e
    //top-headlines?country=tw&apiKey=dc01149c7c004404a03a135efd861e6e
    // const navigate = useNavigate()
    // useEffect(()=>{
    //   navigate('articles')
    // },[])
    useEffect(()=>{
      let str= `http://localhost:3001/articles`
      if(param.country) str+=`?country=${param.country}`
      // else console.log("@")
      axios.get(str).then(({data})=>{setData(data)})
    },[param])
    return (
        <Container>
        <div>
          Logo
        <Header />
        </div>
        <Row>
          <Col md='2'>
          <SideBar onChange={onHandleNews}/>
          </Col>
          <Col md='10'> 
          <Routes>
            <Route path='/articles' element={<MainPage data={data || []} />} ></Route>
            <Route index element={<Navigate to="/articles" replace={true} />} />
          </Routes>
          </Col>
        </Row>
      </Container>
    )
}