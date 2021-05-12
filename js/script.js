const carouselTwo = document.querySelector(".carouseltwo");
let counter = 1;
let carouselUrl = `https://dionysus.no/projectexam/wp-json/wp/v2/posts/?_embed=wp:featuredmedia&per_page=4&page=${counter}`;

fetch(carouselUrl)
  .then((response) => response.json())
  .then((data) => displayCarousel(data))
  .catch((error) => console.error("Error: " + error));

const displayCarousel = (recipes) => {
  carouselTwo.innerHTML = "";
  for (let recipe of recipes) {
    // console.log(recipe);
    let id = recipe.id;
    let imgSrc =
      recipe._embedded["wp:featuredmedia"][0].media_details.sizes.full
        .source_url;
    let altText = recipe._embedded["wp:featuredmedia"][0].alt_text;
    carouselTwo.innerHTML += `
                            <div class="carouselcontainer">
                              <a class="carousellink" href="https://projectexam.netlify.app/recipe.html/?id=${id}">
                                  <img src="${imgSrc}" alt="${altText}">
                              </a>
                            </div>
                            `;
  }
};

const nextBtn = document.querySelector(".fa-arrow-circle-right");
const prevBtn = document.querySelector(".fa-arrow-circle-left");

const carouselRight = () => {
  if (counter >= 1 && counter <= 3) {
    counter++;
  } else {
    counter = 1;
  }
  carouselUrl = `https://dionysus.no/projectexam/wp-json/wp/v2/posts/?_embed=wp:featuredmedia&per_page=4&page=${counter}`;

  fetch(carouselUrl)
    .then((response) => response.json())
    .then((data) => displayCarousel(data))
    .catch((error) => console.error("Error: " + error));
};

const carouselLeft = () => {
  if (counter > 1) {
    counter--;
    console.log(counter);
  } else {
    counter = 1;
  }
  carouselUrl = `https://dionysus.no/projectexam/wp-json/wp/v2/posts/?_embed=wp:featuredmedia&per_page=4&page=${counter}`;

  fetch(carouselUrl)
    .then((response) => response.json())
    .then((data) => displayCarousel(data))
    .catch((error) => console.error("Error: " + error));
};
