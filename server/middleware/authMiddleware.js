import jwt from 'jsonwebtoken';

import { UserModel } from '../models/allModels';

const protect = async (req, res, next) => {
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                //Get token from header
                token = req.headers.authorization.split(' ')[1];
                console.log(token);

                //Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                //Get user from the token
                req.user = await UserModel.findById(decoded.id).select('-password');

                next();
            } catch (error) {
                console.log(error);
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
        }

        if(!token) {
            return res.status(401).json({
                message: 'Unauthorized, no token available'
            });
        }
    
}

export { protect };