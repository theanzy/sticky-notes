const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');
const { toNoteDto, noteToMongoose } = require('../helper/mappers');
const { filterUserData } = require('../middleware/authMiddleware');
const { paginate } = require('../middleware/pagination');

// @desc    Get notes
// @route   GET /api/notes
// @access  Private
const getNotes = [
  asyncHandler(filterUserData(Note)),
  asyncHandler(paginate(Note)),
  asyncHandler(async (req, res) => {
    const notes = await res._ChainedQuery.exec();
    res.status(200).json(notes.map(toNoteDto));
  }),
];

// @desc    Add a note
// @route   POST /api/notes
// @access  Private
const setNote = asyncHandler(async (req, res) => {
  const data = noteToMongoose({
    content: req.body.content,
    color: req.body.color,
    user: req.user.sub,
    folder: req.body.folder,
  });
  const note = await Note.create(data);
  console.log(note);
  res.status(200).json(toNoteDto(note));
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
  let updateFields = {};
  if (req.body.color) {
    updateFields.color = req.body.color;
  }
  if (req.body.content) {
    updateFields.content = req.body.content;
  }
  if (req.body.folder) {
    updateFields.folder = req.body.folder;
  }
  updateFields = noteToMongoose(updateFields);
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    updateFields,
    {
      new: true,
    }
  );
  res.status(200).json(toNoteDto(updatedNote));
});

module.exports = {
  getNotes,
  setNote,
  deleteNote,
  updateNote,
};
