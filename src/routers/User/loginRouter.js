const HttpCodeError = require('../../helpers/HttpCodeError')

class LoginRouter {

    constructor(authUseCase) { this.authUseCase = authUseCase }

    route(httpRequest) {
        try {

            if (!httpRequest || !this.authUseCase)
                HttpCodeError.serverError('HttpRequest not is provided')
            if (!this.authUseCase.auth)
                HttpCodeError.serverError("method auth is required")
            if (!httpRequest.body)
                HttpCodeError.serverError('Body not is provided')
            if (Object.keys(httpRequest.body).length < 1)
                HttpCodeError.serverError("Body is empty")


            const { email, password } = httpRequest.body
            if (!email) HttpCodeError.BadRequest("Email not provided")
            if (!password) HttpCodeError.BadRequest("Password not provided")


            const keyAccessToken = this.authUseCase.auth(httpRequest)
            if (!keyAccessToken) HttpCodeError.unauthorization_lowLevel("Access denied")

            return { statusCode: 200 }

        } catch (e) {
            return {
                statusCode: e.code,
                message: `${e.name} : ${e.message}`
            }
        }
    }
}


module.exports = LoginRouter