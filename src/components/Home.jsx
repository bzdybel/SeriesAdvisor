import React, { useState, useEffect, useRef, Fragment } from 'react';
import Typical from 'react-typical';
import data from '../filmweb_data.json';
const pageTitle = 'Movie Advisor';
const moviePosters = 'https://image.tmdb.org/t/p/w500';

const movieList = data.results.map(movie => ({
    ...movie,
    isSelected: false,
}));
const initialMovies = movieList.filter((element, index) => index < 15);
const Home = () => {
    const [showButton, setShowButton] = useState(false);
    const [movies, setMovies] = useState(initialMovies);
    const [selectedMoviesIds, setSelectedMoviesIds] = useState([]);

    const movieContainerRef = useRef(null);

    const scrollToRef = ref =>
        window.scrollTo(0, ref.current.offsetTop + ref.current.clientHeight);

    const setIsMovieSelected = selectedMovie => {
        setSelectedMoviesIds(selectedMoviesIds => [
            ...selectedMoviesIds,
            selectedMovie.id,
        ]);

        const moviesCopy = movies.map(movieElement =>
            movieElement.id === selectedMovie.id
                ? { ...movieElement, isSelected: true }
                : movieElement
        );
        setMovies(moviesCopy);
        setTimeout(() => {
            const selectedMovieIndex = movies.findIndex(
                movieElement => movieElement.id === selectedMovie.id
            );
            const updatedMovies = [...movies];
            updatedMovies.splice(selectedMovieIndex, 1);
            updatedMovies.splice(
                selectedMovieIndex,
                0,
                movieList[selectedMoviesIds.length + 15]
            );
            setMovies(updatedMovies);
        }, 500);
    };
    useEffect(() => {
        // document.body.style.overflow = 'hidden';
        setTimeout(() => {
            setShowButton(true);
        }, 10000);
    }, []);

    return (
        <Fragment>
            <div className="home__wrapper">
                <div className="home_wrapper-upper-section">
                    <div className="home-wrapper-upper-section__animation">
                        {!showButton ? (
                            <Typical
                                steps={[
                                    `Welcome on ${pageTitle} site  🤝`,
                                    1000,
                                    `Before we find movie for you let's choose couple of your favourite movies 📽`,
                                    10000,
                                ]}
                                loop={1}
                                wrapper="div"
                            />
                        ) : (
                            <div>
                                Before we find movie for you let's choose couple
                                of your favourite movies 📽
                            </div>
                        )}
                    </div>
                    <div className="home-wrapper-upper-section-button__wrapper">
                        {showButton ? (
                            <button
                                type="submit"
                                className="home-button"
                                onClick={() => {
                                    scrollToRef(movieContainerRef);
                                }}
                            >
                                I'm ready!
                            </button>
                        ) : null}
                    </div>
                </div>
                <div
                    className="home-lower-section-wrapper"
                    ref={movieContainerRef}
                >
                    <div
                        className="home-lower-section-movie-container"
                        ref={movieContainerRef}
                    >
                        {movies.map((movie, index) =>
                            index < 15 ? (
                                <div
                                    className={`home-lower-section-movie-container__element home-lower-section-movie-container__element--${index +
                                        1} ${
                                        movie.isSelected
                                            ? `home-lower-section-movie-container__element--choosen`
                                            : null
                                    } `}
                                    key={movie.id}
                                    onClick={() => setIsMovieSelected(movie)}
                                >
                                    <img
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                        }}
                                        src={`${moviePosters}${movie.poster_path}`}
                                        alt={movie.original_title}
                                    />
                                </div>
                            ) : null
                        )}
                    </div>

                    <div className="home-lower-section-button__wrapper">
                        {selectedMoviesIds.length > 3 ? (
                            <button
                                type="submit"
                                className="home-button"
                                onClick={() => {}}
                            >
                                Ok, we can go next
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Home;
