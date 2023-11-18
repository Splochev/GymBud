import { CELL_COUNT } from "./constants";

export const dataValidators = {
  isRequired: (value) => {
    const errors = [];
    if (value.trim() === "") {
      errors.push("This field is required.");
    }
    return errors;
  },
  isEmail: (value) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      errors.push("Please enter a valid email address.");
    }

    return errors;
  },
  codeIsCorrect: (value) => {
    const errors = [];
    if (value.length !== CELL_COUNT) {
      errors.push("Code must be 6 characters long");
    }
    return errors;
  },
};
