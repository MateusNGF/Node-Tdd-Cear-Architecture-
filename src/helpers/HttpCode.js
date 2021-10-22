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

    static unauthorization_lowLevel(message) {
        throw {
            code: 401,
            name: "unauthorization",
            message
        }
    }
    static unauthorization_hightLevel(message) {
        throw {
            code: 403,
            name: "unauthorization",
            message
        }
    }
}

module.exports = HttpCode