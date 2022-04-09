function mongooseToDto(item) {
  const rawItem = item.toObject({ virtuals: true });
  const { _id, __v, ...cleanItem } = rawItem;
  return cleanItem;
}

module.exports = {
  mongooseToDto,
};
