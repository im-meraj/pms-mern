import { UserModel } from '../../models/allModels';

// • bcrypt
import bcrypt from 'bcrypt';
// • jsonwebtoken
import jwt from 'jsonwebtoken';

/**
Route:      /register
Method:     POST
Access:     Private
Description: Register a new user
Params:     none
**/
const registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: 'Please enter all fields'
            });
        }

        //check if user already exists
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(password, salt);

        //Save to monogoDB
        const user = await UserModel.create({ ...req.body, password: hashPassword });

        if (user) {
            return res.status(201).json({
                _id: user.id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            return res.status(400).json({
                message: 'User not created'
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: 'User not created! ' + error.message
        });
    }
}

/**
Route:      /login
Method:     POST
Access:     Public
Description: Authenticate user
Params:     none
**/
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        
        if(user && (await bcrypt.compare(password, user.password))) {
            const userInfo = user;
            const { password, ...userInfo2 } = userInfo._doc;
            res.status(200).json({
                // _id: user.id,
                // fullname: user.fullname,
                // email: user.email,
                // role: user.role,
                ...userInfo2,
                token: generateToken(user._id),
                leaveApplication: user.leaveApplication,
                status: "Working"
            })
        } else {
            res.status(400).json({
                message: 'Invalid credentials'
            })
        }

        

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

/**
Route:      /me
Method:     POST
Access:     Private
Description: Get user info
Params:     none
**/
const getMe = async (req, res) => {
    try {
        return res.status(200).json(req.user);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

export { registerUser, loginUser, getMe };