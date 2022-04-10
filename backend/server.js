const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors');

const { connectDB } = require('./config/db');
connectDB();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/folders', require('./routes/folderRoutes'));

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../frontend/build/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
