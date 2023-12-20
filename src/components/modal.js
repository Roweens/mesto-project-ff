const popups = document.querySelectorAll('.popup');

function onPopupKeyDown(evt) {
    if (evt.key === 'Escape') {
        popups.forEach(closePopup);
    }
}

export function openPopup(popupNode) {
    popupNode.classList.add('popup_is-opened');
    document.addEventListener('keydown', onPopupKeyDown);
}

export function closePopup(popupNode) {
    popupNode.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', onPopupKeyDown);
}
