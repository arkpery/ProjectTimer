const controller = require("./base_controller");
const User = require("../models/user_model");
const Group = require("../models/group_model");

exports.list = async (req, res) => {
    const perPage = req.query.perPage ?? 10;
    const numPage = req.query.numPage ?? 1;
    const firstIndex = perPage * (numPage - 1);

    try {
        const list = await User.find().skip(firstIndex).size(perPage);

        res.json(list);
    }
    catch (e){
        res.status(400).json({
            err: e.message
        });
    }
};

exports.read = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        if (!user){
            res.status(404).json({
                err: "user not found"
            });
            return;
        }
        res.json(user);
    }
    catch (e){
        res.status(400).json({
            err: e.message
        });
    }
};

exports.insert = async (req, res) => {
    const body = req.body;
    const user = new User(body);

    try {
        if (!user.groups){
            user.groups = [];
        }
        const groups = [];
        for (let group of user.groups){
            groups.push(await Group.findById(group.id));
        }
        user.groups = groups;
        const status = await user.save();

        res.json(status);
    }
    catch (e){
        res.status(400).json({
            err: e.message
        });
    }
};

exports.delete = (req, res) => {
    const id = req.params.id;

    try {
        const status = await User.deleteOne({
            id
        });

        res.json(status);
    }
    catch (e){
        res.status(400).json({
            err: e.message
        });
    }
};

exports.update = (req, res) => {
    const body = req.body;
    const user = new User(body);

    try {
        if (!user.groups){
            user.groups = [];
        }
        const groups = [];
        for (let group of user.groups){
            groups.push(await Group.findById(group.id));
        }
        user.groups = groups;
        const status = await user.save();

        res.json(status);
    }
    catch (e){
        res.status(400).json({
            err: e.message
        });
    }
};

exports.serve = (req, res) => {

};