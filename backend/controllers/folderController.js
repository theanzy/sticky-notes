const asyncHandler = require('express-async-handler');
const Folder = require('../models/folderModel');
const { mongooseToGenericDto } = require('../helper/mappers');
const { filterUserData } = require('../middleware/authMiddleware');
const { paginate } = require('../middleware/pagination');

// @desc    Get folders
// @route   GET /api/folders
// @access  Private
const getFolders = [
  asyncHandler(filterUserData(Folder)),
  asyncHandler(paginate(Folder)),
  asyncHandler(async (req, res) => {
    const folders = await res._ChainedQuery.exec();
    res.status(200).json(folders.map(mongooseToGenericDto));
  }),
];

// @desc    Add a folder
// @route   POST /api/folders
// @access  Private
const addFolder = asyncHandler(async (req, res) => {
  const folder = await Folder.create({
    name: req.body.name,
    user: req.user.sub,
  });
  res.status(200).json(mongooseToGenericDto(folder));
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
  res.status(200).json(mongooseToGenericDto(updatedFolder));
});

module.exports = {
  getFolders,
  addFolder,
  deleteFolder,
  updateFolder,
};
