const asyncHandler = require('express-async-handler');
const Folder = require('../models/folderModel');
const { mongooseToDto } = require('../helper/mappers');

// @desc    Get folders
// @route   GET /api/folders
// @access  Private
const getFolders = asyncHandler(async (req, res) => {
  const folders = await Folder.find({ user: req.user.sub });
  res.status(200).json(folders.map(mongooseToDto));
});

// @desc    Add a folder
// @route   POST /api/folders
// @access  Private
const addFolder = asyncHandler(async (req, res) => {
  const folder = await Folder.create({
    name: req.body.name,
    user: req.user.sub,
  });
  res.status(200).json(mongooseToDto(folder));
});

// @desc    Delete a folder
// @route   DELETE /api/folders/:id
// @access  Private
const deleteFolder = asyncHandler(async (req, res) => {
  const folder = await Folder.findById(req.params.id);
  if (!folder) {
    res.status(400);
    throw new Error('Folder not found');
  }
  if (folder.user !== req.user.sub) {
    res.status(401);
    throw new Error('Unauthorized delete to folder');
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
    throw new Error('Folder not found');
  }
  if (folder.user !== req.user.sub) {
    res.status(401);
    throw new Error('Unauthorized update to folder');
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
  res.status(200).json(mongooseToDto(updatedFolder));
});

module.exports = {
  getFolders,
  addFolder,
  deleteFolder,
  updateFolder,
};
