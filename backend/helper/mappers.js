const mongoose = require('mongoose');

const pipe =
  (...funcs) =>
  (arg) =>
    [...funcs].reduce((acc, f) => f(acc), arg);

function mongooseToGenericDto(item) {
  const rawItem = item.toObject({ virtuals: true });
  const { _id, __v, ...cleanItem } = rawItem;
  return cleanItem;
}

function changeFolderId(note) {
  const { folder, ...cleanItem } = note;
  return { ...cleanItem, folderId: folder };
}

const toNoteDto = pipe(mongooseToGenericDto, changeFolderId);

function noteToMongoose(note) {
  const { folder, ...cleanItem } = note;
  if (folder) {
    return { ...cleanItem, folder: mongoose.Types.ObjectId(folder) };
  }
  return note;
}

module.exports = {
  pipe,
  mongooseToGenericDto,
  toNoteDto,
  noteToMongoose,
};
