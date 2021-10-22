class HttpCode {
    static BadRequest(message) {
        throw {
            code: 400,
            name: "Bad Request",
            message,
        }
    }
    static serverError(message) {
        throw {
            code: 500,
            name: "Server Error",
            message
        }
    }
}

module.exports = HttpCode