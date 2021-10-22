class LoginRouter {
    route(httpRequest) {
       
        try {
            if (!httpRequest || !httpRequest.body)
                throw { code: 500, msg: "Body of request not provided" }

            const { email, password } = httpRequest.body
            
            if (!email) throw { code: 400, msg: "Email not provided" }
            if (!password) throw { code: 400, msg: "Password not provided" }
        } catch (e) {
            return {
                statusCode: e.code,
                message : e.msg
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

    test('should return 500 if no httpRequest is provided', () => {
        const sut = new LoginRouter()
        const httpResponse = sut.route()
        expect(httpResponse.statusCode).toBe(500)
    });

    test('should return 500 if no httpRequest is empty', () => {
        const sut = new LoginRouter()
        const httpResponse = sut.route({})
        expect(httpResponse.statusCode).toBe(500)
    });

})