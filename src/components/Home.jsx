import React, { useState, useEffect, useRef, Fragment } from 'react';
import data from '../filmweb_data_latest.json';
import { useAsync } from 'react-async';
import { fetchSimilarMovies, fetchNextMovies } from '../api';
import { Arrow } from './Arrow.jsx';
import { ResultMovie } from './ResultMovie';
import { MainMoviesContainer } from './MainMoviesContainer';
import { WelcomeSection } from './WelcomeSection';
import { Navigation } from './Navigation';
import Tooltip from '@material-ui/core/Tooltip';
import { IoIosClose, IoIosArrowDropup } from 'react-icons/io';
import useTimeout from 'use-timeout';
import { IconContext } from 'react-icons';

const totalPages = data.total_pages;

const movieList = data.results.map(movie => ({
    ...movie,
    isSelected: false,
}));
const initialMovies = movieList.filter((element, index) => index < 15);

const Home = () => {
    const [movies, setMovies] = useState(initialMovies);
    const [nextMovies, setNextMovies] = useState([]);
    const [selectedMoviesIds, setSelectedMoviesIds] = useState([]);
    const [allSimilarsMovies, setAllSimilarsMovies] = useState([]);

    const fetchSimilarMoviesRequest = useAsync({
        deferFn: fetchSimilarMovies,
        onResolve: data => {
            setAllSimilarsMovies(allSimilarsMovies => [
                ...allSimilarsMovies,
                ...data.results,
            ]);
        },
    });
    const fetchNextMoviesToShowRequest = useAsync({
        deferFn: fetchNextMovies,
        onResolve: data => {
            const mappedData = data.results.map(movie => ({
                ...movie,
                isSelected: false,
            }));
            setMovies(mappedData);
        },
    });
    const fetchNextMoviesRequest = useAsync({
        deferFn: fetchNextMovies,
        onResolve: data => {
            setNextMovies(data.results);
        },
    });

    const [showButton, setShowButton] = useState(false);
    const [currentPage, setCurrentPage] = useState(2);
    const [movieToShow, setMovieToShow] = useState(null);

    const movieContainerRef = useRef(null);
    const navigationRef = useRef(null);

    const scrollToRef = ref => {
        window.scrollTo(0, ref.current.offsetTop);
    };

    const setIsMovieSelected = selectedMovie => {
        fetchSimilarMoviesRequest.run(selectedMovie.id);

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
            if (nextMovies.length === 1) {
                fetchNextMoviesRequest.run(currentPage + 1);
                setCurrentPage(currentPage + 1);
            }
            updatedMovies.splice(selectedMovieIndex, 1);
            updatedMovies.splice(
                selectedMovieIndex,
                0,
                nextMovies[nextMovies.length - 1]
            );
            const copyNextMovies = [...nextMovies];
            copyNextMovies.splice(nextMovies.length - 1, 1);
            setNextMovies(copyNextMovies);
            setMovies(updatedMovies);
        }, 500);
    };
    const getNextMovies = page => {
        setCurrentPage(page);
        fetchNextMoviesToShowRequest.run(page);
    };
    const findCorrectMovie = selectedMovies => {
        if (allSimilarsMovies.length === 1) {
            setMovieToShow(null);
            setSelectedMoviesIds([]);
        }
        const index =
            Math.floor(Math.random() * (0 - allSimilarsMovies.length + 1)) +
            allSimilarsMovies.length;
        setMovieToShow(allSimilarsMovies[index]);
        const allSimilarsMoviesCopy = [...allSimilarsMovies];
        allSimilarsMoviesCopy.splice(index, 1);
        setAllSimilarsMovies(allSimilarsMoviesCopy);
    };
    useEffect(() => {
        console.log('xd');
        setCurrentPage(currentPage);
        fetchNextMoviesRequest.run(currentPage);
        // document.body.style.overflow = 'hidden';
        setTimeout(() => {
            setShowButton(true);
        }, 10000);
    }, []);
    return (
        <Fragment>
            <div className="home__wrapper">
                <div ref={navigationRef}>
                    <Navigation />
                </div>
                <WelcomeSection
                    showButton={showButton}
                    onButtonClick={scrollToRef}
                    movieContainerRef={movieContainerRef}
                    hideContent={movieToShow !== null}
                />
                <div
                    style={{
                        backgroundImage: `url('logo.png')`,
                        width: '5rem',
                        height: '5rem',
                    }}
                    className="div"
                ></div>
                <div
                    className="home-lower-section-wrapper"
                    style={{
                        margin:
                            selectedMoviesIds.length > 2 ? '70% 0 7% 0' : null,
                    }}
                >
                    <div
                        className="home-lower-section-movie-container-all-elements-wrapper"
                        style={{
                            background: 'rgba(50, 0, 0, 0.5)',
                            maxWidth: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {movieToShow ? (
                            <Tooltip
                                title="Back to movies"
                                placement="top-start"
                                arrow
                            >
                                <div className="home-lower-section-movie-container__close">
                                    <IoIosClose
                                        onClick={() => {
                                            setMovieToShow(null);
                                            setSelectedMoviesIds([]);
                                            window.scrollTo(
                                                0,
                                                document.body.scrollHeight
                                            );
                                        }}
                                    />
                                </div>
                            </Tooltip>
                        ) : null}
                        <div className="home-lower-section-wrapper__movies-with-arrows">
                            <Arrow
                                direction="previous"
                                onArrowClick={() =>
                                    getNextMovies(
                                        currentPage - 1 <= 0
                                            ? totalPages
                                            : currentPage - 1
                                    )
                                }
                                hideContent={movieToShow}
                            />
                            <div className="div">
                                <div
                                    className="home-lower-section-movie-container"
                                    style={{
                                        display: movieToShow ? 'flex' : 'grid',
                                        padding: movieToShow
                                            ? '0 3rem'
                                            : '3rem',
                                    }}
                                >
                                    {!movieToShow ? (
                                        <MainMoviesContainer
                                            movies={movies}
                                            onMovieClick={setIsMovieSelected}
                                            hideContent={movieToShow}
                                        />
                                    ) : (
                                        <ResultMovie
                                            resultMovie={movieToShow}
                                        />
                                    )}
                                </div>
                            </div>
                            <Arrow
                                direction={'next'}
                                onArrowClick={() =>
                                    getNextMovies(currentPage + 1)
                                }
                                hideContent={movieToShow}
                            />
                        </div>
                        <div
                            className="home-lower-section-button__wrapper"
                            ref={movieContainerRef}
                        >
                            {selectedMoviesIds.length > 2 && !movieToShow ? (
                                <Tooltip
                                    title="The more choices, the more suggestions"
                                    placement="top-start"
                                    arrow
                                >
                                    <button
                                        type="submit"
                                        className="home-button"
                                        onClick={() => {
                                            findCorrectMovie(selectedMoviesIds);
                                        }}
                                    >
                                        Ok, we can go next
                                    </button>
                                </Tooltip>
                            ) : selectedMoviesIds.length > 2 ? (
                                <button
                                    type="submit"
                                    className="home-button"
                                    onClick={() => {
                                        findCorrectMovie(selectedMoviesIds);
                                    }}
                                >
                                    Show me next movie
                                </button>
                            ) : null}
                        </div>
                    </div>

                    <div
                        className="home-lowe-section-movie-container__arrow-back-wrapper"
                        // style={{ marginLeft: '5%' }}
                    >
                        {' '}
                        <Tooltip
                            title="Back to the top"
                            placement="top-start"
                            classes="tooltip"
                            arrow
                        >
                            <div className="div">
                                <IconContext.Provider
                                    value={{
                                        className:
                                            'home-lower-section-movie-container__arrow-icon home-lower-section-wrapper__movies-with-arrows--back-to-top',
                                    }}
                                >
                                    <IoIosArrowDropup
                                        onClick={() => {
                                            scrollToRef(navigationRef);
                                        }}
                                    />
                                </IconContext.Provider>
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Home;
