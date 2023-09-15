import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function SearchBooks() {

    const [searchInput, setSearchInput]= useState('')
    const [searchedBooks, setSearchedBooks]=useState([])
    console.log(searchedBooks);

  const handleSubmit = async (event)=>{
    event.preventDefault()

    if(!searchInput){
        return false
    }

    try{
        const response= await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)

        if(!response.ok){
            throw new Error("uh oh...Something went wrong!")
        }

        const {items}= await response.json()

        const bookData= items.map((book)=>({
            bookId: book.id,
            authors:book.volumeInfo.authors || ['No author to display'],
            title:book.volumeInfo.description,
            image:book.volumeInfo.imageLinks?.thumbnail || " "
        }))
    
     setSearchedBooks(bookData);
      setSearchInput('');

    }catch (err) {
        console.error(err);
      }

  }

  return (
    <>
       <div id="hero">
    <h1>Search Books</h1>
    <Form inline onSubmit={handleSubmit}>
    <Row>
      <Col xs="auto">
        <Form.Control
          type="text"
          placeholder="Search Books"
          className=" mr-sm-2"
          value={searchInput}
        onChange= {(e)=>setSearchInput(e.target.value)}
        />
      </Col>
      <Col xs="auto">
        <Button type="submit">Search</Button>
      </Col>
    </Row>
  </Form>
  </div>
     
    </>
  );
}

export default SearchBooks;
