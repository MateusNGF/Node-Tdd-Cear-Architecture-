const HttpCodeError = require('../../helpers/HttpCodeError')

class LoginRouter {

    constructor(authUseCase, emailServices) {
        this.authUseCase = authUseCase
        this.EmailServices = emailServices
    }

    async route(httpRequest) {
        try {
            const { email, password } = httpRequest.body

            if (!email)
                return HttpCodeError.BadRequest("Email not provided")

            if (!this.EmailServices.isValid(email))
                return HttpCodeError.BadRequest("Email not is valid")

            if (!password)
                return HttpCodeError.BadRequest("Password not provided")

            const keyAccessToken = await this.authUseCase.auth(httpRequest)
            if (!keyAccessToken)
                return HttpCodeError.unauthorization_lowLevel("invalid information")

            return { statusCode: 200 }

        } catch (e) {
            return HttpCodeError.serverError(e.message)
        }
    }
}


module.exports = LoginRouter