import {useEffect,useState} from 'react'
import axios from 'axios';
import {Container,Row,Col,Card } from 'react-bootstrap'
import moment from 'moment'
type Datatype = {
    author : string
    title : string
    desc : string
    urlToImage: string
    // source:{id:unknown , name:string}
    registered:Date,
    source:string
  }

export const MainPage =() =>{
  const [data,setData] = useState<Datatype[]|null>(null)
  useEffect(()=>{
    axios.get("http://localhost:3001/articles").then(({data})=>setData(data))
  },[])
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