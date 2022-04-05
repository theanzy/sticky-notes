const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const folderSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add name value'],
    },
    user: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Folder', folderSchema);
