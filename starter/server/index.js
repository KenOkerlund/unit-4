require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost } = require('./controllers/posts');
const { register, login } = require('./controllers/auth');
const { isAuthenticated } = require('./middleware/isAuthenticated')
const { sequelize } = require('./util/database')
const { User } = require('./models/user')
const { Post } = require('./models/post')


const app = express();

app.use(express.json())
app.use(cors())

User.hasMany(Post)
Post.belongsTo(User)

app.post('/register', register);
app.post('/login', login);

app.get('/posts', getAllPosts);
app.get('/userposts/:userId', getCurrentUserPosts);
app.post('/posts', isAuthenticated, addPost);
app.put('/posts/:id', isAuthenticated, editPost);
app.delete('/posts/:id', isAuthenticated, deletePost);



const { PORT } = process.env;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log('server successfully running'));
    })
    .catch(err => console.log(err));