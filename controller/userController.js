const user = require('../model/userScheme')
const bcrypt = require('bcrypt')


// Hello
exports.hello = async (req, res) => {
    console.log("hi")
    return res.status(200).json({
        success: true,
        message: "user registered succesfully",
        data: "Hit Success"

    })
}

// Register User
exports.registeruser = async (req, res) => {

    try {
        const useremail = await user.findOne({ email: req.body.email })
        const userphone = await user.findOne({ phone: req.body.phone })

        if (useremail) {
            return res.status(400).json({
                success: false,
                message: 'User with the same email exists',
            })
        }
        if (userphone) {
            return res.status(400).json({
                success: false,
                message: 'User with the same number exists',
            })
        }

        const createUser = await user.create({
            firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email,
            password: req.body.password, phone: req.body.phone, dob: req.body.dob, role: req.body.role
        })


        if (!createUser) {
            return res.status(400).json({
                success: false,
                message: 'cannot create user',
            })
        }
        if (createUser) {

            const token = createUser.getJwtToken()
            const salt = await bcrypt.genSalt(10);
            createUser.password = await bcrypt.hash(createUser.password, salt);

            await createUser.save()
            return res.status(200).json({
                success: true,
                message: "user registered succesfully",
                data: createUser, token: token

            })

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "validation failled in catch",
        });
    }
}

// GetAllUsers
exports.getAllUsers = async (req, res) => {
    try {

        const getUser = await user.find();
        if (!getUser) {
            return res.status(400).json({
                success: false,
                message: 'No Users in Database',
            })
        }
        if (getUser) {
            return res.status(200).json({
                success: true,
                message: "All Users",
                data: getUser,

            })
        }
        // console.log(getUser)


    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "validation failled in catch",
        });
    }
}

// finduserbyId
exports.findbyId = async (req, res) => {
    // console.log(req.user._id)
    try {
        // console.log(req.body._id)

        const getUser = await user.findById(req.body._id);
        if (!getUser) {
            return res.status(400).json({
                success: false,
                message: 'User doesnt Exist',
            })
        }
        if (getUser) {

            return res.status(200).json({
                success: true,
                message: "User Found",
                data: getUser,

            })
        }
        // console.log(getUser)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "validation failled in catch",
        });
    }
}

// deleteuserbyid
exports.deletebyId = async (req, res) => {
    try {
        console.log(req.body._id)

        const getUser = await user.findById(req.body._id);
        if (!getUser) {
            return res.status(400).json({
                success: false,
                message: 'cannot Find user',
            })
        }
        if (getUser) {
            await getUser.deleteOne();
            // await user.findById(user._id);

            return res.status(200).json({
                success: true,
                message: "user Deleted succesfully",
                data: getUser,

            })
        }
        // console.log(getUser)


    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "validation failled in catch",
        });
    }
}

// update user credentials
exports.updateuser = async (req, res) => {
    // Get the JWT token from the request headers
    const token = req.headers.authorization;

    // You can now use the token as needed in your controller logic

    // For example, you can verify the token or extract information from it
    try {
        const decodedToken = jwt.verify(token, config.JWT);
        const userId = decodedToken._id;

        // Perform further operations with the user ID or any other information

        // Example: Fetch user details based on the user ID
        const getuser = await user.findById(userId);


        // Check if firstName filter is provided
        if (req.query.firstName) {
            getuser.firstName = req.query.firstName;
        }

        // Check if lastName filter is provided
        if (req.query.lastName) {
            getuser.lastName = req.query.lastName;
        }

        // Check if email filter is provided
        if (req.query.email) {
            getuser.email = req.query.email;
        }

        // Check if phone filter is provided
        if (req.query.phone) {
            getuser.phone = req.query.phone;
        }

        // Check if dateofbirth filter is provided
        if (req.query.dateofbirth) {
            getuser.dateofbirth = req.query.dateofbirth;
        }


        await getuser.save()
        return res.status(200).json({
            success: true,
            message: "user Updated succesfully",
            data: getuser,

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "validation failled in catch",
        });
    }
};

// Login
exports.login = async (req, res) => {

    try {
        // FindUser
        const finduser = await user.findOne({ email: req.body.email })
        if (!finduser) {
            res.status(400).json({
                success: false,
                message: "Incorrect credential",
            });
            return
        }
        // Get hashedpassword
        let password = finduser.password
        // compare hashed password
        const validPassword = await bcrypt.compare(
            req.body.password,
            password
        );
        // console.log(validPassword)
        // Generate token
        const token = finduser.getJwtToken()
        console.log(token)
        if (!validPassword) {
            res.status(400).json({ message: "password wrong" })
        }
        if (validPassword) {

            if (token) {
                res.status(200).json({
                    success: true,
                    message: "Login succesfully ",
                    data: finduser,
                    token: token
                });
                return
            } else {
                res.status(400).json({
                    success: false,
                    message: "Login Unsuccesfully ",
                });
            }
        }


    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "something went wrong",
            data: error
        })
    }
}

// Adding roles from admin side to a particualr enitity
exports.addroles = async (req, res) => {

    try {
        const user1 = await user.findOne({ _id: req.body._id })
        console.log(user1)
        if (!user1) {
            return res.status(400).json({
                success: false,
                message: 'cannot Find user',
            })
        }

        user1.role = req.body.role
        // console.log(user1)
        user1.save()
        res.status(200).json({
            success: true,
            message: "role added ",
            data: user1,
        });

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "something went wrong",
            data: error
        })
    }
}