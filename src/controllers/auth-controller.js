import UserService from "../services/user-service.js";

const userService = new UserService();

export const signup = async (req, res) => {
    try {
        console.log(req.body);
        const response = await userService.signup({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        });
    
        return res.status(201).json({
            success: true,
            message: "Successfully created a new user",
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create new user",
            data: {},
            err: error
        });
    }  
}

export const login = async (req, res) => {
    try {
        const token = await userService.signin(req.body);
        return res.status(200).json({
            success: true,
            message: "Successfully logged in",
            data: token,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failed",
            data: {},
            err: error
        });
    }
}