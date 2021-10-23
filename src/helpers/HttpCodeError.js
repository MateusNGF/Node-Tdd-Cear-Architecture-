class HttpCodeError {
    static BadRequest(message) {
        console.log(message)
        throw {
            code: 400,
            name: "Bad Request",
            message,
        }
    }

    static serverError(message) {
        console.log(message)
        throw {
            code: 500,
            name: "Server Error",
            message
        }
    }

    static unauthorization_lowLevel(message) {
        console.log(message)
        throw {
            code: 401,
            name: "unauthorization",
            message
        }
    }

    static unauthorization_hightLevel(message) {
        console.log(message)
        throw {
            code: 403,
            name: "unauthorization",
            message
        }
    }
}

module.exports = HttpCodeError