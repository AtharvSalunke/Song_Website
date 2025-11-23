import User from "../models/user.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// for signip
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.json({ message: "User created successfully", newUser });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Signup failed" });
  }
};


// for login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Login failed" });
  }
};


// for users profile



export const getprofile = async(req,res) => {
  try{

    const profile = await User.findById(req.user).select("-password");

    if(!profile) return res.status(400).json({message: "Profile not found"});

    res.json(profile);


  }catch(err){

    res.status(500).json({message: "Falied to fetch the profile"});
    
  }
};

