const COHORT_ID = 'cohort-magistr-2';

const BASE_URL = 'https://mesto.nomoreparties.co';

const config = {
    baseUrl: `${BASE_URL}/v1/${COHORT_ID}`,
    headers: {
        authorization: '56147acf-ab2e-4d54-b936-8e335a9a93fd',
        'Content-Type': 'application/json',
    },
};

function responseHandler(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

function errorHandler(err) {
    console.log(err);
}

export async function fetchUser() {
    return await fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
        .then(responseHandler)
        .catch(errorHandler);
}

export async function updateAvatar(link) {
    return await fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(link),
    })
        .then(responseHandler)
        .catch(errorHandler);
}

export async function fetchCards() {
    return await fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
        .then(responseHandler)
        .catch(errorHandler);
}

export async function editProfile(newProfile) {
    return await fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(newProfile),
    })
        .then(responseHandler)
        .catch(errorHandler);
}

export async function addCard(newCard) {
    return await fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newCard),
    })
        .then(responseHandler)
        .catch(errorHandler);
}

export async function deleteCard(cardId) {
    return await fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(responseHandler)
        .catch(errorHandler);
}

export async function addLike(cardId) {
    return await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(responseHandler)
        .catch(errorHandler);
}

export async function deleteLike(cardId) {
    return await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(responseHandler)
        .catch(errorHandler);
}
