const User = require("./../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const { create } = require("../Models/Book")
dotenv.config()

const Register = async(req, res) => {
    const {name, username, email, password} = req.body
console.log(req.body);
    try {
        const usernameExists = await User.findOne({username});
        if(usernameExists) return res
            .status(400)
            .json("Invalid username");

        const existingUser = await User.findOne({email});
        if(existingUser) return res
            .status(400)
            .json("User already exists! Login Instead");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // handle password error later
        const user = new User({name, username, email, password: hashedPassword});
        await user.save();

        res
            .status(201)
            .json({message: "user created successfully"});
            console.log("user created successfully");
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
};

const Login = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) return res
            .status(401)
            .json("Wrong credentials");

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res
            .status(401)
            .json("Wrong credentials");

        const token = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY, {});

        const {
            password: pass,
            ...others
        } = user._doc;

        return res
            .status(200)
            .json({
                ...others,
                token
               
            }
          );
          console.log("user logged in successfully")
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json(error);
    }
};

module.exports = {
    Login,
    Register
}