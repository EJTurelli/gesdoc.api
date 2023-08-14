require("dotenv").config();
const jwt = require('jsonwebtoken');
const auth = require("./middlewares/auth.middleware");
const validateLogin = require("./middlewares/validateLogin.middleware");

const express = require("express");

const app = express();

app.use(express.json());

app.post("/login", validateLogin(), (req, res) => {
    console.log('Login');

    try {
        var user = {};
        const { cuil, password } = req.body;
    
        // Validate user input
        if (!(cuil && password)) {
          res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        // user = await User.findOne({ email });
    
        // if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: 1, cuil },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          user.token = token;
    
          res.status(200).json(user);
        // }
        // res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});


app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = app;