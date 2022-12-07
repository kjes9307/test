import './App.scss';
import {library} from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {MainPage} from 'component/homepage'
import {SideBar} from 'component/sidebar'
import { Header } from 'component/header';
import {Test} from 'component/Test'
import {Container,Row,Col } from 'react-bootstrap'
import { Route, Routes } from "react-router";
import {useUrlQueryParam} from 'utils/url'
library.add(fas)

function App() {
  const [param, setParam] = useUrlQueryParam(["newsSearch"]);
  console.log(param)
  return (
    <div className="App">
      
      
      <Container>
        <div>
          Logo
        <Header />
        </div>
        <Row>
          <Col md='2'>
          <SideBar/>
          </Col>
          <Col md='10'> 
          <Routes>
            <Route path='news' element={<MainPage />} ></Route>
            <Route path='tw' element={<Test />}></Route>
            <Route path='cn' element={<Test />}></Route>
            <Route path='global' element={<Test />}></Route>
            <Route path='entertain' element={<Test />}></Route>
            <Route path='business' element={<Test />}></Route>
            <Route index element={<MainPage />} />
          </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
