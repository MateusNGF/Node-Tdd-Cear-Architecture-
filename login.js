import express from 'express'

const router = express.Router()

module.exports = () => {
    router.post('/access', async (req, res) => {
        const { email, password, repeatPassword } = req.body
        
        if (password === repeatPassword) {
            const user = await ModelAccount.create({ email, password })
            return res.json(user)
        }
        res.status(400).json({
            error : "password not is equal"
        })
    })
}