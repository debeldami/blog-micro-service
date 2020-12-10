const express = require('express');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());

const posts = {};

app.get('/post', (req, res) => {
  res.send(posts);
});

app.post('/post', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };

  console.log(title);

  res.status(201).json(posts[id]);
});

app.listen(4000, () => {
  console.log('listening at port 4000');
});
