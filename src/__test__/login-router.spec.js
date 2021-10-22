const LoginRouter = require("../routers/User/loginRouter")

const makeInst = () => {
    class AuthUseCase {
        auth(info) {
            this.email = info.email
            this.password = info.password
        }
    }

    const authUseCase = new AuthUseCase()
    const sut = new LoginRouter(authUseCase)

    return { sut, authUseCase }
}

describe('\n ========== Login Router =========== \n', () => {
    test('Should return 400 if no email is provided', () => {
        const { sut } = makeInst()
        const httpRequest = {
            body: { password: 'any pass' }
        }

        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
    test('Should return 400 if no passwords is provided', () => {
        const { sut } = makeInst()
        const httpRequest = {
            body: { email: 'any email' }
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

    test('should return 500 if HttpRequest body is empty', () => {
        const { sut } = makeInst()
        const httpRequest = {
            body: {}
        }
        const httpResponse = sut.route(httpRequest)
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
            body: { email: "invalid_email@gmail.com", password: "invalid_password" }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(401)
    });

    test('should return 500 if authUseCase is undefined', () => {
        const sut = new LoginRouter()
        const httpRequest = {
            body: { email: "invalid_email@gmail.com", password: "invalid_password" }
        }
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    });
})