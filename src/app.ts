import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import { validateLogin } from './middlewares/validateLogin.middleware';
import { verifyToken } from './middlewares/auth.middleware';

const dotenv = require('dotenv');
dotenv.config()

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.post("/login", validateLogin, (req: Request, res: Response) => {
    console.log('Login');

    try {
        var user: {
          token: string;
        } = {
          token: ''
        };
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
            { id: 1, cuil },
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

app.get("/welcome", verifyToken, (req: Request, res: Response) => {
  req.user;
  res.status(200).send(`Welcome 🙌 ${req.user.cuil}`);
});

module.exports = app;
