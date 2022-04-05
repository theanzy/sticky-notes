const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const noteSchema = Schema(
  {
    content: {
      type: String,
      required: [true, 'Please add text value'],
    },
    color: {
      type: String,
      required: [true, 'Please add color'],
    },
    user: {
      type: String,
    },
    folder: {
      type: Schema.Types.ObjectId,
      ref: 'Folder',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);
