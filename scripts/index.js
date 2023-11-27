// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(card, deleteCb) {
    const { imageUrl, title } = card;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = imageUrl;
    cardElement.querySelector('.card__title').textContent = title;

    deleteButton.addEventListener('click', () => deleteCb(title));

    cardList.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteCard(title) {
    const selectedCard = Array.from(cardList.children).find((card) =>
        card.innerHTML.includes(title)
    );
    selectedCard.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    addCard({ imageUrl: card.link, title: card.name }, deleteCard);
});
