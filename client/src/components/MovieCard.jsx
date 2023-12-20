import { useState, useEffect } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import Auth from '../utils/auth';

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
        size='md'
        show={showModal}
        onHide={closeModal}
        aria-labelledby='signup-modal'>
         <Modal.Header closeButton>
             <Modal.Title className='text-center modal-title'>
                 {movieData.Title}
             </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className="movie-info d-flex">
              <Card.Img
                src={movieData.Poster}
                alt={`${movieData.Title} cover`}
                variant='top'
                className='modal-img'
                />
                <div className="movie-stats ms-4 ">
                    <p><span className='stats-title'>Director(s):</span> {movieData.Director}</p>
                    <p><span className='stats-title'>Writer(s):</span> {movieData.Writer}</p>
                    <p><span className='stats-title'>Actors:</span> {movieData.Actors}</p>
                    <p><span className='stats-title'>Genre:</span> {movieData.Genre}</p>
                    <p><span className='stats-title'>Rated:</span> {movieData.Rated}</p>
                    <p><span className='stats-title'>IMDB Rating:</span> {movieData.imdbRating}</p>
                </div>
            </div>
                
                <p className='mt-4'><span className='stats-title'>Plot:</span> {movieData.Plot}</p>
                
         </Modal.Body>
        </Modal>
        ): ""}
        </>
    )
}

export default MovieCard;