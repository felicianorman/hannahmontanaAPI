import axios from "axios";
import { IMovie } from "./models/IMovie";
import { IMovieExtended } from "./models/IMovieExtended";

let myWrapper :HTMLDivElement = document.getElementById("wrapper") as HTMLDivElement;

//Hämtar data för att söka efter API
axios
  .get("http://omdbapi.com?apikey=416ed51a&s=hannah%20montana")
  .then((response) => {
    console.log(response.data.Search);

    createHTML(response.data.Search);
  });

//Måste ge movies (response.data.Search) en datatyp
const createHTML = (movies: IMovie[]) => {
  //Skapar HTML för att visa filmer/serier
  for (let i = 0; i < movies.length; i++) {
    console.log(movies[i].Title);

    let container: HTMLDivElement = document.createElement("div");
    let title: HTMLHeadingElement = document.createElement("h3");
    let img: HTMLImageElement = document.createElement("img");

    container.addEventListener("click", () => {
      handleClick(movies[i]);
    });

    title.innerHTML = movies[i].Title;
    img.src = movies[i].Poster;
    img.alt = movies[i].Title;

    container.appendChild(title);
    container.appendChild(img);

    container.classList.add("container");
    container.setAttribute("data-bs-toggle", "modal");
    container.setAttribute("data-bs-target", "#exampleModal");

    myWrapper.appendChild(container);
  }
};

const handleClick = (movie: IMovie) => {
  console.log("Du klickade på", movie.imdbID);

  axios
    .get<IMovieExtended>("http://omdbapi.com?apikey=416ed51a&i=" + movie.imdbID)
    .then((response) => {
      console.log(response.data);

      //Modal title
      let modalTitle: HTMLHeadingElement = document.getElementById(
        "exampleModalLabel"
      ) as HTMLHeadingElement;
      modalTitle.innerHTML = movie.Title;

      //Modal body
      let modalBody: HTMLDivElement = document.getElementById(
        "modal-body"
      ) as HTMLDivElement;

      let img: HTMLImageElement = document.createElement("img");
      let actors: HTMLHeadingElement = document.createElement("h6");
      let plot: HTMLParagraphElement = document.createElement("p");

      img.src = response.data.Poster;
      actors.innerHTML = response.data.Actors;
      plot.innerHTML = response.data.Plot;

      modalBody.innerHTML = " ";

      modalBody.appendChild(img);
      modalBody.appendChild(actors);
      modalBody.appendChild(plot);

    });
};
