const { body, validationResult } = require('express-validator');

const User = require('../models/userModel');
const catways = require('../models/catwayModel');
const reservations = require('../models/reservationModel');
const { render } = require('pug');


 /** Affiche le tableau de bord avec les utilisateurs, catways et réservations.*/
 
exports.dashboard = async (req, res, next) => {
    try {
        const users = await User.find({});
        const catways = await catwayatway.find({});
        const reservations = await reservation.find({});
        const catwayId = await catway.findOne({});
        return res.render('dashboard', { 
            title: 'Tableau de bord', 
            users: users,
            catways: catways,
            reservations: reservations,
            catwayId: catwayId._id
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

/**
 * Met à jour un utilisateur. */
exports.updateUser = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return User.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Met à jour un utilisateur par ID. */
exports.patchUser = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return User.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });

    try {
      const id = req.params.id;
  
      const token = req.cookies.token;
    

      // Check si présence du token
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing authorization token' });
      }
  
      // Patch request avec token et gestion de l'erreur
      fetch(`http://${process.env.dev.API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          'authorization': `Bearer ${token}`, // Inclusion dans le header
          "Content-Type": "application/json",
        },
        body: JSON.stringify(temp),
      })
        .then(response => {
          if (response.ok) {
            //console.log("Utilisateur modifier ");
            return res.redirect('/dashboard');
          } else {
            return response.json().then(errorData => {
              return res.status(response.status).json(errorData);
            });
          }
        })
        .catch(error => {
          console.error('Error updating user:', error);
          return res.status(500).json({ message: 'Internal Server Error' });
        });
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  /** Supprime un utilisateur. */
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.query.user;

        const token = req.cookies.token;

        if (!token) {
          return res.status(401).json({ message: 'Unauthorized: Missing authorization token' });
        };

        // Delete request avec token et gestion de l'erreur
        fetch(`http://${process.env.dev.API_URL}/users/${userId}`, {
          method: "DELETE",
          headers: {
            'authorization': `Bearer ${token}`, // Inclusion dans le header
          }
        })
          .then(response => {
            if (response.ok) {
              //console.log("Utilisateur supprimé ");
              return res.redirect('/dashboard');
            } else {
              return response.json().then(errorData => {
                return res.status(response.status).json(errorData);
              });
            }
          })
          .catch(error => {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Erreur de suppression' });
          });
      } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
};

/** Met à jour un catway. */
exports.updateCatway = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return Catway.findByIdAndUpdate(id, data, { new: true });
};

/** Met à jour la description d'un catway par ID. */
exports.updateCatwayById = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  let temp = {
      "catwayState": req.body.catwayState
    }

  try {
    const id = req.params.id;

    const token = req.cookies.token;

    // Check si présence du token
    if (!token) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    // Patch request avec token et gestion de l'erreur
    fetch(`http://${process.env.dev.API_URL}/catways/${id}`, {
      method: "PATCH",
      headers: {
        'authorization': `Bearer ${token}`, // Inclusion dans le header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temp),
    })
      .then(response => {
        if (response.ok) {
          
          return res.redirect('/dashboard');
        } else {
          return response.json().then(errorData => {
            return res.status(response.status).json(errorData);
          });
        }
      })
      .catch(error => {
        console.error('Error updating catway:', error);
        return res.status(500).json({ message: 'Erreur de mise à jour catway' });
      });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

/** Supprime un catway.*/
exports.deleteCatway = async (req, res, next) => {
  try {
      const id = req.params.id;
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: 'Suppréssion non autorisé' });
      };

      // Delete request avec token et gestion de l'erreur
      fetch(`http://${process.env.dev.API_URL}catways/${id}`, {
        method: "DELETE",
        headers: {
          'authorization': `Bearer ${token}`, // Inclusion dans le header
        }
      })
        .then(response => {
          if (response.ok) {
            return res.redirect('/dashboard');
          } else {
            return response.json().then(errorData => {
              return res.status(response.status).json(errorData);
            });
          }
        })
        .catch(error => {
          console.error('Error deleting catway:', error);
          return res.status(500).json({ message: 'Erreur de suppression' });
        });
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

/** Ajoute une réservation.*/
  exports.createReservation = (data) => {
    try {
      const catway = JSON.parse(req.body.catwayNumber);

      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: 'Non autorisé' });
      };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", token);

      const urlencoded = new URLSearchParams();
      urlencoded.append("reservationId", req.body.reservationId);
      urlencoded.append("clientName", req.body.clientName);
      urlencoded.append("boatName", req.body.boatName);
      urlencoded.append("startDate", req.body.startDate);
      urlencoded.append("endDate", req.body.endDate);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded
      };

      await fetch(`http://${process.env.dev.API_URL}/catways/${catway._id}/reservations`, 
        requestOptions)
        .then(response => {
          if (response.ok) {
            return res.redirect('/dashboard');
          } else {
            return response.json().then(errorData => {
              return res.status(response.status).json(errorData);
            });
          }
        })
        .catch(error => {
          console.error('Error deleting catway:', error);
          return res.status(500).json({ message: 'Erreur de suppression' });
        });
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

/**Récupère les informations d'une réservation.*/
exports.getReservationById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const resa = await reservations.findById(id);

    const catway = await catways.findOne({catwayNumber: resa.catwayNumber})

    return res.redirect(`/catways/${catway._id}/reservations/${resa._id}`)
  } catch (error) {
    console.error('Unexpected error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**Supprime une réservation.*/
exports.deleteReservation = async (req, res, next) => {
  try {
      const id = req.params.id;
      const token = req.cookies.token;

      const resa = await reservations.findById(id);
      const catway = await catways.findOne({"catwayNumber": resa.catwayNumber});

      if (!token) {
        return res.status(401).json({ message: 'Non autorisé' });
      };

      // Delete request avec token et gestion de l'erreur
      fetch(`http://${process.env.dev.API_URL}/catways/${catway._id}/reservations/${id}`, {
        method: "DELETE",
        headers: {
          'authorization': `Bearer ${token}`, // Inclusion dans le header
        }
      })
        .then(response => {
          if (response.ok) {
            return res.redirect('/dashboard');
          } else {
            return response.json().then(errorData => {
              return res.status(response.status).json(errorData);
            });
          }
        })
        .catch(error => {
          console.error('Error deleting catway:', error);
          return res.status(500).json({ message: 'Erreur de suppression' });
        });
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
};