function onPopupKeyDown(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = Array.from(document.querySelectorAll('.popup')).find((popup) =>
            popup.classList.contains('popup_is-opened')
        );
        closePopup(openedPopup);
    }
}

export function onOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
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
