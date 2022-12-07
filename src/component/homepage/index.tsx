import {FC} from 'react'
import {Container,Row,Col,Card } from 'react-bootstrap'
import {Datatype} from 'utils/type'
type DataProps =  {
  data : Datatype[]
}
export const MainPage:FC<DataProps> =(props) =>{
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