const Catway = require('../models/catwayModel');

exports.getAllCatways = () => {
  return Catway.find();
};

exports.getCatwayById = (id) => {
  return Catway.findById(id);
};

exports.createCatway = (data) => {
  const catway = new Catway(data);
  return catway.save();
};

exports.updateCatway = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return Catway.findByIdAndUpdate(id, data, { new: true });
};

exports.patchCatway = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return Catway.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
};

exports.deleteCatway = (id) => {
  return Catway.findByIdAndDelete(id);
};
