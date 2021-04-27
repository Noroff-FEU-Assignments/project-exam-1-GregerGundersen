const url = "https://dionysus.no/projectexam/wp-json/wp/v2/posts";
const recipesOut = document.querySelector("div.test");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
    displayRecipes(data);
  })
  .catch((error) => {
    console.error("Error:", error);
    recipesOut.innerHTML = `
    <div id="error">
    <h2 >Error:</h2>
    <p>${error}</p>
    </div>`;
  });

const displayRecipes = (recipes) => {
  let recipeList = "";
  for (let recipe of recipes) {
    // console.log(product);
    recipeList += `
        <div>
            <a href="https://projectexam.netlify.app/recipe.html?id=${recipe.id}"><h2>${recipe.title.rendered}</h2></a>
            ${recipe.excerpt.rendered}
            ${recipe.content.rendered}
        </div>
        `;
  }
  recipesOut.innerHTML = recipeList;
};
