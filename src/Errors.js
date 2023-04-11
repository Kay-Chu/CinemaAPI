class UserNotFoundError extends Error {
    constructor (message) {
        super(message);
    }
}

class PasswordNotMatchError extends Error {
    constructor(message) {
        super(message);
    }
}

export { UserNotFoundError, PasswordNotMatchError };