const LoginRouter = require("../routers/User/loginRouter")

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