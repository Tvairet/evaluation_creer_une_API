const userService = require("../services/userService");


exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "Aucun utilisateur trouvé"
            });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) {
            Object.keys(user),forEach((key) => {
                if (!!user[key]) {
                    user[key] = user[key];
                }               
            });
            await user.save();
            return res.status(201).json(user);
        }
            return res.status(404).json({ message: "Utilisateur introuvable" });
        
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Afficher le formulaire pré-rempli
exports.renderEditForm = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    res.render('editUser', { user });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

exports.patchUser = async (req, res) => {
    try {
        const user = await userService.patchUser(req.params.id, req.body);
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// authentufuer un utilisateur
exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email }, '-__v -createdAt -updateAt');

        let hashedPass = bcrypt.hashSync(password, 10);

        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if (err) {
                    throw new Error(err);
                }
                if (response) {
                    delete user._doc.password;

                    const expireIn = 24*60*60*60;
                    const token = jwt.sign({
                        user: user
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });

                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: expireIn
                    });

                    res.header('Authorization', 'Bearer ' + token);
                    //res.status(200).json('authenticate_succeed');
                    return res.redirect('/board');
                }

                return res.status(403).json('wrong_credentials');
            });
        } else {
            return res.status(404).json('Utilisateur non trouvé');
        }
    } catch (error) {
        return res.status(501).json(error);
    }
}