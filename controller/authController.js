import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import RegisterModel from "../model/registrationForm.js";


class AuthController {

    // Login Controller Starts from here
    static Register = async (req, res) => {

        try {
            // getting the information from the user
            const { fullName, email, password, cpassword } = req.body
            // validation of the user
            if (!(fullName && cpassword && email && password)) {
                res.send({ error_msg: "All fields are Mandetory" })
            }
            else if (password !== cpassword) {
                res.send({ error_msg: "Password doesnot match" })
            }
            else if (password.length < 8) {
                res.send({ error_msg: "Password Must be 8 character or long" })
            }
            // check the user if aready exist in the database
            else {
                const check_user = await RegisterModel.findOne({ email })
                // if user exist
                if (check_user) {
                    res.send({ error_msg: "User is already exist with this email" })
                }
                // if user is not exist with this email
                else {
                    //    bycripting the password 
                    const enc_code = await bcrypt.hash(password, 10)
                    // creating new doc or user
                    const user = await RegisterModel.create({ fullName, email, password: enc_code })

                    // if created successfully
                    if (user) {

                        const token = jwt.sign({ userId: user._id }, process.env.secrete_key, { expiresIn: '17d' })
                        user.token = token
                        user.password = null
                        const users = { ...user._doc, token }
                        res.status(201).send({ success_msg: "Successfully Created Account", user: users })
                    }
                    else {
                        res.send({ error_msg: "Something Went Wrong" })
                    }
                }
            }

        } catch (error) {
            res.status(400).send({ error_msg: "Something Went Wrong" })
        }

    }

    // Login Controller Ends here


    // Login Controller Starts here
    static Login = async (req, res) => {
        try { //getting the login data
            const { email, password } = req.body
            //validating the user didnot put any inputs
            if (!(email && password)) {
                res.send({ error_msg: "All the fields are mandetory" })
            }
            else {
                // check the credentials in the database
                const user = await RegisterModel.findOne({ email })
                // comparing user password 
                const hash = await bcrypt.compare(password, user.password)
                // user exist it in the database with hased password
                if (user && hash) {
                    //  generating the token of user
                    const token = jwt.sign({
                        UserId: user._id
                    }, process.env.secrete_key, { expiresIn: '17d' });
                    user.password = null
                    user.token = token
                    const users = { ...user._doc, token }
                    console.log(users)
                    res.send({ success_msg: "Successfully Login...", user: users })
                }
                else {
                    res.send({ error_msg: "Login with correct details" })
                }
            }
        } catch (error) {
            res.status(400).send({ error_msg: 'Something went wrong' })
        }
    }

    // Login Controller Ends Here
}

export default AuthController;
