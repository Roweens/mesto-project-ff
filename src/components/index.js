import '../pages/index.css';
import { closePopup, openPopup } from './modal';
import { createCard, removeCard, onLikeHandle } from './card';
import { clearValidation, enableValidation } from './validation';
import { addCard, editProfile, errorHandler, fetchCards, fetchUser, updateAvatar } from './api';
import { validationConfig } from './constants';
import { handleSubmit } from './utils';

const editPopupTrigger = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_avatar');
const newCardPopupTrigger = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup_type_image');
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
const popupOverlays = document.querySelectorAll('.popup');
const profileNameInput = document.querySelector('input[name=name]');
const profileRoleInput = document.querySelector('input[name=description]');
const profileAvatarInput = document.querySelector('input[name=avatar]');

function initDefaultFormValues(formNode, inputNamesArr, valuesObj) {
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
    openPopup(imagePopup);
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
            createCard({
                card,
                deleteCb: removeCard,
                openPopupCb: openPopup,
                likeCb: onLikeHandle,
                cardClickCb: initCardPopup,
                cardOwner: localStorage.getItem('profile_name'),
            })
        );
    });
}

function initPage() {
    Promise.all([fetchUser(), fetchCards()])
        .then(([profileData, cardsData]) => {
            localStorage.setItem('profile_name', profileData.name);
            renderCards(cardsData);
            renderProfile(profileData);
        })
        .catch(errorHandler);
}

profileForm.addEventListener('submit', (evt) => {
    async function makeRequest() {
        return editProfile({
            name: profileNameInput.value,
            about: profileRoleInput.value,
        })
            .then((res) => {
                renderProfile(res);
            })
            .then(() => {
                closePopup(editPopup);
            });
    }

    handleSubmit(makeRequest, evt);
});

cardForm.addEventListener('submit', (evt) => {
    async function makeRequest() {
        return addCard({
            name: inputNameNewCardPopup.value,
            link: inputLinkNewCardPopup.value,
        })
            .then((card) => {
                cardList.prepend(
                    createCard({
                        card,
                        deleteCb: removeCard,
                        openPopupCb: openPopup,
                        likeCb: onLikeHandle,
                        cardClickCb: initCardPopup,
                        cardOwner: localStorage.getItem('profile_name'),
                    })
                );
            })
            .then(() => {
                closePopup(newCardPopup);
                evt.target.reset();
            });
    }
    handleSubmit(makeRequest, evt);
});

avatarForm.addEventListener('submit', (evt) => {
    async function makeRequest() {
        return updateAvatar({
            avatar: profileAvatarInput.value,
        })
            .then((newProfileData) => {
                renderProfile(newProfileData);
            })
            .then(() => {
                closePopup(avatarPopup);
            });
    }

    handleSubmit(makeRequest, evt);
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

popupOverlays.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    });
});

enableValidation(validationConfig);
initPage();
