export const isEmailValid = (email) => (/\S+@\S+\.\S+/i).test(email);

export const isEmailInvalid = (email) => !isEmailValid(email);