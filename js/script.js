const carouselTwo = document.querySelector(".carouseltwo");
const headerImage = document.querySelector(".headerimg");
let counter = 1;
let carouselUrl = `https://dionysus.no/projectexam/wp-json/wp/v2/posts/?_embed=wp:featuredmedia&per_page=4&page=${counter}`;
let headerUrl = `https://dionysus.no/projectexam/wp-json/wp/v2/posts/?_embed=wp:featuredmedia&per_page=4&page=1`;

fetch(carouselUrl)
  .then((response) => response.json())
  .then((data) => displayCarousel(data))
  .catch((error) => console.error("Error: " + error));

const displayCarousel = (recipes) => {
  /* Clear carousel and display four recipes */
  carouselTwo.innerHTML = "";
  console.log(headerImage.innerHTML);
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
                                  <h3>${recipe.title.rendered}</h3>
                              </a>
                            
                            </div>
                            `;
  }
};

fetch(headerUrl)
  .then((response) => response.json())
  .then((data) => displayHeader(data))
  .catch((error) => console.error("Error: " + error));
const displayHeader = (recipes) => {
  /* Display header image */
  headerImage.innerHTML = `
                          <img src="${recipes[1]._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url}">
                          <h1>${recipes[1].title.rendered}</h1>
                          `;
  headerImage.setAttribute(
    "href",
    `https://projectexam.netlify.app/recipe.html/?id=${id}`
  );
};
const nextBtn = document.querySelector(".fa-arrow-circle-right");
const prevBtn = document.querySelector(".fa-arrow-circle-left");
/* Move to next page of carousel */
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

/* Move to previous page of carousel */
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
