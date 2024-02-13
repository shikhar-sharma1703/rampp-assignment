const Store = require('../model/store');

const storeIdValidator = async (req, res, next) => {
  const storeId = req.method === 'GET' ? req.query.storeId : req.body.storeId;
  
  if (!storeId) {
    return res.status(400).json({ error: 'storeId is required' });
  }

  const store = await Store.findById(storeId);
  if (!store) {
    return res.status(404).json({ error: 'Store not found' });
  }

  next();
};

module.exports = storeIdValidator;