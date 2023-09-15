import { useState } from 'react';
import {Row, Col, Form, Button, Container, Card} from 'react-bootstrap'


function SearchBooks() {

    const [searchInput, setSearchInput]= useState('')
    const [searchedBooks, setSearchedBooks]=useState([])
    console.log(searchedBooks);
    //`http://www.omdbapi.com/?s=${searchInput}&apikey=90368331`

  const handleSubmit = async (event)=>{
    event.preventDefault()

    if(!searchInput){
        return false
    }

    try{
        const response= await fetch(`http://www.omdbapi.com/?s=${searchInput}&apikey=90368331`)

        if(!response.ok){
            throw new Error("uh oh...Something went wrong!")
        }

        const items= await response.json()
        const search=items.Search;

        const bookData= search.map((movie)=>({
            bookId: movie.imdbID,
            authors:movie.Year || ['No author to display'],
            title:movie.Title,
            image:movie.Poster || " "
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

  <Container>
    <h2 className='text-center pt-4'>
      {searchedBooks.length ? `${searchedBooks.length} results from search:` : ''}  
    </h2>
    <Row>
        {searchedBooks.map((book)=>{
            return(
            <Col md='4' key={book.bookId}>
            <Card>
                {book.image?(
                <Card.Img
                src={book.image}
                alt={`${book.title} cover`}
                variant='top'
                />
                ): null}
                <Card.Body className='truncate'>
                <Card.Title className='pe-3 text-center' >{book.title}</Card.Title>
                <p className='small text-center'>Movie Year: {book.authors}</p>
                    
                </Card.Body>
            </Card>
            </Col>
            )
        })}
    </Row>

  </Container>
     
    </>
  );
}

export default SearchBooks;
