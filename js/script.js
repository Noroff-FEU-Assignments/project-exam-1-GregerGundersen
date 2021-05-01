const mediaUrl =
  "https://dionysus.no/projectexam/wp-json/wp/v2/posts/?_embed=wp:featuredmedia";
const recipesOut = document.querySelector("div.recipes");

/* Fetch post and media */
fetch(mediaUrl)
  .then((response) => response.json())
  .then((data) => displayMedia(data))
  .catch((error) => console.error("Error: " + error));

function displayMedia(recipes) {
  for (let recipe of recipes) {
    console.log(recipe);
    let imgSrc =
      recipe._embedded["wp:featuredmedia"][0].media_details.sizes.medium
        .source_url;
    let altText = recipe._embedded["wp:featuredmedia"][0].alt_text;
    recipesOut.innerHTML += `
                            <div class="recipeblock">
                              <div class="recipeimagecontainer">
                                <img src="${imgSrc}" alt="${altText}"></img>
                              </div>
                              <h2>${recipe.title.rendered}</h2>

                            </div>`;
  }
}
/* style = "background-image:url('${imgSrc}')"; */
