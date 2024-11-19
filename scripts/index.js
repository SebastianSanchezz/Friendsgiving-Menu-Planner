// Connection to backend api
const apiUrl = "https://api.friendsgiving-menu.fr.to/";

// DOM Element References
const cardTemplate = document.querySelector("#card-template");
const cardsWrap = document.querySelector(".cards__list");
const addDishButton = document.querySelector(".contributions__add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const addDishForm = document.forms["card-form"];
const rsvpButton = document.querySelector("#RSVP-button");
const rsvpModal = document.querySelector("#rsvp-modal");
const rsvpForm = document.querySelector("#rsvp-form");
const rsvpNameInput = document.querySelector("#rsvp-name-input");
const rsvpList = document.querySelector("#rsvp-list");

// Dinner Menu Category Lists
const startersList = document.querySelector(
  "#starter .dinner-menu-category__list"
);
const sideDishesList = document.querySelector(
  "#side-dishes .dinner-menu-category__list"
);
const mainCoursesList = document.querySelector(
  "#main-courses .dinner-menu-category__list"
);
const dessertsList = document.querySelector(
  "#desserts .dinner-menu-category__list"
);

// Input Fields for Adding a New Dish
const addNewName = document.querySelector("#dish-name-input");
const addNewCategory = document.querySelector("#dish-category-input");
const addNewIngredients = document.querySelector("#dish-ingredients-input");
const addNewImageUrl = document.querySelector("#dish-image-url-input");

// Open and Close Modal Functions
function openPopup(pop) {
  pop.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  pop.addEventListener("mousedown", closeOverlay);
}

function closePopup(pop) {
  pop.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  pop.removeEventListener("mousedown", closeOverlay);
}

function closeOverlay(e) {
  if (e.target.classList.contains("modal_opened")) {
    closePopup(e.target);
  }
}

function closeModalEsc(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    if (modalOpened) closePopup(modalOpened);
  }
}

// Close Buttons for Modals
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

// Open RSVP Modal
rsvpButton.addEventListener("click", () => {
  openPopup(rsvpModal);
});

// Countdown function
function updateCountdown() {
  const thanksgivingDate = new Date("November 28, 2024 00:00:00"); // Thanksgiving Date
  const currentDate = new Date(); // Current Date and Time

  const totalSeconds = (thanksgivingDate - currentDate) / 1000; // Total time remaining in seconds

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  // Format the countdown string
  const countdownText = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

  // Display the countdown in the #countdown element
  const countdownElement = document.getElementById("countdown");
  countdownElement.textContent = `Countdown: ${countdownText}`;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Function to Fetch All RSVPs
function getRSVPs() {
  fetch(`${apiUrl}api/rsvps`)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        data.forEach((rsvp) => renderRsvp(rsvp));
      } else {
        console.error("Unexpected data format:", data);
      }
    })
    .catch((error) => console.error("Error fetching RSVPs:", error));
}

// Handle RSVP Form Submission
rsvpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = rsvpNameInput.value.trim();
  if (name) {
    addRsvp(name);
    rsvpNameInput.value = "";
    closePopup(rsvpModal);
  }
});

// Function to Add a New RSVP
function addRsvp(name) {
  const newRsvp = { name };

  fetch(`${apiUrl}api/rsvps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRsvp),
  })
    .then((response) => response.json())
    .then((data) => {
      renderRsvp(data);
    })
    .catch((error) => console.error("Error adding RSVP:", error));
}

// Function to Render an RSVP Item with Delete Button
function renderRsvp(rsvp) {
  const listItem = document.createElement("li");
  listItem.classList.add("rsvp-item");
  listItem.dataset.id = rsvp._id;

  const nameElement = document.createElement("span");
  nameElement.textContent = rsvp.name;

  // Create the delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("rsvp-delete-button");

  // Create an img element for the delete icon
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "../images/delete-btn.svg";
  deleteIcon.alt = "Delete";
  deleteIcon.style.width = "18px";
  deleteIcon.style.height = "18px";

  // Append the img to the button
  deleteButton.appendChild(deleteIcon);

  listItem.appendChild(nameElement);
  listItem.appendChild(deleteButton);
  rsvpList.appendChild(listItem);

  // Add the event listener to the delete button
  deleteButton.addEventListener("click", () => {
    deleteRsvp(listItem);
  });
}
// Function to Delete an RSVP
function deleteRsvp(listItem) {
  const rsvpId = listItem.dataset.id;

  if (rsvpId) {
    fetch(`${apiUrl}api/rsvps/${rsvpId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        listItem.remove();
      })
      .catch((error) => console.error("Error deleting RSVP:", error));
  }
}

