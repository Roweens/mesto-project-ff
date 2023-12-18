import '../pages/index.css';
import { closePopup, onOverlayClick, openPopup } from './modal';
import { createCard, removeCard, onLikeHandle } from './card';
import { clearValidation, enableValidation } from './validation';
import { addCard, editProfile, fetchCards, fetchUser } from './api';

const editPopupTrigger = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_avatar');
const newCardPopupTrigger = document.querySelector('.profile__add-button');
const cardList = document.querySelector('.places__list');
const forms = document.forms;
const profileForm = forms['edit-profile'];
const cardForm = forms['new-place'];
const avatarForm = forms['avatar'];

const nameNode = document.querySelector('.profile__title');
const roleNode = document.querySelector('.profile__description');
const avatarNodeWrapper = document.querySelector('.profile__image-wrapper');
const avatarNode = document.querySelector('.profile__image');
const imagePopupImage = document.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__caption');
const inputNameNewCardPopup = document.querySelector('input[name=place-name]');
const inputLinkNewCardPopup = document.querySelector('input[name=link]');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const overlaysPopup = document.querySelectorAll('.popup');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

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

function renderProfile(profileData) {
    nameNode.textContent = profileData.name;
    roleNode.textContent = profileData.about;
    avatarNode.src = profileData.avatar;
    avatarNode.alt = profileData.name;
}

function renderCards(cardsData) {
    if (cardList.children) {
        cardList.replaceChildren();
    }

    cardsData.forEach((card) => {
        cardList.append(
            createCard(
                card,
                removeCard,
                openPopup,
                onLikeHandle,
                initCardPopup,
                localStorage.getItem('profile_name')
            )
        );
    });
}

function initPage() {
    Promise.all([fetchUser(), fetchCards()]).then(([profileData, cardsData]) => {
        localStorage.setItem('profile_name', profileData.name);
        renderCards(cardsData);
        renderProfile(profileData);
    });
}

function onProfileFormSubmit(evt, closeCb) {
    evt.preventDefault();
    closeCb({
        name: document.querySelector('input[name=name]').value,
        about: document.querySelector('input[name=description]').value,
    });
}

function onCardFormSubmit(evt, closeCb) {
    evt.preventDefault();
    closeCb({
        name: inputNameNewCardPopup.value,
        link: inputLinkNewCardPopup.value,
    });
}

profileForm.addEventListener('submit', (evt) => {
    onProfileFormSubmit(evt, (newProfile) => {
        editProfile(newProfile)
            .then((res) => {
                renderProfile(res);
            })
            .then(() => {
                closePopup(editPopup);
            });
    });
});

cardForm.addEventListener('submit', (evt) => {
    onCardFormSubmit(evt, (newCard) => {
        addCard(newCard)
            .then((card) => {
                cardList.append(
                    createCard(
                        card,
                        removeCard,
                        openPopup,
                        onLikeHandle,
                        initCardPopup,
                        localStorage.getItem('profile_name')
                    )
                );
            })
            .then(() => {
                closePopup(newCardPopup);
            });
    });
});

editPopupTrigger.addEventListener('click', () => {
    openPopup(editPopup);
    clearValidation(profileForm, validationConfig);
    initProfileForm();
});

avatarNodeWrapper.addEventListener('click', () => {
    openPopup(avatarPopup);
    clearValidation(avatarForm, validationConfig);
});

newCardPopupTrigger.addEventListener('click', () => {
    openPopup(newCardPopup);
    clearValidation(cardForm, validationConfig);
});

buttonsClosePopup.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        closePopup(closeButton.closest('.popup'));
    });
});

overlaysPopup.forEach((overlay) => {
    overlay.addEventListener('click', onOverlayClick);
});

enableValidation(validationConfig);
initPage();
