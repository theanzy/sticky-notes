const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validateModelError } = require('../middleware/errorMiddleware');
const { checkJwt } = require('../middleware/authMiddleware');
const {
  getFolders,
  addFolder,
  deleteFolder,
  updateFolder,
} = require('../controllers/folderController');

const validateFolder = [
  body('name', 'name does not exists').exists(),
  validateModelError,
];

router
  .route('/')
  .get(checkJwt, getFolders)
  .post(checkJwt, validateFolder, addFolder);
router
  .route('/:id')
  .delete(checkJwt, deleteFolder)
  .put(checkJwt, validateFolder, updateFolder);

module.exports = router;
