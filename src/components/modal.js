import { deleteCard, onLikeHandle, createCard } from './card';

function onPopupKeyDown(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = Array.from(document.querySelectorAll('.popup')).find((popup) =>
            popup.classList.contains('popup_is-opened')
        );
        openedPopup.classList.remove('popup_is-opened');
    }
}

function initDefaultFormValues(formNode, inputNamesArr, valuesObj) {
    inputNamesArr.forEach((inputName) => {
        const inputNode = formNode.querySelector(`input[name=${inputName}]`);
        inputNode.value = valuesObj[inputName];
    });
}

export function openPopup(popupNode) {
    popupNode.classList.add('popup_is-animated');
    setTimeout(() => {
        popupNode.classList.add('popup_is-opened');
    }, 0);
    document.addEventListener('keydown', onPopupKeyDown);
}

export function closePopup(popupNode) {
    popupNode.classList.remove('popup_is-opened');
}

export function closePopupHandler(popupNode, clickNode) {
    if (clickNode.classList.contains('popup__close') || clickNode.classList.contains('popup')) {
        closePopup(popupNode);
    }
    document.removeEventListener('keydown', onPopupKeyDown);
}

export function initProfileForm() {
    const profileForm = document.forms['edit-profile'];
    const nameNode = document.querySelector('.profile__title');
    const roleNode = document.querySelector('.profile__description');
    initDefaultFormValues(profileForm, ['name', 'description'], {
        name: nameNode.textContent,
        description: roleNode.textContent,
    });
}

export function initCardPopup({ imageUrl, title }) {
    document.querySelector('.popup__image').src = imageUrl;
    document.querySelector('.popup__caption').textContent = title;
}

export function onProfileFormSubmit(evt, closeCb) {
    evt.preventDefault();
    const nameNode = document.querySelector('.profile__title');
    const roleNode = document.querySelector('.profile__description');
    nameNode.textContent = document.querySelector('input[name=name]').value;
    roleNode.textContent = document.querySelector('input[name=description]').value;
    closeCb();
}

export function onCardFormSubmit(evt, closeCb) {
    evt.preventDefault();
    const titleValue = document.querySelector('input[name=place-name]').value;
    const linkValue = document.querySelector('input[name=link]').value;
    const cardList = document.querySelector('.places__list');

    cardList.append(
        createCard(
            { imageUrl: linkValue, title: titleValue },
            deleteCard,
            openPopup,
            closePopupHandler,
            onLikeHandle,
            initCardPopup
        )
    );
    closeCb();
}
