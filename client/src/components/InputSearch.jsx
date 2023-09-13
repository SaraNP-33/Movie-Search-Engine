import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function InputSearch(text){
 const title=text.text.title 
 
  return(
  <div id="hero">
    <h1>{title}</h1>
    <Form inline>
    <Row>
      <Col xs="auto">
        <Form.Control
          type="text"
          placeholder="Search Books"
          className=" mr-sm-2"
        />
      </Col>
      <Col xs="auto">
        <Button type="submit">Search</Button>
      </Col>
    </Row>
  </Form>
  </div>
  );

}

export default InputSearch