const cardTemplate = document.querySelector('#card-template').content;

const cardList = document.querySelector('.places__list');

function addCard(card, deleteCb) {
    const { imageUrl, title } = card;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = imageUrl;
    cardElement.querySelector('.card__title').textContent = title;

    deleteButton.addEventListener('click', () => deleteCb(title));

    cardList.append(cardElement);
}

function deleteCard(title) {
    const selectedCard = Array.from(cardList.children).find((card) =>
        card.innerHTML.includes(title)
    );
    selectedCard.remove();
}

initialCards.forEach((card) => {
    addCard({ imageUrl: card.link, title: card.name }, deleteCard);
});
