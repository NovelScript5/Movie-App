const APIKEY = `https://api.themoviedb.org/3/discover/movie?sort_by-popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`
const IMGPATH = `https://image.tmdb.org/t/p/w1280/`
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=`
const Main = document.getElementById("Main")
const Form = document.getElementById("Form")
const Search = document.getElementById("Search")

getMovies(APIKEY)

async function getMovies(url) {

    const resp = await fetch(url)

    const respData = await resp.json()

    console.log(respData)

    showMovies(respData.results)

}

function showMovies(movies) {

    Main.innerHTML = ``

    movies.forEach((movie) => {

        const { poster_path,title,vote_average, overview} = movie

        const movieEl = document.createElement("div")

        movieEl.classList.add("movie")

        movieEl.innerHTML = `<img src="${IMGPATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div> 
        <div class="overview">
        <h4>${title} Overview</h4>
        ${overview}

        </div>
        `

        Main.appendChild(movieEl)

    }) 

}

function getClassByRate(vote) {

    if (vote >= 8) {
        return 'green'
        } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

Form.addEventListener("submit", (e) => {
    e.preventDefault()

    const SearchTerm = Search.value

    if (SearchTerm) {

        getMovies(SEARCHAPI + SearchTerm)
    
        Search.value = ``

    }

})