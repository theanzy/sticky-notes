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
const { checkJwt } = require('../middleware/authMiddleware');

const validateAddNote = [
  body('content', 'content does not exists').exists(),
  body('color')
    .exists()
    .withMessage('color does not exist')
    .isIn(['yellow', 'red', 'green', 'blue', 'orange', 'pink', 'gray'])
    .withMessage('wrong color'),
  validateModelError,
];

const validateUpdateNote = [
  body('color')
    .optional(true)
    .isIn(['yellow', 'red', 'green', 'blue', 'orange', 'pink', 'gray'])
    .withMessage('wrong color'),
  validateModelError,
];

router
  .route('/')
  .get(checkJwt, getNotes)
  .post(checkJwt, validateAddNote, setNote);
router
  .route('/:id')
  .delete(checkJwt, deleteNote)
  .put(checkJwt, validateUpdateNote, updateNote);

module.exports = router;
