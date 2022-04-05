const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validateModelError } = require('../middleware/errorMiddleware');
const {
  getNotes,
  setNote,
  deleteNote,
  updateNote,
} = require('../controllers/noteController');

const validateNote = [
  body('content', 'content does not exists').exists(),
  body('color')
    .exists()
    .withMessage('color does not exist')
    .isIn(['yellow', 'red', 'green', 'blue', 'orange', 'pink', 'gray'])
    .withMessage('wrong color'),
  validateModelError,
];

router.route('/').get(getNotes).post(validateNote, setNote);
router.route('/:id').delete(deleteNote).put(validateNote, updateNote);

module.exports = router;
