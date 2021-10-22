class LoginRouter {
    route(httpRequest) {
        const { email, password } = httpRequest.body
        if (!email || !password) {
            return {
                statusCode: 400,
                message : "Not found email orh pass"
            }
        }
    }
}



describe('Login Router', () => {
    test('Should return 400 if no email is provided', () => {
        const sut = new LoginRouter()
        const httpRequest = {
            body: {
                password: 'any pass'
            }
        }

        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
    test('Should return 400 if no passwords is provided', () => {
        const sut = new LoginRouter()
        const httpRequest = {
            body: {
                email: 'any email'
            }
        }

        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })

})