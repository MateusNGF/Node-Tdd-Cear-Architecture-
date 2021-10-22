class LoginRouter {
    route(httpRequest) {
        try {
            if (!httpRequest)
                HttpResponse.serverError('HttpRequest not is provided')
            if (!httpRequest.body)
                HttpResponse.serverError('Body not is provided')
            if (Object.keys(httpRequest.body).length < 1)
                HttpResponse.serverError("Body is empty")


            const { email, password } = httpRequest.body

            if (!email) HttpResponse.BadRequest("Email not provided")
            if (!password) HttpResponse.BadRequest("Password not provided")

        } catch (e) {
            return {
                statusCode: e.code,
                message: `${e.name} : ${e.message}`
            }
        }
    }
}

class HttpResponse {
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



describe('Login Router', () => {
    test('Should return 400 if no email is provided', () => {
        const sut = new LoginRouter()
        const httpRequest = {
            body: { password: 'any pass' }
        }

        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
    test('Should return 400 if no passwords is provided', () => {
        const sut = new LoginRouter()
        const httpRequest = {
            body: { email: 'any email' }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 500 if no httpRequest is provided', () => {
        const sut = new LoginRouter()
        const httpResponse = sut.route()
        expect(httpResponse.statusCode).toBe(500)
    });

    test('should return 500 if httpRequest is empty', () => {
        const sut = new LoginRouter()
        const httpResponse = sut.route({})
        expect(httpResponse.statusCode).toBe(500)
    });

    test('should return 500 if HttpRequest body is empty', () => {
        const sut = new LoginRouter()
        const httpRequest = {
            body: {}
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    });

})