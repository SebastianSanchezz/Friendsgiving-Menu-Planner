const initialCards = [
  {
    name: "Lobster Mac and Cheese",
    type: "Side Dish",
    link: "./images/Lobster Mac and Cheese.jpg",
    chefName: "Arthur",
  },
  {
    name: "Apple Flambé Pie",
    type: "Dessert",
    link: "./images/Apple Flambé Pie.jpg",
    chefName: "Cory",
  },
  {
    name: "Antipasto Skewers",
    type: "Appetizer",
    link: "./images/Antipasto Skewers.jpg",
    chefName: "Luciano",
  },
  {
    name: "Salmon Wellington",
    type: "Main Dish",
    link: "./images/Salmon Wellington.jpg",
    chefName: "Katrina",
  },
];

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const addDishbutton = document.querySelector(".contributions__add-button");
const addDishModal = document.querySelector("#adddish-modal");
const cardModalCaption = document.querySelector(".modal__caption");
const addDishImage = document.querySelector(".modal__image");
const cardsWrap = document.querySelector(".cards__list");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddForm = document.forms["card-form"];

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
    closePopup(modalOpened);
  }
}

// profileEditButton.addEventListener("click", () => {
//   profileInputTilte.value = profilename.textContent;
//   profileInputDescription.value = profiledescription.textContent;
//   openPopup(profileEditModal);
// });

const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

// profileEditForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   profilename.textContent = profileInputTilte.value;
//   profiledescription.textContent = profileInputDescription.value;
//   closePopup(profileEditModal);
// });

addDishbutton.addEventListener("click", (e) => {
  e.preventDefault();
  openPopup(cardAddModal);
});

function rendercard(data, wrapper) {
  const cardElement = getcardElement(data);
  wrapper.prepend(cardElement);
}

initialCards.forEach((data) => rendercard(data, cardsWrap));

function getcardElement(cardData) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardSubtitleEl = cardElement.querySelector(".card__subtitle");
  const cardChefEl = cardElement.querySelector(".card__chef-name");

  deleteButton.addEventListener("click", () => {
    const cardToDelete = deleteButton.closest(".card");
    if (cardToDelete) {
      cardToDelete.remove();
    }
  });
  cardImageEl.addEventListener("click", (e) => {
    e.preventDefault();
    cardModalCaption.textContent = cardData.name;
    openPopup(previewImageModal);
  });

  cardTitleEl.textContent = cardData.name;
  cardSubtitleEl.textContent = cardData.name;
  cardChefEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}
const addNewName = document.querySelector("#dish-input");
const addNewType = document.querySelector("#dish-input");
const addNewChefName = document.querySelector("#dish-input");
const addNewImage = document.querySelector("#dish-input-url");

cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputCard = {
    name: addNewName.value,
    link: addNewImage.value,
    type: addNewType.value,
    chefName: addNewChefName.value,
  };
  rendercard(inputCard, cardsWrap);
  e.target.reset();
  closePopup(cardAddModal);
});
