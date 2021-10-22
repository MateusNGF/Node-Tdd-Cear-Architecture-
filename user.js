import express from 'express'
const router = express.Router()

module.exports = () => {
    const direction = new AccessRouter()
    router.post('/access', ExpressRouterAdpter.adapt(direction))
}

/**
 * Acabaria se tornando um middware para o express.
 * Contudo, se assim fizesse ainda se condicionaria ao express.
 * 
 */
class ExpressRouterAdpter {
    static adapt(direction) {
        return async (req, res) => {

            // AQUI É ONDE REALMENTE HÁ A CONEÇÃO COM O EXPRESS
            const httpRequest = { body: req.body }

            // AQUI REALMENTE É ONDE SERIA A CHAMADA PARA O CONTROLLER
            const httpResponse = direction.route(httpRequest)

            res.status(httpResponse.statusCode ? httpResponse.statusCode : 200)
                .json(httpResponse)
        }
    }
}

// PRESENTECION

/**
 * Responsavel por fazer a minupulação 
 */
class AccessRouter {
    async route(httpRequest) {
        const user = new AccessUseCases().Access(httpRequest.body)
        return { statusCode: 200, user }
    }
}


// DOMAIN 

class AccessUseCases {
    async Access(informations) {
        const { email, password, repeatPassword } = informations
        if (password === repeatPassword) {
            return new CreateCurrentUser().create(email, password)
        }
    }
}

// INFRAESTRUTURA

import mongoose from 'mongoose'
import UserModel from 'model/UserModel'

class CreateCurrentUser {
    async create(email, password) {
        const user = await UserModel.create({ email, password })
        return user
    }
}