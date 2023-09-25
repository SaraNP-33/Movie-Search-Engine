import { useState, useEffect } from 'react';
import {Row, Col, Form, Button, Container, Card} from 'react-bootstrap'


function SearchMovies() {

    const [searchInput, setSearchInput]= useState('')
    const [searchedBooks, setSearchedBooks]=useState([])
    const [brokenLinks, setBrokenLinks] = useState(0)
   
    const numberOfResults= searchedBooks.length -brokenLinks
   

    useEffect(() => {
      const count = searchedBooks.filter(book => book.image === 'N/A').length;
      setBrokenLinks(count);
    }, [searchedBooks]);

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
      //  const cleanBookData= bookData.image ==="N/A" && setBrokenLinks(prev=> prev+1)
      //  console.log(cleanBookData);
     setSearchedBooks(bookData);
      setSearchInput('');

    }catch (err) {
        console.error(err);
      }

  }
  console.log(brokenLinks);

  return (
    <>
       <div id="hero">
    <h1>Search Movies</h1>
    <Form inline onSubmit={handleSubmit}>
    <Row>
      <Col xs="auto">
        <Form.Control
          type="text"
          placeholder="Enter Movie Name"
          className=" mr-sm-2"
          value={searchInput}
        onChange= {(e)=>setSearchInput(e.target.value)}
        />
      </Col>
      <Col xs="auto">
        <Button id="input-btn"type="submit">Search</Button>
      </Col>
    </Row>
  </Form>
  </div>

  <Container>
    <h3 className='text-center pt-4'>
      {numberOfResults ? `${numberOfResults} results from search:` : ''}  
    </h3>
    <Row>
        {searchedBooks.map((book)=>{
          
            return(
              <>
               {book.image !== "N/A" ?(
            <Col md='4' key={book.bookId}>
            <Card>
                 <div className='img-container'>
                <Card.Img
                src={book.image}
                alt={`${book.title} cover`}
                variant='top'
                />
                </div> 
                <Card.Body className='truncate'>
                <Card.Title className='pe-3 text-center' >{book.title}</Card.Title>
                <p className='small text-center'>Movie Year: {book.authors}</p>
                
                </Card.Body>
                </Card>
                </Col>
                ): null}
                </>
            )
        })}
    </Row>

  </Container>
     
    </>
  );
}

export default SearchMovies;
