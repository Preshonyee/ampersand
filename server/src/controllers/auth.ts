import bcrypt from "bcryptjs";
import User from "../models/User";
import jwt from "jsonwebtoken";

// TODO: Fix all any types

// @description:    Register user
// @route:          POST /api/v1/auth/signup
// @access          Public
exports.signup = (req: any, res: any) => {
  const { firstName, lastName, email, password, profilePicture } = req.body;

  // Validate that fields are not empty
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Please add all the fields" });
  }

  // Check if user already exists
  User.findOne({ email: email })
    .then((savedUser: any) => {
      if (savedUser) {
        return res
          .status(400)
          .json({ error: "User already exists with that email" });
      }
      // Hash the user password
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          // Create the new user
          const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            profilePicture: profilePicture,
          });
          // Save the user to the database
          user
            .save()
            .then((user: any) => {
              // Return response result
              res.json({
                message: "saved successfully",
                result: {
                  _id: user._id,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  profilePicture: profilePicture,
                },
              });
              console.log({ user });
            })
            .catch((error: any) => {
              console.log(error);
              res.json({ error: error });
            });
        })
        .catch((error) => {
          console.log(error);
          res.json({ error: error });
        });
    })
    .catch((error: any) => {
      console.log(error);
      res.json({ error: error });
    });
};

// @description:    Login user
// @route:          POST /api/v1/auth/login
// @access          Public
exports.signin = (req: any, res: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password" });
  }
  User.findOne({ email: email })
    .then((savedUser: any) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid email or password" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              { _id: savedUser._id },
              process.env.JWT_SECRET
            );
            const {
              _id,
              firstName,
              lastName,
              email,
              profilePicture,
            } = savedUser;

            res.json({
              token: token,
              user: {
                id: _id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                profilePicture: profilePicture,
              },
            });
          } else {
            return res.status(422).json({ error: "Invalid email or password" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

// @description:    Get current logged in user
// @route:          POST /api/v1/auth/me
// @access          Private
exports.getMe = (req: any, res: any) => {
  User.findById(req.user.id)
    .then((user: any) => {
      return res.status(200).json({ success: true, data: user });
    })
    .catch((error: any) => {
      console.log(error);
    });
};