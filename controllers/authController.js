require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { email, password, adminKey } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  if(adminKey !== process.env.ADMIN_SECRET){
    return res.status(401).send('Invalid secret to be made an admin');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = new User({
    email,
    password: hashedPassword
  });

  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
};
