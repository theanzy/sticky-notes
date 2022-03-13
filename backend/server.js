const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/notes', require('./routes/noteRoutes'));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
