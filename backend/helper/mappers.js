const mongoose = require('mongoose');

function mongooseToDto(item) {
  const rawItem = item.toObject({ virtuals: true });
  const { _id, __v, ...cleanItem } = rawItem;
  return cleanItem;
}

function toNoteDto(note) {
  const { folder, ...cleanItem } = note;
  return { ...cleanItem, folderId: folder };
}

function noteToMongoose(note) {
  const { folder, ...cleanItem } = note;
  return { ...cleanItem, folder: mongoose.Types.ObjectId(folder) };
}

module.exports = {
  mongooseToDto,
  toNoteDto,
  noteToMongoose,
};
