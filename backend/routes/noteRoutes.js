const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const {
  getNotes,
  setNote,
  deleteNote,
  updateNote,
} = require('../controllers/noteController');

const validateError = (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();
  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    next();
  }
};

router
  .route('/')
  .get(getNotes)
  .post(
    [
      body('content', 'content does not exists').exists(),
      body('color', 'color does not exist').exists(),
      validateError,
    ],
    setNote
  );
router.route('/:id').delete(deleteNote).put(updateNote);

module.exports = router;
