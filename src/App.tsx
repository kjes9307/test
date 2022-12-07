import './App.scss';
import {library} from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {MainPage} from 'component/homepage'
import {SideBar} from 'component/sidebar'
import { Header } from 'component/header';
import {Container,Row,Col } from 'react-bootstrap'
import { Route, Routes } from "react-router";
import { useState,useEffect} from 'react';
import { useUrlQueryParam } from 'utils/url';
import axios from 'axios';
import {Datatype} from 'utils/type'
library.add(fas)

function App() {
  const [param,setParam] = useUrlQueryParam(['country'])
  // 這不是一個props就可以解決的?
  const [news, setNews] = useState('')
  const [data,setData] = useState<Datatype[]|null>(null)
  const onHandleNews = (val:string)=>{
    console.log(val)
    setNews(val)
    setParam({country:val})
  }
  useEffect(()=>{
    axios.get(`http://localhost:3001/articles?country=${param.country}`).then(({data})=>{setData(data);})
    console.log("@")
  },[param])
  return (
    <div className="App">
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
            <Route path='/:id' element={<MainPage data={data || []} />} ></Route>
            <Route index element={<MainPage data={data || []} />} />
          </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
