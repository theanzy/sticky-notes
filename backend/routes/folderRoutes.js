const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validateModelError } = require('../middleware/errorMiddleware');
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

router.route('/').get(getFolders).post(validateFolder, addFolder);
router.route('/:id').delete(deleteFolder).put(validateFolder, updateFolder);

module.exports = router;
