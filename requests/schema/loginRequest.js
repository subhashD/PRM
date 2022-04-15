const loginRequest = {
    password: {
        notEmpty: true,
        errorMessage: "Password field cannot be empty"
    },
    email: {
        notEmpty: true,
        errorMessage: "Email field cannot be empty"
    }
}

module.exports = loginRequest;