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

        const userData = await Customer.find({ name: req.body.name })

        const ck = await bcrypt.compare(req.body.password, userData[0].password)
        if (ck) {
            console.log("validation successful")
            res.status(200).json({ "v": "successful" })

        } else {
            res.status(400).json({ "v": 'invalid user name' })
        }


    })


export default handler;