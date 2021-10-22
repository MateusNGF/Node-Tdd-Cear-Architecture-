const HttpCode = require('../../helpers/HttpCode')

class LoginRouter {
    route(httpRequest) {
        try {
            if (!httpRequest)
                HttpCode.serverError('HttpRequest not is provided')
            if (!httpRequest.body)
                HttpCode.serverError('Body not is provided')
            if (Object.keys(httpRequest.body).length < 1)
                HttpCode.serverError("Body is empty")


            const { email, password } = httpRequest.body

            if (!email) HttpCode.BadRequest("Email not provided")
            if (!password) HttpCode.BadRequest("Password not provided")

        } catch (e) {
            return {
                statusCode: e.code,
                message: `${e.name} : ${e.message}`
            }
        }
    }
}


module.exports = LoginRouter