// Add Dish Button Event
addDishButton.addEventListener("click", (e) => {
  e.preventDefault();
  openPopup(cardAddModal);
});

// Fetch All Dishes from the API and Display Them
function loadDishes() {
  fetch(`${apiUrl}api/dishes`)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        data.forEach((dish) => {
          renderCard(dish, cardsWrap);
          renderDinnerMenu(dish);
        });
      } else {
        console.error("Unexpected data format:", data);
      }
    })
    .catch((error) => console.error("Error fetching dishes:", error));
}

// Function to Render Dish in the Dinner Menu Category
function renderDinnerMenu(dish) {
  const normalizedCategory = dish.category.trim(); // Normalize category by trimming spaces and ensuring the case matches the backend

  const dishItem = document.createElement("li");
  dishItem.textContent = dish.name;

  // Logging for debugging
  console.log("Dish category (from API):", dish.category);
  console.log("Normalized category (checked):", normalizedCategory);

  // Ensure list exists before append
  switch (normalizedCategory) {
    case "Starter":
      if (startersList) {
        startersList.appendChild(dishItem);
      } else {
        console.warn("Starters list not found.");
      }
      break;
    case "Side Dish":
      if (sideDishesList) {
        sideDishesList.appendChild(dishItem);
      } else {
        console.warn("Side dishes list not found.");
      }
      break;
    case "Main Course":
      if (mainCoursesList) {
        mainCoursesList.appendChild(dishItem);
      } else {
        console.warn("Main courses list not found.");
      }
      break;
    case "Dessert":
      if (dessertsList) {
        dessertsList.appendChild(dishItem);
      } else {
        console.warn("Desserts list not found.");
      }
      break;
    default:
      console.warn(`Unknown category: ${dish.category}`);
  }
}

// Function to create a new dish card element
function getCardElement(dish) {
  const cardClone = cardTemplate.content.cloneNode(true);

  const card = cardClone.querySelector(".card");
  card.querySelector(".card__title").textContent = dish.name;
  card.querySelector(".card__subtitle").textContent = dish.category;
  card.querySelector(".card__image").src = dish.imageUrl;

  const deleteButton = card.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => deleteDish(dish._id));

  return card;
}

// Render Each Card Using Data
function renderCard(dish, container) {
  const cardElement = getCardElement(dish);
  container.appendChild(cardElement);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    const cardToDelete = deleteButton.closest(".card");
    if (cardToDelete) {
      fetch(`${apiUrl}api/dishes/${dish._id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          cardToDelete.remove();
        })
        .catch((error) => console.error("Error deleting dish:", error));
    }
  });
}

// Submit Add Dish Form
addDishForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = addNewName.value.trim();
  const category = addNewCategory.value.trim();
  const ingredients = addNewIngredients.value.trim();
  const imageUrl = addNewImageUrl.value.trim();

  if (name && category && ingredients && imageUrl) {
    const dishData = { name, category, ingredients, imageUrl };
    addNewDish(dishData);
    closePopup(cardAddModal);
  }
});

// Add a New Dish to the Database
function addNewDish(dishData) {
  fetch(`${apiUrl}api/dishes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dishData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Dish data returned from API:", data);

      if (
        data.dish &&
        data.dish.name &&
        data.dish.category &&
        data.dish.ingredients &&
        data.dish.imageUrl
      ) {
        renderCard(data.dish, cardsWrap);
        renderDinnerMenu(data.dish);
      } else {
        console.error("Incomplete dish data");
      }
    })
    .catch((error) => {
      console.error("Error adding dish:", error);
    });
}

// Initial Data Fetch on Load
window.addEventListener("load", () => {
  loadDishes();
  getRSVPs();
});
