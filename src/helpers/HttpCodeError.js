class HttpCodeError {
    static BadRequest(message) {
        return {
            statusCode: 400,
            name: "Bad Request",
            message,
        }
    }

    static serverError(message) {
        return {
            statusCode: 500,
            name: "Server Error",
            message
        }
    }

    static unauthorization_lowLevel(message) {
        return {
            statusCode: 401,
            name: "unauthorization",
            message
        }
    }

    static unauthorization_hightLevel(message) {
        return {
            statusCode: 403,
            name: "unauthorization",
            message
        }
    }
}

module.exports = HttpCodeError