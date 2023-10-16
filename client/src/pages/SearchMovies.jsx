import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Card,
  Modal,
} from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MovieCard from "../components/MovieCard";

library.add(faCircleInfo);

function SearchMovies() {
  const [searchInput, setSearchInput] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [brokenLinks, setBrokenLinks] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const toggleModal = (movieId) => {
    setShowModal((prev) => !prev);
    // const movieId = e.currentTarget.value;
    setSelectedMovieId(movieId);
    console.log(movieId);
  };
  console.log(selectedMovieId);
  console.log(showModal);
  const closeModal = () => {
    setSelectedMovieId(null);
    setShowModal(false);
  };

  const numberOfResults = searchedMovies.length - brokenLinks;

  useEffect(() => {
    const count = searchedMovies.filter(
      (movie) => movie.image === "N/A"
    ).length;
    setBrokenLinks(count);
  }, [searchedMovies]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${searchInput}&apikey=90368331`
      );

      if (!response.ok) {
        throw new Error("uh oh...Something went wrong!");
      }

      const items = await response.json();
      const search = items.Search;

      const bookData = search.map((movie) => ({
        movieId: movie.imdbID,
        year: movie.Year || ["No author to display"],
        title: movie.Title,
        image: movie.Poster || " ",
      }));
      //  const cleanBookData= bookData.image ==="N/A" && setBrokenLinks(prev=> prev+1)
      //  console.log(cleanBookData);
      setSearchedMovies(bookData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };
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
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button id="input-btn" type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <Container>
        <h3 className="text-center pt-4">
          {numberOfResults ? `${numberOfResults} results from search:` : ""}
        </h3>
        <Row>
          {searchedMovies.map((movie) => {
            return (
              <>
                {movie.image !== "N/A" ? (
                  <Col md="4" key={movie.movieId}>
                    <Card>
                      <div className="img-container">
                        <Card.Img
                          src={movie.image}
                          alt={`${movie.title} cover`}
                          variant="top"
                        />
                      </div>
                      <Card.Body className="truncate">
                        <Card.Title className="pe-3 text-center">
                          {movie.title}
                        </Card.Title>
                        <p className="small text-center">
                          Movie Year: {movie.year}
                        </p>
                        <div onClick={() => toggleModal(movie.movieId)}>
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-info"
                            size="2x"
                            className="info-icon"
                          />
                         
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ) : null}
              </>
            );
          })}
        </Row>
      </Container>
      <MovieCard
        closeModal={closeModal}
        showModal={showModal}
        selectedMovieId={selectedMovieId}
      />
    </>
  );
}

export default SearchMovies;
