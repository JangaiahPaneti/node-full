const express = require('express');
const app = express();
const port = 3000;


app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/user', (req, res) => {
    const data = {
      userId: 1,
      firstName: 'Rama',
      middleName: "Chandra",
      lastName: "Surya"
    };
    res.json(data);
  });

  

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});