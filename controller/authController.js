// import User__Model from "../model/UserModel.js"

class AuthController {

    // Login Controller Starts from here
    static NewAccount = async (req, res) => {

        try {
            // getting the information from the user
            const { fullName, email, password } = req.body
            // validation of the user
            if (!(fullName && email && password)) {
                res.status(400).send({ error_msg: "All Fields are Mandetory..." })
            }
            else if (password.length < 8) {
                res.send({ error_msg: "Passowrd must be 8 character or more..." })
            }
            else {
                // checking in the database if exist or not
                const check_user_exist = await User__Model.findOne({ email })
                // if user already exist in the database
                if (check_user_exist) {
                    res.status(400).send({ error_msg: "User Already exist with this email." })
                }
                else {
                    // saving the data to the database
                    // const user = await User__Model.create({ name, email, password })

                }

            }

        } catch (error) {
            console.log(error)
        }

    }
    // Login Controller Ends here

}

export default AuthController