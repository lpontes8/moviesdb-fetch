const apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgPathUrl = "https://image.tmdb.org/t/p/w1280";
const searchApiUrl = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-movie-input");
const moviesGrid = document.getElementById("movies-grid");

fetchMovies(apiUrl);

async function fetchMovies(url) {
    const response = await fetch(url);
    const responseJson = await response.json();

    displayMoviesInfo(responseJson.results);
}

function defineColorByRate(rate) {
    if (rate >= 8) {
        return "gold";
    } else if (rate >= 7) {
        return "silver";
    } else if (rate >= 6) {
        return "bronze";
    } else {
        return "bad";
    }
}

function displayMoviesInfo(moviesData) {
    moviesGrid.innerHTML="";

    moviesData.forEach((data) => {
        const { poster_path, title, vote_average} = data;

        const addedMovie = document.createElement("div");
        addedMovie.classList.add("movie-card");

        addedMovie.innerHTML = `
            <img src="${imgPathUrl + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${defineColorByRate(vote_average)}">${vote_average}</span>
            </div>`;

            moviesGrid.appendChild(addedMovie);
    });
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchEnter = searchInput.value;

    if (searchEnter) {
        fetchMovies(searchApiUrl + searchEnter);

        searchInput.value = "";
    }
})