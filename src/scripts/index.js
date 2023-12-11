import '../pages/index.css';
import { initialCards } from './cards';
import {
    closePopupHandler,
    openPopup,
    initProfileForm,
    onProfileFormSubmit,
    onCardFormSubmit,
    closePopup,
    initCardPopup,
} from '../components/modal';
import { createCard, deleteCard, onLikeHandle } from '../components/card';

const editPopupTrigger = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardPopupTrigger = document.querySelector('.profile__add-button');
const cardList = document.querySelector('.places__list');
const forms = document.forms;
const profileForm = forms['edit-profile'];
const cardForm = forms['new-place'];

profileForm.addEventListener('submit', (evt) => {
    onProfileFormSubmit(evt, () => closePopup(editPopup));
});
cardForm.addEventListener('submit', (evt) => {
    onCardFormSubmit(evt, () => closePopup(newCardPopup));
});

editPopupTrigger.addEventListener('click', () => {
    openPopup(editPopup);
    initProfileForm();
});

editPopup.addEventListener('click', (evt) => {
    closePopupHandler(editPopup, evt.target);
});

newCardPopupTrigger.addEventListener('click', () => openPopup(newCardPopup));

newCardPopup.addEventListener('click', (evt) => {
    closePopupHandler(newCardPopup, evt.target);
});

initialCards.forEach((card) => {
    cardList.append(
        createCard(
            { imageUrl: card.link, title: card.name },
            deleteCard,
            openPopup,
            closePopupHandler,
            onLikeHandle,
            initCardPopup
        )
    );
});
