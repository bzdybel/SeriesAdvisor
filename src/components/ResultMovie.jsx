import React, { useState, useEffect, useRef, Fragment } from 'react';
import { IoIosStarOutline } from 'react-icons/io';
import { IconContext } from 'react-icons';
import moment from 'moment';
import { useAsync } from 'react-async';
import { fetchMovieDetails, fetchVideo } from '../api';
const moviePosters = 'https://image.tmdb.org/t/p/w500';

export const ResultMovie = ({ resultMovie }) => {
    const usePrevious = value => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };
    const prevMovie = usePrevious(resultMovie);

    const [movieDetails, setMovieDetails] = useState({});
    const [noData, setNoData] = useState(false);
    const [movieVideo, setMovieVideo] = useState('');

    const fetchMoviesDetailsRequest = useAsync({
        deferFn: fetchMovieDetails,
        onResolve: data => {
            setMovieDetails(data);
        },
    });
    const fetchVideoRequest = useAsync({
        deferFn: fetchVideo,
        onResolve: data => {
            setMovieVideo(
                `https://www.youtube.com/watch?v=${data.results[0].key}`
            );
        },
    });
    const timeConvert = n => {
        const hours = Math.floor(n / 60);
        const minutes = (n / 60 - hours) * 60;
        return hours + `h. ${Math.round(minutes)} m.`;
    };
    const prepareData = (movieDetails, field) => {
        let result = '';
        if (
            Object.entries(movieDetails).length !== 0 &&
            movieDetails.constructor === Object
        ) {
            movieDetails[field].map(element => (result += element.name + '/'));
            return result.slice(0, -1);
        } else {
            return '-';
        }
    };
    const prepareNumber = budget => {
        if (budget) {
            const result =
                '$' +
                budget.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            return result;
        } else {
            return '-';
        }
    };

    useEffect(() => {
        if (resultMovie) {
            fetchMoviesDetailsRequest.run(resultMovie.id);
            fetchVideoRequest.run(resultMovie.id);
            setNoData(false);
        } else {
            setNoData(true);
        }
    }, []);
    useEffect(() => {
        if (resultMovie) {
            if (prevMovie !== resultMovie) {
                fetchMoviesDetailsRequest.run(resultMovie.id);
                fetchVideoRequest.run(resultMovie.id);
            }
            setNoData(false);
        } else {
            setNoData(true);
        }
    }, [resultMovie]);

    return (
        <div className={`home-lower-section-movie-container-result-wrapper`}>
            <div className={`home-lower-section-movie-container-result`}>
                {!noData ? (
                    <Fragment>
                        <img
                            className={`home-lower-section-movie-container__element home-lower-section-movie-container__element--result`}
                            style={{
                                height: '100%',
                                minHeight: '30rem',
                                maxHeight: '30rem',
                                alignSelf: 'center',
                                width: '25%',
                            }}
                            src={
                                movieDetails.poster_path
                                    ? `${moviePosters}${movieDetails.poster_path}`
                                    : null
                            }
                            alt={''}
                        />
                        <div
                            className="home-lower-section-movie-container-result__details"
                            style={{}}
                        >
                            <p
                                className="home-lower-section-movie-container-result-details__type"
                                style={{}}
                            >
                                MOVIE
                            </p>
                            <p className="home-lower-section-movie-container-result-details__title">
                                {' '}
                                {movieDetails.title}
                            </p>
                            <div className="home-lower-section-movie-container-result-details-wrapper">
                                <p className="home-lower-section-movie-container-result-details__release-date">
                                    {moment(movieDetails.release_date).format(
                                        'YYYY'
                                    )}
                                </p>
                                <p className="home-lower-section-movie-container-result-details__release-time">
                                    {timeConvert(movieDetails.runtime)}
                                </p>
                            </div>
                            <p className="home-lower-section-movie-container-result-details__overwiew">
                                {movieDetails.overview}
                            </p>
                            <div className="div">
                                <div className="home-lower-section-movie-container-result-additional-info">
                                    <div className="home-lower-section-movie-container-result-additional-info__title">
                                        Genres:
                                    </div>
                                    <div className="home-lower-section-movie-container-result-additional-info__value">
                                        {prepareData(movieDetails, 'genres')}
                                    </div>
                                    <div className="home-lower-section-movie-container-result-additional-info__title">
                                        Production Countries:
                                    </div>
                                    <div className="home-lower-section-movie-container-result-additional-info__value">
                                        {prepareData(
                                            movieDetails,
                                            'production_countries'
                                        )}
                                    </div>
                                    <div className="home-lower-section-movie-container-result-additional-info__title">
                                        Budget:
                                    </div>
                                    <div className="home-lower-section-movie-container-result-additional-info__value">
                                        {prepareNumber(movieDetails.budget)}
                                    </div>
                                </div>
                            </div>
                            <a
                                className="home-lower-section-movie-container-result-video-link"
                                href={movieVideo}
                                target="blank"
                            >
                                <p style={{ marginRight: '5px' }}>
                                    Show trailer on{' '}
                                </p>
                                <p style={{ color: ' #c4302b' }}>YouTube</p>
                            </a>
                        </div>
                        <div className="home-lower-section-movie-container-result-details-wrapper">
                            <IconContext.Provider
                                value={{
                                    color: '#e87c03',
                                }}
                            >
                                <IoIosStarOutline />
                            </IconContext.Provider>

                            <p className="home-lower-section-movie-container-result-details__raitng">
                                {parseFloat(movieDetails.vote_average).toFixed(
                                    1
                                )}
                            </p>
                            <p className="home-lower-section-movie-container-result-details__votes">
                                Votes: {movieDetails.vote_count}
                            </p>
                        </div>
                    </Fragment>
                ) : (
                    <div>
                        There are no more movies, please choose next movies
                    </div>
                )}
            </div>
        </div>
    );
};
