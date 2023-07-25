const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const checkExists = async (req, res, next) => {
  const { email, username } = req.body;
  const err = new Error();
  const errors = [];

  const email2 = await User.findOne({where:{email: email}})
    err.title = "User already exists";
    err.message = "User already exists";
    err.status = 403;
  if (email2) {
    errors.push("User with that email already exists")
  } 
  const user2 = await User.findOne({where:{username: username}})
  if (user2) {
    errors.push("User with that username already exists")
  }
  if (!errors.length) return next();
  err.errors = errors;
  return next(err);
}

const infoRequired = async (req, res, next) => {
  const { firstName, lastName, email, username } = req.body;
  const err = new Error();
  const errors = [];

  err.title = "Validation error";
  err.message = "Validation error";
  err.status = 400;

  if (!firstName) errors.push("First Name is required");
  if (!lastName) errors.push("Last Name is required");
  if (!username) errors.push("Username is required");
  if (!email || !email.includes('@') || !email.includes('.')) errors.push("Invalid email");

  if (!errors.length) return next();
  err.errors = errors;
  return next(err);

}

router.post(
  '',
  infoRequired,
  checkExists,
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ firstName, lastName, email, username, hashedPassword });

    const safeUser = {
      id: user.id,
      firstName: user.firstName, 
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: ""
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

module.exports = router;