export function textIsEmpty(text) {
    const emptyRe = /^\s*$/
    return (!text || emptyRe.test(text));
}

export function textIsDate(text) {
    const dateRe = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
    const newDate = new Date(text);
    return Number.isSafeInteger(newDate.getTime()) && dateRe.test(text);
}

export function textIsNumber(text) {
    return !isNaN(Number(text));
}

export function textIsEmail(text) {
    //taken from top answer in this post https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    const emailRe = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    return emailRe.test(text);
}

export function textIsPassword(text) {
    const digitRe = /\d+/;
    const lowerCaseRe = /[a-z]+/;
    const upperCaseRe = /[A-Z]+/;
    const specialSymbolRe = /[^0-9A-Za-z]+/;
    if (!digitRe.test(text)) {
        return 'Password must contain at least 1 digit.'
    }
    if (!lowerCaseRe.test(text)) {
        return 'Password must contain at least 1 lower case letter.'
    }
    if (!upperCaseRe.test(text)) {
        return 'Password must contain at least 1 upper case letter.'
    }
    if (!specialSymbolRe.test(text)) {
        return 'Password must contain at least 1 special symbol.'
    }
    if (text.length < 8) {
        return 'Password length must be at least 8 symbols.'
    }
    return true;
}