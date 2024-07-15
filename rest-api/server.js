const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

const users = [{
  userId: 1,
  email: "jangaiah@king.com",
  firstName: 'Jangaiah',
  middleName: "",
  lastName: "Paneti",
  education: "MCA",
  occupation: "Software Exployee",
  password: "$2b$12$TaO88HOPHZgz1XnJi7ZwHuq5bw3RkSKoC1Nud.TwKiDo5rUaHOz6W"
},
{
  userId: 2,
  email: "hamsa@king.com",
  firstName: 'Hamsa',
  middleName: "",
  lastName: "Paneti",
  education: "B.Sc",
  occupation: "CEO of Cloth Center",
  password: "$2b$12$TaO88HOPHZgz1XnJi7ZwHuq5bw3RkSKoC1Nud.TwKiDo5rUaHOz6W"
}];

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
      if (users.some(user => user.email === req.body.email)) {
          const err = new Error('Email Taken!')
          err.status = 400;
          throw err;
      }

      const user = {
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 12),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          education: req.body.education,
          occupation: req.body.occupation
      }

      users.push(user);

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
      const user = users.find(user => user.email === req.body.email);
      if (!user) {
          const err = new Error('User Not Found!')
          err.status = 400;
          throw err;
      } else if (await bcrypt.compare(req.body.password, user.password)) {
          const tokenPayload = {
            email: user.email,
          };
          const accessToken = jwt.sign(tokenPayload, 'SECRET');
          res.status(201).json({
              status: 'success',
              message: 'User Logged In!',
              data: {
                accessToken,
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

app.get('/api/user', (req, res) => {
    res.json(users);
  });

  

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});