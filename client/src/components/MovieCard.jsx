import { useState, useEffect } from 'react';
import { Button, Card, Modal } from 'react-bootstrap'

function MovieCard({toggleModal, closeModal, showModal, selectedMovieId}){
    const [movieData, setMovieData] = useState(null);
    console.log(showModal);
    console.log(selectedMovieId);

    useEffect(()=>{
        fetch(`http://www.omdbapi.com/?i=${selectedMovieId}&apikey=90368331`)
        .then((response)=>response.json())
        .then(data=> setMovieData(data))
        .catch(error => console.error(error))
            
        
    },[selectedMovieId])
    console.log(movieData);
  
    return(
        <>
        {movieData ?(
        <Modal
        size='lg'
        show={showModal}
        onHide={closeModal}
        aria-labelledby='signup-modal'>
         <Modal.Header>
             <Modal.Title>
                 <h3>{movieData.Title}</h3>
             </Modal.Title>
         </Modal.Header>
         <Modal.Body>
             <p>{movieData.Plot}</p>
         </Modal.Body>
        </Modal>
        ): ""}
        </>
    )
}

export default MovieCard