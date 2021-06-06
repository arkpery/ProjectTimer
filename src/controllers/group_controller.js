const Group = require("../models/group_model").Model;
const User = require("../models/user_model").Model;
const groupJwt = require('../middleware/jwtMiddleware')
const groupServices = require('../services/groups-services')
const translator = require("../services/translate");

/**
 * Function to get the list and details of all groups
 * @param {Array} req 
 * @param {Array} res 
 */
exports.getAllGroups = async (req, res) => {
    const perPage = req.query.perPage ?? 10;
    const numPage = req.query.numPage ?? 1;
    const firstIndex = perPage * (numPage - 1);

    try {
        const list = await Group.find({}, null, {
            skip: firstIndex,
            limit: perPage
        }).populate("admin", ['email', 'firstname', 'lastname', 'groups', 'avatar']).populate("members", ['email', 'firstname', 'lastname', 'groups', 'avatar']);

        res.json(list);
    }
    catch (e) {
        res.status(400).json({
            err: e.message
        });
    }
};

/**
 * Function to get a group with its information by id
 * @param {Array} req 
 * @param {Array} res 
 * @returns 
 */
exports.getGroupById = async (req, res) => {
    const id = req.params.id;

    try {
        const group = await Group.findById(id).populate({
            path: "admin",
            select: 'email firstname lastname groups avatar',
            populate: {
                path: "groups",

            },
        }).populate('members', ['email', 'firstname', 'lastname', 'groups', 'avatar']);

        if (!group) {
            res.status(404).json({
                message: translator.translate("GROUP_NOT_FOUND")
            });
            return;
        }
        res.json(group);
    }
    catch (e) {
        res.status(400).json({
            err: e.message
        });
    }
};

/**
 * Function to create a new group 
 * @param {Array} req 
 * @param {Array} res 
 */
exports.createGroup = async (req, res) => {
    const body = req.body;
    const group = new Group(body);

    try {
        const saved = await group.save();
        const admin = saved.admin;
        const user = await User.findById(admin);

        user.groups.push(saved);
        await user.save();
        res.json({
            message: translator.translate("GROUP_CREATED", [group.name, user.lastname, user.firstname]),
            data: {
                "id": saved._id,
                "name": saved.name
            }
        });
    }
    catch (e) {
        res.status(400).json({
            err: e.message
        });
    }
};

/**
 * Function to delete group by id
 * @param {Array} req 
 * @param {Array} res 
 * @returns 
 */
exports.deleteGroupById = async (req, res) => {
    try {

        const groupId = req.params.id
        const decoded = await groupJwt.decode_token(req)
        await groupServices.checkIfAdmin(groupId, decoded.user.id)

        const group = await Group.findById(groupId).populate("admin").populate("members");
        if (!group) {
            res.status(404).json({
                err: translator.translate("GROUP_NOT_FOUND")
            });
            return;
        }
        if (group.members.length) {
            throw new Error(translator.translate("GROUP_HAS_MEMBERS"));
        }
        const user = await User.findById(group.admin._id).populate("groups");
        user.groups = user.groups.filter(group => group._id != groupId);
        await user.save();
        const status = await group.delete();
        res.json({
            message: translator.translate("GROUP_DELETED", group.name)
        });
    }
    catch (e) {
        res.status(400).json({
            err: e.message
        });
    }
};

/**
 * Function to update group by id
 * @param {Array} req 
 * @param {Array} res 
 */
exports.updateGroupById = async (req, res) => {
    const id = req.params.id;
    const decoded = await groupJwt.decode_token(req)
    await groupServices.checkIfAdmin(id, decoded.user.id)

    const body = req.body;
    body._id = id;
    if (!body.members) {
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


        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            let flag = true;

            for (let member of members) {
                if (user._id.toString() == member.toString()) {
                    flag = false;
                }
            }
            if (user._id.toString() == updated.admin.toString()) {
                console.log("enter");
            }
            else if (flag) {
                let f2 = true;

                while (f2) {
                    const index = user.groups.findIndex(el => el.toString() == id.toString());

                    if (index > -1) {
                        user.groups.splice(index, 1);
                    }
                    else {
                        f2 = false;
                    }
                }
                await user.save();
            }
        }
        for (let member of members) {
            const user = await User.findById(member);
            let flag = true;

            for (let group of user.groups) {
                if (group.toString() == id.toString()) {
                    flag = false;
                }
            }
            if (flag) {
                user.groups.push(id);
                await user.save();
            }
        }
        res.json({
            message: translator.translate("GROUP_UPDATED", updated.name)
            updated
        });
    }
    catch (e) {
        res.status(400).json({
            err: e.message
        });
    }
};
