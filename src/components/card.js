const cardTemplate = document.querySelector('#card-template').content;

export function onLikeHandle(evt) {
    evt.currentTarget.classList.toggle('card__like-button_is-active');
}

export function createCard(
    { imageUrl, title },
    deleteCb,
    openPopupCb,
    closePopupCb,
    likeCb,
    cardClickCb
) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const imagePopupTrigger = cardElement.querySelector('.card__image');
    const imagePopup = document.querySelector('.popup_type_image');
    imagePopupTrigger.addEventListener('click', () => {
        openPopupCb(imagePopup);
        cardClickCb({ imageUrl, title });
    });

    imagePopup.addEventListener('click', (evt) => {
        closePopupCb(imagePopup, evt.target);
    });
    likeButton.addEventListener('click', likeCb);
    cardElement.querySelector('.card__image').src = imageUrl;
    cardElement.querySelector('.card__image').alt = title;
    cardElement.querySelector('.card__title').textContent = title;

    deleteButton.addEventListener('click', () => deleteCb(cardElement));

    return cardElement;
}

export function deleteCard(card) {
    card.remove();
}
