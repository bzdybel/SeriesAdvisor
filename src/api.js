const API_URL = 'https://api.themoviedb.org/';
const API_KEY = '5208414409036588923403a5490e9c1a';

export const fetchSimilarMovies = async ([selectedMovieId]) => {
    const res = await fetch(
        `${API_URL}3/movie/${selectedMovieId}/similar?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
};

export const fetchNextMovies = async ([page]) => {
    const res = await fetch(
        `${API_URL}3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
};

export const fetchMovieDetails = async ([movieId]) => {
    const res = await fetch(
        `${API_URL}3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
};
export const fetchVideo = async ([movieId]) => {
    const res = await fetch(
        `${API_URL}3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
};
export const fetchProfile = async () => {
    const token = localStorage.getItem('usertoken');
    const res = await fetch(`http://localhost:5000/users/profile`, {
        headers: {
            authorization: token,
        },
    });
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
};
