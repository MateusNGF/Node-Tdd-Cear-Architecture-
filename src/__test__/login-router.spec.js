const LoginRouter = require("../routers/User/loginRouter")

const makeInst = () => {
    const authUseCase = makeAuthUseCase()
    const emailValidator = makeEmailServices()
    const sut = new LoginRouter(authUseCase, emailValidator)

    return { sut, authUseCase, emailValidator }
}
const makeEmailServices = () => {
    class EmailServicesSpy {
        isValid(email) {
            return this.isEmailValid
        }
    }

    const emailValidator = new EmailServicesSpy()
    emailValidator.isEmailValid = true;
    return emailValidator;
}

const makeAuthUseCase = () => {
    class AuthUseCaseSpy {
        async auth(request) {
            this.email = request.body.email
            this.password = request.body.password
            this.token = request.header['x-access-token']
            return this.token
        }
    }
    return new AuthUseCaseSpy()
}

const makeAuthUseCaseWithError = () => {
    class AuthUseCaseSpy {
        async auth() {
            throw { message: "Auth with error" }
        }
    }
    return new AuthUseCaseSpy()
}

describe('\n ========== Login Router =========== \n', () => {
    test('should return 500 if not httpRequest is provided', async () => {
        const { sut } = makeInst()
        const httpResponse = await sut.route()
        expect(httpResponse.statusCode).toBe(500)
    });

    test('should return 500 if httpRequest is empty', async () => {
        const { sut } = makeInst()
        const httpResponse = await sut.route({})
        expect(httpResponse.statusCode).toBe(500)
    });

    test('Should return 400 if no email is provided', async () => {
        const { sut } = makeInst()
        const httpRequest = {
            body: { password: "senhaValida" }
        }

        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('should return 400 if email is invalid', async () => {
        const emailValidator = makeEmailServices()
        const authUseCase = makeAuthUseCase()

        emailValidator.isEmailValid = false

        const sut = new LoginRouter(authUseCase, emailValidator)
        const HttpRequest = {
            body: { email: "invalid_email@gmail.com", password: "invalid_password" },
        }
        const httpResponse = await sut.route(HttpRequest)
        expect(httpResponse.statusCode).toBe(400)
    });

    test('Should return 400 if no passwords is provided', async () => {
        const { sut } = makeInst()
        const httpRequest = {
            body: { email: "any_email@gmail.com" }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })

    // TESTANDO OS DADOS DO USUARIOS

    test('should call AuthUseCase with correct params', async () => {
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

    test('should return 401 when invalid credentials are provides', async () => {
        const { sut } = makeInst()
        const httpRequest = {
            body: {
                email: "invalid_email@gmail.com",
                password: "invalid_password"
            },
            header: { "x-access-token": null }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(401)
    });

    test('should return 200 when valid credentials are provides', async () => {
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
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
    });

    test('should return 500 if authUseCase is undefined', async () => {
        const sut = new LoginRouter()
        const httpRequest = {
            body: { email: "invalid_email@gmail.com", password: "invalid_password" }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    });

    test('should return 500 if authUseCase is Objetc empty', async () => {
        const sut = new LoginRouter({})
        const HttpRequest = {
            body: { email: "invalid_email@gmail.com", password: "invalid_password" }
        }
        const httpResponse = await sut.route(HttpRequest)
        expect(httpResponse.statusCode).toBe(500)
    });

    test('should return 500 if authUseCase has throw', async () => {
        const authUseCaseWithError = makeAuthUseCaseWithError()
        const sut = new LoginRouter(authUseCaseWithError)
        const HttpRequest = {
            body: { email: "invalid_email@gmail.com", password: "invalid_password" }
        }
        const httpResponse = await sut.route(HttpRequest)
        expect(httpResponse.statusCode).toBe(500)
    });

    test('should return 500 if no EmailServices is provided', async () => {
        const authUseCase = makeAuthUseCase()
        const sut = new LoginRouter(authUseCase)
        const httpRequest = {
            body: { email: "invalid_email@gmail.com", password: "invalid_password" }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    });

    test('should return 500 if EmailServices no has isValid method', async () => {
        const authUseCase = makeAuthUseCase()
        const sut = new LoginRouter(authUseCase, {})
        const httpRequest = {
            body: { email: "invalid_email@gmail.com", password: "invalid_password" }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    });

})