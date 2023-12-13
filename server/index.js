const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usersModel = require("./models/users");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dishesModel = require("./models/dishes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.json("error no token");

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) return res.json("error token invalid");

    if (!decoded.email) return res.json("no email in token");

    usersModel.findOne({ email: decoded.email }).then((user) => {
      if (!user) return res.json("cant find any records of user");

      if (user.isAdmin === true) {
        res.json({ isAdmin: true, status: "success" });
        next();
      } else if (user.isAdmin === false) {
        res.json({ isAdmin: false, status: "success" });
        next();
      } else {
        return res.json("fail");
      }
    });
  });
};

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token)

  if (!token) return res.json("error no token");

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) return res.json("error token invalid");

    if (!decoded.email) return res.json("no email in token");

    usersModel.findOne({ email: decoded.email }).then((user) => {
      if (!user) return res.json("cant find any records of user");

      if (user.isAdmin === true) {
        return res.json({ isAdmin: true, status: "success" });
      }
      else{
        return res.json("no priviliges")
      }

      return res.json("fail");
    });
  });
};

mongoose.connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
  dishesModel
    .find({}, { price: 1, description: 1, name: 1, _id: 1 })
    .then((masters) => {
      res.json(masters);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/dish", verifyAdmin, (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || !price) return res.json("missing data")

  dishesModel
    .create({ name: name, description: description, price: price })
    .then(() => res.json("success"))
    .catch((err) => console.log(err));
});

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ status: "success" });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.json("missing data");

  argon2
    .hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    })
    .then((hash) => {
      usersModel
        .create({ name, email, password: hash })
        .then(() => res.json("success"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.json("missing data");

  usersModel.findOne({ email: email }).then((user) => {
    if (user) {
      argon2
        .verify(user.password, password)
        .then((match) => {
          if (match) {
            const token = jwt.sign(
              { email: user.email },
              process.env.JWT_SECRET,
              {
                expiresIn: "1d",
              }
            );
            res.cookie("token", token);
            res.json("success");
          } else {
            res.json("incorrect data");
          }
        })
        .catch((err) => console.log(err));
    } else {
      res.json("incorrect data");
    }
  });
});

app.listen(3001, () => {
  console.log("server is running");
});
