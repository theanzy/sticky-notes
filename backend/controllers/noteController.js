const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');
const { mongooseToDto } = require('../helper/mappers');
// @desc    Get notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  console.log(req.user);
  const notes = await Note.find({ user: req.user.sub });
  res.status(200).json(notes.map(mongooseToDto));
});

// @desc    Add a note
// @route   POST /api/notes
// @access  Private
const setNote = asyncHandler(async (req, res) => {
  const note = await Note.create({
    content: req.body.content,
    color: req.body.color,
    user: req.user.sub,
  });
  res.status(200).json(mongooseToDto(note));
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
  if (note.user !== req.user.sub) {
    res.status(401);
    throw new Error('Unauthorized delete to folder');
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
  if (note.user !== req.user.sub) {
    res.status(401);
    throw new Error('Unauthorized update to folder');
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
  res.status(200).json(mongooseToDto(updatedNote));
});

module.exports = {
  getNotes,
  setNote,
  deleteNote,
  updateNote,
};
