const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./backend/middleware/errorMiddleware');
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors');

const { connectDB } = require('./backend/config/db');
connectDB();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/notes', require('./backend/routes/noteRoutes'));
app.use('/api/folders', require('./backend/routes/folderRoutes'));

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
