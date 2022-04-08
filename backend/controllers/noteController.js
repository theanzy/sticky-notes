const asyncHandler = require('express-async-handler');
const { getUser } = require('../helper/user');
const Note = require('../models/noteModel');

// @desc    Get notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  console.log(req.user);
  const notes = await Note.find();
  res.status(200).json(notes);
});

// @desc    Add a note
// @route   POST /api/notes
// @access  Private
const setNote = asyncHandler(async (req, res) => {
  const note = await Note.create({
    content: req.body.content,
    color: req.body.color,
    user: getUser(),
  });
  res.status(200).json(note);
});

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error('Note not found');
  }
  await note.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Edit a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error('Note not found');
  }
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    {
      content: req.body.content,
      color: req.body.color,
    },
    {
      new: true,
    }
  );
  res.status(200).json(updatedNote);
});

module.exports = {
  getNotes,
  setNote,
  deleteNote,
  updateNote,
};
