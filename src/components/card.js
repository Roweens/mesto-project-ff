import { addLike, deleteCard, deleteLike, fetchCards, getLike } from './api';

const cardTemplate = document.querySelector('#card-template').content;

export function onLikeHandle(likeElement, cardId, likeCountElement) {
    if (likeElement.classList.contains('card__like-button_is-active')) {
        deleteLike(cardId).then((res) => {
            likeCountElement.textContent = res.likes.length;
            likeElement.classList.remove('card__like-button_is-active');
        });
    } else {
        addLike(cardId).then((res) => {
            likeCountElement.textContent = res.likes.length;
            likeElement.classList.add('card__like-button_is-active');
        });
    }
}

export function createCard(card, deleteCb, openPopupCb, likeCb, cardClickCb, cardOwner) {
    const { link, name, likes, owner, _id } = card;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    const imagePopupTrigger = cardElement.querySelector('.card__image');
    const imagePopup = document.querySelector('.popup_type_image');
    const hasLiked = card.likes && card.likes.find((like) => like.name === cardOwner);
    const canDelete = owner.name === cardOwner;

    imagePopupTrigger.addEventListener('click', () => {
        openPopupCb(imagePopup);
        cardClickCb({ link, name });
    });

    likeButton.addEventListener('click', (evt) => likeCb(evt.target, _id, likeCount));
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    likeCount.textContent = likes.length;

    if (hasLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (!canDelete) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', () => deleteCb(cardElement, _id));
    }

    return cardElement;
}

export function removeCard(cardElement, cardId) {
    deleteCard(cardId).then(() => {
        cardElement.remove();
    });
}
