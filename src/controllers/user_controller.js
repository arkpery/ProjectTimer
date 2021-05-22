const User = require("../models/user_model").Model;
const Group = require("../models/group_model").Model;
const bcrypt = require('bcrypt');

exports.list = async (req, res) => {
    const perPage = req.query.perPage ?? 10;
    const numPage = req.query.numPage ?? 1;
    const firstIndex = perPage * (numPage - 1);

    try {
        const list = await User.find({}, {
            password: 0
        }, {
            skip: firstIndex,
            limit: perPage
        }).populate("groups");

        res.json(list);
    } catch (e) {
        res.status(400).json({
            err: e.message
        });
    }
};

exports.read = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id, {
            password: 0
        }).populate({
            path: "groups",
            populate: {
                path: "admin"
            }
        });

        if (!user) {
            res.status(404).json({
                err: "user not found"
            });
            return;
        }
        res.json(user);
    } catch (e) {
        res.status(400).json({
            err: e.message
        });
    }
};

exports.login = async (req, res) => {
    const views = req.body;

    try {
        const user = await User.findOne({
            email: views.email
        });
        const flag = bcrypt.compareSync(views.password, user.password);

        if (flag) {
            res.json({
                message: "OK"
            });
        } else {
            res.status(400).json({
                err: "Error"
            });
        }
    } catch (e) {
        res.status(400).json({
            err: e.message
        });
    }
};

exports.insert = async (req, res) => {
    const views = req.body;
    views.groups = [];
    const data_user = views;

    try {
        data_user.password = bcrypt.hashSync(data_user.password, parseInt(process.env.SALT_ROUNDS, 10));
        const user = new User(data_user);

        await user.save();
        res.json({
            message: "OK"
        });
    } catch (e) {
        res.status(400).json({
            err: e.message
        });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).populate({
            path: "groups",
            populate: {
                path: "admin"
            }
        });
        if (!user) {
            res.status(404).json({
                err: "user not found"
            });
            return;
        }
        if (!user.groups) {
            user.groups = [];
        }
        const groups = user.groups;
        for (let group of groups) {
            if (group.admin._id === id) {
                throw new Error("GROUP WITH THIS USER EXIST");
            }
        }
        await user.delete();
        res.json({
            message: "OK"
        });
    } catch (e) {
        res.status(400).json({
            err: e.message
        });
    }
};

exports.update = async (req, res) => {
    const views = req.body;
    if (!views.groups) {
        views.groups = [];
    }
    const groups = views.groups.slice();
    views.groups = [];
    const data_user = views;
    const user = new User(data_user);

    try {
        const userdb = await User.findById(user._id);
        const updated = await User.findByIdAndUpdate(userdb._id, user);

        for (let grp of groups) {
            if (grp._id) {
                updated.groups.push(grp._id);
            } else if (grp.name) {
                const group = new Group({
                    name: grp.name,
                    admin: updated._id
                });

                const saved_grp = await group.save();
                updated.groups.push(saved_grp._id);
            }
        }
        await updated.save();
        res.json({
            message: "OK"
        });
    } catch (e) {
        res.status(400).json({
            err: e.message
        });
    }
};

exports.serve = (req, res) => {

};