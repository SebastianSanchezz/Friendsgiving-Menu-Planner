const initialCards = [
  {
    name: "",
    type: "",
    link: "",
  },
  {
    name: "",
    type: "",
    link: "",
  },
  {
    name: "",
    type: "",
    link: "",
  },
  {
    name: "",
    type: "",
    link: "",
  },
];

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardDishTypeEl = cardElement.querySelector(".card__subtitle");
  const cardImage = cardElement.querySelector(".card__image");

  cardNameEl.textContent = data.name;
  cardDishTypeEl.textContent = data.type;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  return cardElement;
}
