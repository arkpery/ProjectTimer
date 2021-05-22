const controller = require("./base_controller");
const Group = require("../models/group_model");
const User = require("../models/user_model");

exports.list = async (req, res) => {
    const perPage = req.query.perPage ?? 10;
    const numPage = req.query.numPage ?? 1;
    const firstIndex = perPage * (numPage - 1);

    try {
        const list = await Group.find().skip(firstIndex).size(perPage);

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
        const group = await Group.findById(id);

        if (!user){
            res.status(404).json({
                err: "user not found"
            });
            return;
        }
        res.json(group);
    }
    catch (e){
        res.status(400).json({
            err: e.message
        });
    }
};

exports.insert = async (req, res) => {
    const body = req.body;
    const group = new Group(body);

    try {
        if (group.admin){
            const id = group.admin.id;

            const user = await User.findById(id);
            group.admin = user;
        }
        const status = await group.save();


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
        const status = await Group.deleteOne({
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
    const group = new Group(body);

    try {
        if (group.admin){
            const id = group.admin.id;

            const user = await User.findById(id);
            group.admin = user;
        }
        const status = await group.save();

        res.json(status);
    }
    catch (e){
        res.status(400).json({
            err: e.message
        });
    }
};
