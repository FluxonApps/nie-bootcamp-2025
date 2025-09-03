const {loginUser} = require("../services/loginService");

exports.login = async (req, res) => {
    const {username, address} = req.body;    
    try {
        const user = await loginUser(username, address); 
        res.status(200).json({message: "Login successful", user});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};