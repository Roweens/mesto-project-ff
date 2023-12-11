import '../pages/index.css';
import { initialCards } from './cards';
import { closePopup, onOverlayClick, openPopup } from './modal';
import { createCard, deleteCard, onLikeHandle } from './card';

const editPopupTrigger = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardPopupTrigger = document.querySelector('.profile__add-button');
const cardList = document.querySelector('.places__list');
const forms = document.forms;
const profileForm = forms['edit-profile'];
const cardForm = forms['new-place'];
const nameNode = document.querySelector('.profile__title');
const roleNode = document.querySelector('.profile__description');
const imagePopupImage = document.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__caption');
const inputNameNewCardPopup = document.querySelector('input[name=place-name]');
const inputLinkNewCardPopup = document.querySelector('input[name=link]');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const overlaysPopup = document.querySelectorAll('.popup');

export function initDefaultFormValues(formNode, inputNamesArr, valuesObj) {
    inputNamesArr.forEach((inputName) => {
        const inputNode = formNode.querySelector(`input[name=${inputName}]`);
        inputNode.value = valuesObj[inputName];
    });
}

function initProfileForm() {
    const profileForm = document.forms['edit-profile'];
    initDefaultFormValues(profileForm, ['name', 'description'], {
        name: nameNode.textContent,
        description: roleNode.textContent,
    });
}

function initCardPopup({ imageUrl, title }) {
    imagePopupImage.src = imageUrl;
    imagePopupImage.alt = title;
    imagePopupCaption.textContent = title;
}

function onProfileFormSubmit(evt, closeCb) {
    evt.preventDefault();
    nameNode.textContent = document.querySelector('input[name=name]').value;
    roleNode.textContent = document.querySelector('input[name=description]').value;
    closeCb();
}

function onCardFormSubmit(evt, closeCb) {
    evt.preventDefault();
    cardList.prepend(
        createCard(
            { imageUrl: inputLinkNewCardPopup.value, title: inputNameNewCardPopup.value },
            deleteCard,
            openPopup,
            onLikeHandle,
            initCardPopup
        )
    );
    closeCb();
}

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

newCardPopupTrigger.addEventListener('click', () => openPopup(newCardPopup));

buttonsClosePopup.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        closePopup(closeButton.closest('.popup'));
    });
});

overlaysPopup.forEach((overlay) => {
    overlay.addEventListener('click', onOverlayClick);
});

initialCards.forEach((card) => {
    cardList.append(
        createCard(
            { imageUrl: card.link, title: card.name },
            deleteCard,
            openPopup,
            onLikeHandle,
            initCardPopup
        )
    );
});
