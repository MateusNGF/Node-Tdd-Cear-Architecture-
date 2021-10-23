const LoginRouter = require("../routers/User/loginRouter")

const makeInst = () => {
    const authUseCase = makeAuthUseCase()
    const sut = new LoginRouter(authUseCase)

    return { sut, authUseCase }
}

const makeAuthUseCase = () => {
    class AuthUseCase {
        auth(request) {
            this.email = request.body.email
            this.password = request.body.password
            this.token = request.header['x-access-token']
            return this.token
        }
    }
    return new AuthUseCase()
}

const makeAuthUseCaseWithError = () => {
    class AuthUseCase {
        auth() {
            throw { message: "Auth with error" }
        }
    }
    return new AuthUseCase()
}

describe('\n ========== Login Router =========== \n', () => {
    test('Should return 400 if no email is provided', () => {
        const { sut } = makeInst()
        const httpRequest = {
            body: { password: "senhaValida" }
        }

        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
    test('Should return 400 if no passwords is provided', () => {
        const { sut } = makeInst()
        const httpRequest = {
            body: { email: "any_email@gmail.com" }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 500 if no httpRequest is provided', () => {
        const { sut } = makeInst()
        const httpResponse = sut.route()
        expect(httpResponse.statusCode).toBe(500)
    });

    test('should return 500 if httpRequest is empty', () => {
        const { sut } = makeInst()
        const httpResponse = sut.route({})
        expect(httpResponse.statusCode).toBe(500)
    });

    // TESTANDO OS DADOS DO USUARIOS

    test('should call AuthUseCase with correct params', () => {
        const { sut, authUseCase } = makeInst()
        const httpRequest = {
            body: {
                email: "any_email",
                password: "any_passwrod"
            }
        }
        sut.route(httpRequest)
        expect(authUseCase.email).toBe(httpRequest.body.email)
        expect(authUseCase.password).toBe(httpRequest.body.password)
    });

    test('should return 401 when invalid credentials are provides', () => {
        const { sut } = makeInst()
        const httpRequest = {
            body: {
                email: "invalid_email@gmail.com",
                password: "invalid_password"
            },
            header: { "x-access-token": null }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(401)
    });

    test('should return 200 when valid credentials are provides', () => {
        const { sut } = makeInst()
        const httpRequest = {
            body: {
                email: "invalid_email@gmail.com",
                password: "invalid_password"
            },
            header: {
                'x-access-token': "token_valid"
            }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
    });

    test('should return 500 if authUseCase is undefined', () => {
        const sut = new LoginRouter()
        const httpRequest = {
            body: { email: "invalid_email@gmail.com", password: "invalid_password" }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    });

    test('should return 500 if authUseCase is Objetc empty', () => {
        const sut = new LoginRouter({})
        const HttpRequest = {
            body: { email: "invalid_email@gmail.com", password: "invalid_password" }
        }
        const httpResponse = sut.route(HttpRequest)
        expect(httpResponse.statusCode).toBe(500)
    });

    test('should return 500 if authUseCase has throw', () => {
        const authUseCaseWithError = makeAuthUseCaseWithError()
        const sut = new LoginRouter(authUseCaseWithError)
        const HttpRequest = {
            body: { email: "invalid_email@gmail.com", password: "invalid_password" }
        }
        const httpResponse = sut.route(HttpRequest)
        expect(httpResponse.statusCode).toBe(500)
    });
})