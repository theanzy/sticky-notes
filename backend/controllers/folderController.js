const asyncHandler = require('express-async-handler');
const { getUser } = require('../helper/user');
const Folder = require('../models/folderModel');

// @desc    Get folders
// @route   GET /api/folders
// @access  Private
const getFolders = asyncHandler(async (req, res) => {
  const folders = await Folder.find();
  res.status(200).json(folders);
});

// @desc    Add a folder
// @route   POST /api/folders
// @access  Private
const addFolder = asyncHandler(async (req, res) => {
  const folder = await Folder.create({
    name: req.body.name,
    user: getUser(),
  });
  res.status(200).json(folder);
});

// @desc    Delete a folder
// @route   DELETE /api/folders/:id
// @access  Private
const deleteFolder = asyncHandler(async (req, res) => {
  const folder = await Folder.findById(req.params.id);
  if (!folder) {
    res.status(400);
    throw new Error('Note not found');
  }
  await folder.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Edit a folder
// @route   PUT /api/folders/:id
// @access  Private
const updateFolder = asyncHandler(async (req, res) => {
  const folder = await Folder.findById(req.params.id);
  if (!folder) {
    res.status(400);
    throw new Error('Note not found');
  }
  const updatedFolder = await Folder.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );
  res.status(200).json(updatedFolder);
});

module.exports = {
  getFolders,
  addFolder,
  deleteFolder,
  updateFolder,
};
