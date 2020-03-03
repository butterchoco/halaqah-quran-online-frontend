export function hasLowerCase(value = "") {
    return value.toUpperCase() != value;
}

export function hasUpperCase(value = "") {
    return value.toLowerCase() != value;
}

export function hasNumber(value = "") {
    return /\d/.test(value);
}

export function fullNameValid(value = "") {
    const fullName = value.split(" ");
    if (fullName.length > 1) {
        const firstName = fullName[0];
        const lastName = fullName[1];
        const letters = /^[A-Za-z]+$/;
        if ((firstName.length >= 1 && firstName.length <= 30) && firstName.match(letters)) {
            if (lastName.length >= 1 && lastName.length <= 150 && lastName.match(letters)) {
                return true;
            }
        }
    }
    return false;
}
