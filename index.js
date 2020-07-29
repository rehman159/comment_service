const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const { json } = require("express");

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  console.log("COmments by post id :" + commentsByPostId[req.params.id]);
  //   console.log(commentsByPostId[1]);
  //   console.log(commentsByPostId[2]);
  commentsByPostId[1].map((item) => console.log(item));

  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  // localhost:4001/posts/1/comments
  const commentId = randomBytes(4).toString("hex"); // we have created our here a comment id ... every comment on this specific post has a new id related to this post of id like 3 ...
  const { content } = req.body; // we have gain a content of comments from req.body

  const comments = commentsByPostId[req.params.id] || [];
  //console.log("Comments : " + comments[req.params.id]);

  comments.push({ commentId, content });
  console.log(commentId);
  commentsByPostId[req.params.id] = comments;
  console.log("CommentsByPostID : " + commentsByPostId[req.params.id]);

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
