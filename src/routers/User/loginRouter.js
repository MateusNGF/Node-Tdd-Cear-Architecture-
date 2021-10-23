const HttpCodeError = require('../../helpers/HttpCodeError')

class LoginRouter {

    constructor(authUseCase) { this.authUseCase = authUseCase }

    async route(httpRequest) {
        try {
            const { email, password } = httpRequest.body
            if (!email) return HttpCodeError.BadRequest("Email not provided")
            if (!password) return HttpCodeError.BadRequest("Password not provided")

            const keyAccessToken = await this.authUseCase.auth(httpRequest)
            if (!keyAccessToken)
                return HttpCodeError.unauthorization_lowLevel("Access denied")

            return { statusCode: 200 }

        } catch (e) {
            // console.error(e)
            return HttpCodeError.serverError()
        }
    }
}


module.exports = LoginRouter