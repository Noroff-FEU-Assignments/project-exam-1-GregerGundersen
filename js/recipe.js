const queryString = window.location.search;
const id = new URLSearchParams(queryString).get("id");
const recipeOut = document.querySelector("div.product");
const title = document.querySelector("title");

const recipeUrl = `http://dionysus.no/projectexam/wp-json/wp/v2/posts/${id}`;
fetch(recipeUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
    displayRecipe(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const displayRecipe = (data) => {
  console.log(data);
  let content = `
        <h2>${data.title.rendered}</h2>
      `;
  recipeOut.innerHTML = content;
  title.innerHTML = "StudentMat | ";
};
