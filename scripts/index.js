const cardTemplate = document.querySelector('#card-template').content;

const cardList = document.querySelector('.places__list');

function createCard({ imageUrl, title }, deleteCb) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = imageUrl;
    cardElement.querySelector('.card__image').alt = title;
    cardElement.querySelector('.card__title').textContent = title;

    deleteButton.addEventListener('click', () => deleteCb(cardElement));

    return cardElement;
}

function deleteCard(card) {
    card.remove();
}

initialCards.forEach((card) => {
    cardList.append(createCard({ imageUrl: card.link, title: card.name }, deleteCard));
});
