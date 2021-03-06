const Router = require("express");
const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const {check, validationResult} = require("express-validator")
const router = new Router()


router.post('/registration',
    [check('name', "Incorrect name"),
        check('email', "Incorrect email").isEmail(),
        check('password', "Password must be longer than 3 and shorter than 12").isLength({min: 3, max: 12}),
        //   check('name',"Password must be longer than 3 and shorter than 12"),
        check('number', "Number must be 12").isLength(12)
    ],
    async (req, res) => {
        try {
            console.log(req.body)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Incorrect request', errors})
            }
            const {
                name,
                email,
                password,
                number
            } = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'User with email ${email} already exist'})
            }

            const hashPassword = await bcrypt.hash(password, 8)

            const user = new User({name, email, password: hashPassword, number})

            await user.save()
            return res.json({message: "User was created"})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })


router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: "User not found"})
            }
           // console.log(user.name);
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({message: "Invalid password"})
            }
            const accessToken = jwt.sign({id: user.id,
                isAdmin: user.isAdmin}, config.get("JWT_SEC"), {expiresIn: "3d"})

            const {pass, ...others} = user._doc;
            return res.status(200).json({...others, accessToken});
        } catch (e) {
            console.log(e)
            res.status(500).send({message: "Server error"})
        }
    })

module.exports = router