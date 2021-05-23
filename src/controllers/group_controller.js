const Group = require("../models/group_model").Model;
const User = require("../models/user_model").Model;

exports.list = async (req, res) => {
    const perPage = req.query.perPage ?? 10;
    const numPage = req.query.numPage ?? 1;
    const firstIndex = perPage * (numPage - 1);

    try {
        const list = await Group.find({}, null, {
            skip: firstIndex,
            limit: perPage
        }).populate("admin");

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
        const group = await Group.findById(id).populate({
            path: "admin",
            populate: {
                path: "groups"
            }
        });

        if (!group){
            res.status(404).json({
                message: "NOT FOUND"
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
        const saved = await group.save();
        const admin = saved.admin;
        const user = await User.findById(admin);

        user.groups.push(saved);
        await user.save();
        res.json({
            message: "OK",
            data: {
                "_id": saved._id,
                "name": saved.name
            }
        });
    }
    catch (e){
        res.status(400).json({
            err: e.message
        });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const group = await Group.findById(id).populate({
            path: "admin"
        });

        if (!group){
            res.status(404).json({
                err: "group not found"
            });
            return;
        }
        const user = await User.findById(group.admin.id).populate("groups");
        user.groups = user.groups.filter(group => group._id != id);
        await user.save();
        const status = await group.delete()
        res.json({
            message: "OK"
        });
    }
    catch (e){
        res.status(400).json({
            err: e.message
        });
    }
};

exports.update = async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    body._id = id;
    const group = new Group(body);

    try {
        const updated = await Group.findByIdAndUpdate(id, group);

        res.json({
            message: "OK"
        });
    }
    catch (e){
        res.status(400).json({
            err: e.message
        });
    }
};
