const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const corsOptions = {
  origin: ['http://localhost:4200', 'http://192.168.0.125:3000/']
};

app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public/browser'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/browser/index.html');
});

app.get('/api/user', (req, res) => {
    const data = [
      {
        userId: 1,
        firstName: 'Jangaiah',
        middleName: "",
        lastName: "Paneti",
        education: "MCA",
        occupation: "Software Exployee"
      },
      {
        userId: 2,
        firstName: 'Hamsa',
        middleName: "",
        lastName: "Paneti",
        education: "B.Sc",
        occupation: "CEO of Cloth Center"
      }
  ];
    res.json(data);
  });

  

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});