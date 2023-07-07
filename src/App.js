import React from 'react';
import styled from 'styled-components';
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from "./components/MovieInfoComponent";
import { useState } from 'react';
import Axios from "axios";

export const API_KEY = "cd55afa6";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  padding-top: 2%;
  padding-bottom: 2%;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  @media (max-width: 1024px) {
    font-size: 15px;
  }
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
  @media (max-width: 1024px) {
    width: 100%;
    margin-left: 0;
  }
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 80%;
  height: 620px;
  @media (max-width: 1024px) {
    height: 320px;
  }
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (event) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  }

  return (
    <div className="App">
      <Container>
      <Header>Movie app using React
      <SearchBox>
        <SearchIcon src="/search-icon.svg" />
        <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
        />
      </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
      {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="https://ik.imagekit.io/ugdlmxlzt/myke-simon-atsUqIm3wxo-unsplash.jpg?updatedAt=1688708510050" />
        )}
      </MovieListContainer>
      </Container>
    </div>
  );
}

export default App;
