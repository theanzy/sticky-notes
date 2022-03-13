const asyncHandler = require('express-async-handler');
const { HttpError } = require('../helper/customError');

// @desc    Get notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'get notes' });
});

// @desc    Add a note
// @route   POST /api/notes
// @access  Private
const setNote = asyncHandler(async (req, res) => {
  if (req.body.color === 'red') {
    // res.status(400);
    throw new HttpError(['red color not allowed', 'dumb error'], 400);
  }
  res.status(200).json({ message: 'Add a note' });
});

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'delete note' });
});

// @desc    Delete a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'update note' });
});

module.exports = {
  getNotes,
  setNote,
  deleteNote,
  updateNote,
};
