const message = require('../constants');
const signupValidationError = {
  message: "Validation failed",
  fields: {
    email: [
      'The email has already been taken.'
    ]
  }
}

const loginValidationError = {
  message: "Validation failed",
  fields: {
    email: [
      'The email field is required.'
    ]
  }
}

const taskValidationError = {
  message: "Validation Error",
  field: {
    title: [
      "The title field is required."
    ]
  }
}

module.exports = { message, signupValidationError, loginValidationError, taskValidationError }
