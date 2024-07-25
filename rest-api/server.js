const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./authenticate');
const app = express();
const port = 3000;

const users = [{
  userId: 1,
  email: "jangaiah@king.com",
  firstName: 'Ramachandra',
  middleName: "",
  lastName: "Manu",
  education: "MCA",
  occupation: "Software Exployee"
},
{
  userId: 2,
  email: "hamsa@king.com",
  firstName: 'Sita',
  middleName: "Devi",
  lastName: "Manu",
  education: "B.Sc",
  occupation: "CEO of Cloth Center"
}];

const passwords = [
  {
    email: "jangaiah@king.com",
    password: "$2b$12$TaO88HOPHZgz1XnJi7ZwHuq5bw3RkSKoC1Nud.TwKiDo5rUaHOz6W"
  },
  {
    email: "hamsa@king.com",
    password: "$2b$12$TaO88HOPHZgz1XnJi7ZwHuq5bw3RkSKoC1Nud.TwKiDo5rUaHOz6W"
  }
]

const corsOptions = {
  origin: ['http://localhost:4200']
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.static(__dirname + '/public/browser'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/browser/index.html');
});

app.post('/api/register', async (req, res) => {
  try {
      const reqBody = req.body;
      if (users.some(user => user.email === reqBody.email)) {
          const err = new Error('Email Taken!')
          err.status = 400;
          throw err;
      }

      const user = {
          email: reqBody.email,
          firstName: reqBody.firstName,
          middleName: reqBody.middleName,
          lastName: reqBody.lastName,
          education: reqBody.education,
          occupation: reqBody.occupation
      }

      users.push(user);
      password = {
        email: reqBody.email,
        password: await bcrypt.hash(reqBody.password, 12),
      }
      passwords.push(password);

      setTimeout(() => { 
        res.status(201).json({
        status: 'success',
        message: 'User Registered!',
        data: {
          user: {
              email: user.email,
          },
        },
      });
    }, 1000);
    } catch (err) {
      setTimeout(() => { 
      res.status(err.status).json({
          status: 'fail',
          message: err.message,
        });
      }, 1000);
    }
});

app.post('/api/login', async (req, res) => {
  try {
      const reqBody = req.body;
      const user = users.find(user => user.email === reqBody.email);
      const userPassword = passwords.find(pwd => pwd.email === reqBody.email);
      if (!user) {
          const err = new Error('User Not Found!')
          err.status = 400;
          throw err;
      } else if (await bcrypt.compare(reqBody.password, userPassword.password)) {
          const tokenPayload = {
            email: user.email,
          };
          const accessToken = jwt.sign(tokenPayload, 'SECRET');
          res.status(200).json({
              status: 'success',
              message: 'User Logged In!',
              data: {
                accessToken,
                user
              },
            });
      } else {
          const err = new Error('Wrong Password!');
          err.status = 400;
          throw err;
        }
    } catch (err) {
      res.status(err.status).json({
          status: 'fail',
          message: err.message,
        });
    }
});

app.get('/api/users', auth, (req, res) => {
  res.status(200).json(users);
});

app.get('/api/user-profile', auth, (req, res) => {
  try {
    const user = users.find(user => user.email === req.user.email);
    if (!user) {
        const err = new Error('User Not Found!')
        err.status = 400;
        throw err;
      }
    else {
      res.status(200).json({
        status: 'success',
        user
      });
    }
  } catch (err) {
    res.status(err.status).json({
      status: 'fail',
      message: err.message,
    });
  }
});

  

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});