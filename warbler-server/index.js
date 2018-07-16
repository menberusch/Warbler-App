require('dotenv').config();

const db = require('./models');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const msgRoutes = require('./routes/messages');
const {loginRequired, ensureCorrectUser} = require('./middleware/auth');

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Routes here
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', loginRequired, ensureCorrectUser, msgRoutes);

app.get('/api/messages', loginRequired, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
    .sort({ createdAt: 'desc'})
    .populate('user', {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(messages);
  } catch (err) {
    return res.status(err);
  }
});

app.use((req,res,next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server us starting on port ${PORT}`);
});