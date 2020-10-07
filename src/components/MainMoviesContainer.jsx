import React from 'react';
const moviePosters = 'https://image.tmdb.org/t/p/w500';

export const MainMoviesContainer = ({ movies, onMovieClick, hideContent }) => {
    return movies.map((movie, index) =>
        index < 15 ? (
            <div key={movie.id} onClick={() => onMovieClick(movie)}>
                <img
                    className={`home-lower-section-movie-container__element home-lower-section-movie-container__element--${index +
                        1} ${
                        movie.isSelected
                            ? `home-lower-section-movie-container__element--choosen`
                            : hideContent
                            ? `home-lower-section-movie-container__element--hidden`
                            : null
                    } `}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    src={`${moviePosters}${movie.poster_path}`}
                    alt={''}
                />
            </div>
        ) : null
    );
};
