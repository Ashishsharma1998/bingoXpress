const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { regsiter, login, logout } = require("../controllers/authController");
const router = express.Router();

router.post("/register",regsiter);

router.post("/login",login);


router.post("/logout",logout);


module.exports = router;
