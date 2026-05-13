const Reservation = require('../models/reservationModel');

exports.getAllReservation = () => {
  return Reservation.find();
};

exports.getReservationById = (id) => {
  return Reservation.findById(id);
};

exports.createReservation = (data) => {
  const reservation = new Reservation(data);
  return reservation.save();
};

exports.updateReservation = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return Reservation.findByIdAndUpdate(id, data, { new: true });
};

exports.patchReservation = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return Reservation.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
};

exports.deleteReservation = (id) => {
  return User.findByIdAndDelete(id);
};
