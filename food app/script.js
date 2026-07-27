let allFoods = [];
let cartCount = 0;

const foodList = document.getElementById("food-list");
const categoriesContainer = document.getElementById("categories");
const searchInput = document.getElementById("search-input");
const cartCounter = document.getElementById("cart-count");


// Load external JSON file
fetch("data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Could not load JSON data");
    }

    return response.json();
  })
  .then(data => {

    // App information
    document.getElementById("app-name").textContent =
      data.app.name;

    document.getElementById("app-tagline").textContent =
      data.app.tagline;


    // Store food data
    allFoods = data.foods;


    // Display categories
    displayCategories(data.categories);


    // Display popular food
    displayFoods(
      allFoods.filter(food => food.popular)
    );

  })
  .catch(error => {
    console.error(error);

    foodList.innerHTML =
      "<p>Unable to load food data.</p>";
  });


// Display categories
function displayCategories(categories) {

  categoriesContainer.innerHTML = "";

  categories.forEach(category => {

    const button = document.createElement("button");

    button.className = "category";

    button.innerHTML = `
      <span class="category-icon">
        ${category.icon}
      </span>

      ${category.name}
    `;

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".category")
        .forEach(btn =>
          btn.classList.remove("active")
        );

      button.classList.add("active");

      if (category.name === "All") {

        displayFoods(allFoods);

      } else {

        const filteredFoods = allFoods.filter(
          food =>
            food.category === category.name
        );

        displayFoods(filteredFoods);
      }
    });

    categoriesContainer.appendChild(button);
  });
}


// Display food cards
function displayFoods(foods) {

  foodList.innerHTML = "";

  if (foods.length === 0) {

    foodList.innerHTML =
      "<p>No food found.</p>";

    return;
  }


  foods.forEach(food => {

    const card = document.createElement("div");

    card.className = "food-card";

    card.innerHTML = `
      <img
        src="${food.image}"
        alt="${food.name}"
      >

      <div class="food-info">

        <h3>${food.name}</h3>

        <p>
          ${food.description}
        </p>

        <div class="price">
          R${food.price.toFixed(2)}
        </div>

        <button
          class="add-button"
          onclick="addToCart()"
        >
          Add to Cart
        </button>

      </div>
    `;

    foodList.appendChild(card);
  });
}


// Search food
searchInput.addEventListener(
  "input",
  function () {

    const searchTerm =
      searchInput.value.toLowerCase();

    const filteredFoods =
      allFoods.filter(food =>

        food.name
          .toLowerCase()
          .includes(searchTerm)

        ||

        food.description
          .toLowerCase()
          .includes(searchTerm)

      );

    displayFoods(filteredFoods);
  }
);


// Add food to cart
function addToCart() {

  cartCount++;

  cartCounter.textContent =
    cartCount;
}