const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  const todoList = req.session.todoList || [];
  res.render('index', { todoList });
});

app.post('/add', (req, res) => {
  const todo = req.body.todo;
  req.session.todoList = req.session.todoList || [];
  req.session.todoList.push(todo);
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const index = req.body.index;
  if (req.session.todoList) {
    req.session.todoList.splice(index, 1);
  }
  res.redirect('/');
});

app.post('/delete/all', (req, res) => {
    req.session.todoList = [];
    res.redirect('/');
  });
  
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
