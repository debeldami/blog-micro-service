const express = require('express');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());

const commentsByPostId = {};

app.get('/post/:id/comment', (req, res) => {
  res.json(commentsByPostId[req.params.id] || []).status(200);
});

app.post('/post/:id/comment', (req, res) => {
  const commentsId = randomBytes(4).toString('hex');

  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentsId, content });

  commentsByPostId[req.params.id] = comments;

  console.log(comments);
  res.status(201).json(comments);
});

app.listen(4001, () => {
  console.log('listening at port 4001');
});
