import jwt from 'jsonwebtoken'
import RegisterModel from "../model/registrationForm.js";


class AuthController {

    // Login Controller Starts from here
    static NewAccount = async (req, res) => {

        try {

            // getting the information from the user

            const { fullName, email, password } = req.body
            // validation of the user
            if (!(fullName && email && password)) {
                res.send({ error_msg: "All fields are Mandetory" })
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
                    // creating the json web token
                    function generateAccessToken(email) {
                        return jwt.sign(email, process.env.secrete_key, { expiresIn: '1800s' });
                    }
                    const token = generateAccessToken({ email: req.body.email });

                    const create = await RegisterModel.create({ fullName, email, password })
                    console.log(create)
                    if (create) {
                        res.send({ success_msg: "Successfully Created Account" })
                    }
                    else {
                        res.send({ error_msg: "Something Went Wrong" })
                    }
                }
            }


        } catch (error) {
            console.log(error)
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
                // if user puts inputs
                // check the credentials in the database
                const user = await RegisterModel.findOne({ email, password })
                // user exist it in the database
                if (user) {
                    // generating the token
                    // function generateAccessToken(email) {
                    //     return jwt.sign(email, process.env.secrete_key, { expiresIn: '1800s' });
                    // }
                    // const token = generateAccessToken({ email: req.body.email })

                    // validating the token with user
                    const tokens = jwt.sign({
                        data: user.email
                    }, process.env.secrete_key, { expiresIn: '1h' });
                    console.log(tokens)
                    const verify = jwt.verify(tokens, process.env.secrete_key, function (err, decoded) {
                        console.log(decoded)
                        // comparing tokens

                    });
                    user.token = tokens
                    res.send({ success_msg: "Successfully Login..." })
                }
                else {
                    res.send({ error_msg: "Login with correct details" })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Login Controller Ends Here
}

export default AuthController;
