const connectDb = require('../../../mongo/conn')
import nc from "next-connect"
const Customer = require('../../../mongo/details')
import bcrypt from 'bcryptjs'



connectDb()

const handler = nc()
    .get(async (req, res) => {
        const data = await Customer.find()
        if (data) {
            res.send(data)
        }

    })
    .post(async (req, res) => {
        const userPassword = req.body.password
        const hashedPassword = await bcrypt.hash(userPassword, 10)
        const data = Customer({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email
        })
        data.save().then(() => {
            res.status(200).send("data has been saved to db")
        }).catch((e) => {
            res.status(400).send("failed to save data to db")
        })
    })


export default handler;