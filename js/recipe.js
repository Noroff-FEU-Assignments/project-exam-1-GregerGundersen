const queryString = window.location.search;
const id = new URLSearchParams(queryString).get("id");
const recipeOut = document.querySelector("div.recipe");
const title = document.querySelector("title");

const recipeUrl = `https://dionysus.no/projectexam/wp-json/wp/v2/posts/${id}?_embed=wp:featuredmedia`;
fetch(recipeUrl)
  .then((response) => response.json())
  .then((data) => {
    displayRecipe(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const displayRecipe = (data) => {
  console.log(data);
  let content = `
        <div class="recipecontainer">
          <img class="rcpimg" src="${data._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url}" alt="${data._embedded["wp:featuredmedia"][0].alt_text}">
          <div class="modal">
            <img class="modalimage">
          </div>
          <h1>${data.title.rendered}</h1>
          ${data.excerpt.rendered}
          ${data.content.rendered}
      `;
  recipeOut.innerHTML = content;
  title.innerHTML = `StudentMat | ${data.title.rendered}`;

  /* Separate ingredients and instructions in different containers */
  const ingredHeader = document.querySelector(
    ".recipecontainer h2:first-of-type"
  );
  const ingredList = document.querySelector(".recipecontainer ul");

  const ingredContainer = document.createElement("div");
  ingredContainer.classList.add("ingredcontainer");
  ingredHeader.parentNode.insertBefore(ingredContainer, ingredHeader);
  ingredContainer.appendChild(ingredHeader);
  ingredContainer.appendChild(ingredList);

  const instrHeader = document.querySelector(".ingredcontainer + h2");
  console.log(instrHeader);
  const instrList = document.querySelector(".recipecontainer ol");
  console.log(instrList);

  const instrContainer = document.createElement("div");
  instrContainer.classList.add("instrcontainer");
  instrHeader.parentNode.insertBefore(instrContainer, instrHeader);
  instrContainer.appendChild(instrHeader);
  instrContainer.appendChild(instrList);

  const modal = document.querySelector(".modal");
  const imageSource = document.querySelector(".rcpimg");
  const modalImage = document.querySelector(".modalimage");

  const modalOpen = () => {
    modal.style.display = "block";
    modalImage.src = `${data._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url}`;
    if ((modal.style.display = "block")) {
      modalImage.hide();
    }
  };

  imageSource.addEventListener("click", modalOpen);
};
