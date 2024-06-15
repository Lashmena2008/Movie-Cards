
const getPosts = async () => {
  try {
    const response = await fetch("/aa.json");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const wrapper = document.getElementById("wrapper");
const select = document.getElementById("select");

const createMovie = (movie) => {
  const movieCard = document.createElement("div");
  const movieImage = document.createElement("img");
  const movieTitle = document.createElement("h1");

  movieCard.className = "movie_card";
  movieImage.className = "movie_image";
  movieTitle.className = "movie_title";



  if (movie.posterURL) {
    movieImage.src = movie.posterURL;
  } else {
    movieImage.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1f4C-cWV03_czRXhL1THkOdS9RDnAtPxRnA&s";
  }

  movieImage.alt = movie.title;

 
  movieImage.onerror = () => {
    movieImage.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1f4C-cWV03_czRXhL1THkOdS9RDnAtPxRnA&s";
  };

  movieTitle.textContent = movie.title;

  movieCard.append(movieImage, movieTitle);

  wrapper.append(movieCard);
};

const fetchMovies = (type) => {
  fetch(`https://api.sampleapis.com/movies/${type}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      wrapper.innerHTML = ""; 
      data.forEach((movie) => {
        createMovie(movie);
      });
    })
    .catch((err) => {
      console.error(err);
    })
};

fetchMovies(select.value);

select.addEventListener("change", (e) => {
  const type = e.target.value;
  fetchMovies(type);
});