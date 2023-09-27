import { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap'

function MovieCard({toggleModal, closeModal, showModal, selectedMovieId}){
    console.log(showModal);
    console.log(selectedMovieId);

    
    const handleOneMovieSearch= async()=>{
        try{
          const response= await fetch(`http://www.omdbapi.com/?i=${selectedMovieId}&apikey=90368331`)
          console.log(`http://www.omdbapi.com/?i=${selectedMovieId}&apikey=90368331`);
         const oneMovie= await response.json()
         console.log(oneMovie);
        }catch(err){
          console.error(err)
        }
    
      }
    return(
        <>
        <Modal
        size='lg'
        show={showModal}
        onHide={closeModal}
        aria-labelledby='signup-modal'>
         <Modal.Header>
             <Modal.Title>
                 <h3>This will be the movie title</h3>
             </Modal.Title>
         </Modal.Header>
         <Modal.Body>
             <p>This is where the movie info will be!</p>
         </Modal.Body>
        </Modal>
        </>
    )
}

export default MovieCard