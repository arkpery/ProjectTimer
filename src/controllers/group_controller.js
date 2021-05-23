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
        }).populate("admin").populate("members");

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
        }).populate("members");

        if (!group){
            res.status(404).json({
                message: "group not found"
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
            message: `group ${group.name} inserted`,
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
        const group = await Group.findById(id).populate("admin").populate("members");

        if (!group){
            res.status(404).json({
                err: "group not found"
            });
            return;
        }
        if (group.members.length){
            throw new Error(`the group has members`);
        }
        const user = await User.findById(group.admin._id).populate("groups");
        user.groups = user.groups.filter(group => group._id != id);
        await user.save();
        const status = await group.delete();
        res.json({
            message: `group ${group.name} deleted`
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
    if (!body.members){
        body.members = [];
    }
    const data_members = body.members.slice();
    body.members = [];
    const group = new Group(body);

    try {
        const updated = await Group.findByIdAndUpdate(id, group);
        updated.members = data_members;
        await updated.save();
        const members = updated.members;
        const users = await User.find({
            groups: [id]
        });

        for (let i = 0; i < users.length; i++){
            const user = users[i];
            let flag = true;

            for (let member of members){
                if (user._id.toString() == member.toString()){
                    flag = false;
                }
            }
            if (user._id.toString() == updated.admin.toString()){
                console.log("enter");
            }
            else if (flag){
                let f2 = true;

                while (f2){
                    const index = user.groups.findIndex(el => el.toString() == id.toString());

                    if (index > -1){
                        user.groups.splice(index, 1);
                    }
                    else {
                        f2 = false;
                    }
                }
                await user.save();
            }
        }
        for (let member of members){
            const user = await User.findById(member);
            let flag = true;

            for (let group of user.groups){
                if (group.toString() == id.toString()){
                    flag = false;
                }
            }
            if (flag){
                user.groups.push(id);
                await user.save();
            }
        }
        res.json({
            message: `group ${updated.name} updated`
        });
    }
    catch (e){
        res.status(400).json({
            err: e.message
        });
    }
};
