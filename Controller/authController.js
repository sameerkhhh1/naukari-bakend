const userModel = require("../Models/users");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name, "nameeeeee");
    let user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .send({ msg: "user already exist", success: false });
    }
    const hashed = await bcrypt.hash(password, 10);
    let newUsers = new userModel({
      name,
      email,
      password: hashed,
      role: email === "admin@gmail.com" ? "admin" : "user",
    });
    await newUsers.save();

    res
      .status(200)
      .send({ msg: "signUp successfully", success: true, role: newUsers.role });
  } catch (error) {
    res.status(400).send({ msg: "signup failed", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).send({ msg: "email does't exist", success: false });
    }
    let unhashed = await bcrypt.compare(password, user.password);
    if (!unhashed) {
      res.status(400).send({ msg: "wrong credentials", success: false });
    }

    const token = jwtToken.sign(
      {
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" },
    );
    res.status(200).send({
      msg: "login successfully",
      success: true,
      token,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    res.status(400).send({ msg: "login failed", success: false });
  }
};

module.exports = {
  signUp,
  login,
};
