
function makeFetchData(method, data) {
    // Default options are marked with *
    return {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'same-origin', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data ? JSON.stringify(data) : null // body data type must match "Content-Type" header
    }
}

function fetchData(url, request) {
    return fetch(url, request);
}

export function getData(url = '') {
    return fetchData(url, makeFetchData('GET'));
}

export function postData(url = '', data = {}) {
    return fetchData(url, makeFetchData('POST', data));
}

export function patchData(url = '', data = {}) {
    return fetchData(url, makeFetchData('PATCH', data));
}

export function putData(url = '', data = {}) {
    return fetchData(url, makeFetchData('PUT', data));
}

export function deleteData(url = '', data = {}) {
    return fetchData(url, makeFetchData('DELETE', data));
}

// postData('https://example.com/answer', { answer: 42 })
//     .then(data => {
//         console.log(data); // JSON data parsed by `data.json()` call
//     });

export function randomInt(minOrMaxValue, maxValue) {
    if (!maxValue) {
        return Math.floor(Math.random() * minOrMaxValue);
    }

    return Math.floor(minOrMaxValue + Math.random() * (maxValue - minOrMaxValue));
}

export function debounce(onInput, func, wait = 300) {
    let timeout;
    function debounced(...args) {
        const later = () => {
            func.apply(this, args);
        };

        clearTimeout(timeout);
        onInput.apply(this, args);
        timeout = setTimeout(later, wait);
    }

    debounced.clear = () => {
        clearTimeout(timeout);
    };

    return debounced;
}
