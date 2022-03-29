const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please add text value'],
    },
    color: {
      type: String,
      required: [true, 'Please add color'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);
