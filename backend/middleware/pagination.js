// paginate: Query -> Query
const paginate = (model) => {
  return async (req, res, next) => {
    if (!req.query || (!req.query.page && !req.query.limit)) {
      next();
      return;
    }
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const _paginatedItems = {};

    if (endIndex < (await model.countDocuments().exec())) {
      _paginatedItems.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      _paginatedItems.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      res._ChainedQuery = res._ChainedQuery.limit(limit).skip(startIndex);
      res._paginatedItems = _paginatedItems;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
};

module.exports = { paginate };
