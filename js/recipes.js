const mediaUrl =
  "https://dionysus.no/projectexam/wp-json/wp/v2/posts/?_embed=wp:featuredmedia&page=1";
const recipesOut = document.querySelector("div.recipes");

/* Fetch post and media */
fetch(mediaUrl)
  .then((response) => response.json())
  .then((data) => displayMedia(data))
  .catch((error) => console.error("Error: " + error));

function displayMedia(recipes) {
  recipesOut.innerHTML = "";
  for (let recipe of recipes) {
    // console.log(recipe);
    let id = recipe.id;
    let imgSrc =
      recipe._embedded["wp:featuredmedia"][0].media_details.sizes.full
        .source_url;
    let altText = recipe._embedded["wp:featuredmedia"][0].alt_text;
    recipesOut.innerHTML += `
                            <a class="recipelink" href="https://projectexam.netlify.app/recipe.html/?id=${id}"
                            <div class="recipeblock">
                              <div class="recipeimagecontainer">
                                <img src="${imgSrc}" alt="${altText}"></img>
                              </div>
                              <h2 class="recipeheader">${recipe.title.rendered}</h2>

                            </div>
                            </a>`;
  }
}

/* Load more posts */
const loadMoreBtn = document.querySelector('button[name="loadmore"]');
let pageCounter = 1;
let loadMoreUrl = `https://dionysus.no/projectexam/wp-json/wp/v2/posts/?_embed=wp:featuredmedia&page=${pageCounter}`;

function displayMoreMedia(recipes) {
  for (let recipe of recipes) {
    // console.log(recipe);
    let id = recipe.id;
    let imgSrc =
      recipe._embedded["wp:featuredmedia"][0].media_details.sizes.full
        .source_url;
    let altText = recipe._embedded["wp:featuredmedia"][0].alt_text;
    recipesOut.innerHTML += `
                            <a class="recipelink" href="https://projectexam.netlify.app/recipe.html/?id=${id}"
                            <div class="recipeblock">
                              <div class="recipeimagecontainer">
                                <img src="${imgSrc}" alt="${altText}"></img>
                              </div>
                              <h2 class="recipeheader">${recipe.title.rendered}</h2>

                            </div>
                            </a>`;
  }
}

const lastPage = () => {
  loadMoreBtn.innerHTML = "Siste side";
  loadMoreBtn.disabled = true;
};

const loadPosts = () => {
  pageCounter++;
  loadMoreUrl = `https://dionysus.no/projectexam/wp-json/wp/v2/posts/?_embed=wp:featuredmedia&page=${pageCounter}`;
  console.log(loadMoreUrl);
  fetch(loadMoreUrl)
    .then((response) => response.json())
    .then((data) => displayMoreMedia(data))
    .catch((error) => lastPage());
};

loadMoreBtn.addEventListener("click", loadPosts);

/* Categories */
// const ctgMiddag = document.querySelector("#middag");

// const checkbox = () => {
//   if (ctgMiddag.checked === true) {
//     console.log("Checked");
//   } else {
//     console.log("Unchecked");
//   }
// };
// ctgMiddag.addEventListener("change", checkbox());
