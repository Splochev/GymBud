export function textIsEmpty(text) {
    const emptyRe = /^\s*$/;
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
    if (text && text.length) {
        const emailRe = /^[\w-+\.]+@([\w-]+\.)+[\w-]{2,4}$/;;
        return emailRe.test(text);
    } else {
        return true;
    }
}

export function textContainsEmptySpaces(text) {
    if (text && text.length) {
        const emailRe = /\s+/;
        return emailRe.test(text);
    } else {
        return false;
    }
}

export function textIsPassword(text) {
    if (text && text.length) {
        // const digitRe = /\d+/;
        // const lowerCaseRe = /[a-z]+/;
        // const upperCaseRe = /[A-Z]+/;
        // const specialSymbolRe = /[^0-9A-Za-z]+/;
        // if (!digitRe.test(text)) {
        //     return 'Password must contain at least 1 digit.'
        // }
        // if (!lowerCaseRe.test(text)) {
        //     return 'Password must contain at least 1 lower case letter.'
        // }
        // if (!upperCaseRe.test(text)) {
        //     return 'Password must contain at least 1 upper case letter.'
        // }
        // if (!specialSymbolRe.test(text)) {
        //     return 'Password must contain at least 1 special symbol.'
        // }
        if (text.length < 8) {
            return 'Password length must be at least 8 symbols.'
        }
        return true;
    } else {
        return true;
    }
}