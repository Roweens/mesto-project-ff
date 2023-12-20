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

export function errorHandler(err) {
    console.log(err);
}

function request(url, options) {
    return fetch(url, options).then(responseHandler);
}

export async function fetchUser() {
    return await request(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    });
}

export async function updateAvatar(link) {
    return await request(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(link),
    });
}

export async function fetchCards() {
    return await request(`${config.baseUrl}/cards`, {
        headers: config.headers,
    });
}

export async function editProfile(newProfile) {
    return await request(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(newProfile),
    });
}

export async function addCard(newCard) {
    return await request(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newCard),
    });
}

export async function deleteCard(cardId) {
    return await request(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    });
}

export async function addLike(cardId) {
    return await request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    });
}

export async function deleteLike(cardId) {
    return await request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    });
}
