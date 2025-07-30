import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

// SIGNUP user
export const signupUser = async (req, res) => { 
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({email, token});
  } catch (error) {
    console.error('Signup error:', error.message);
    // Note: use the same `error` variable you caught
    res.status(400).json({ error: error.message });
  }
};

export const getUserData = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).select("-password"); // Exclude password

    // Create a token
    const token = createToken(user._id)

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      token,
    });
    
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};