const User = require("../models/user_model").Model;
const Group = require("../models/group_model").Model;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.userRegister = async (req, res) => {
    const views = req.body;
    views.groups = [];
    const data_user = views;

    try {
        data_user.password = bcrypt.hashSync(data_user.password, parseInt(process.env.SALT_ROUNDS, 10));
        const user = new User(data_user);
        console.log(user)
        await user.save();
        res.json({
            data: {
                "_id": user.id,
                "email": user.email
            },
            message: `user ${user.email} created`
        });
    } catch (e) {
        res.status(400).json({
            err: e.message,
            message: `test`
        });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.userLogin = async (req, res) => {
    const views = req.body;

    try {
        const user = await User.findOne({
            email: views.email
        });

        const flag = bcrypt.compareSync(views.password, user.password);
        if (flag) {
            jwt.sign({
                user: {
                    id: user._id,
                    email: user.email
                }
            }, process.env.JWT_KEY, {
                expiresIn: "30 days"
            }, (error, token) => {
                if (error) {
                    res.status(400);
                    console.log(error);
                    res.json({
                        message: "Server Error."
                    });
                } else {
                    res.status(200);
                    res.json({
                        "token": token,
                        user: {
                            id: user._id,
                            email: user.email
                        }
                    });
                }
            })
        } else {
            res.status(403);
            console.log(error);
            res.json({
                message: "Authentification incorrect."
            });
        }


    } catch (e) {
        res.status(400).json({
            message: "User not found."

        });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.listAllUsers = async (req, res) => {
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id, {
            password: 0
        }).populate([{
            path: "groups",
            populate: {
                path: "admin"
            },
        }, {
            path: "groups",
            populate: {
                path: "members"
            }
        }]);

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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.updateUserById = async (req, res) => {
    const views = req.body;
    const id = req.params.id;
    if (!views.groups) {
        views.groups = [];
    }
    const groups = views.groups.slice();
    views.groups = [];
    const data_user = views;
    data_user._id = id;
    const user = new User(data_user);

    try {
        const userdb = await User.findById(id);
        if (!userdb) {
            res.status(404).json({
                message: `user not found`
            });
            return;
        }
        const updated = await User.findByIdAndUpdate(id, user);
        updated.groups = groups;
        await updated.save();
        const list = await Group.find({
            members: id
        });
        for (let i = 0; i < list.length; i++) {
            const group = list[i];
            let flag = false;

            for (let grp of updated.groups) {
                if (grp.toString() == group._id.toString()) {
                    flag = true;
                }
            }
            if (group.admin.toString() == id.toString()) {
                console.log("enter");
            } else if (!flag) {
                let f2 = true;

                while (f2) {
                    const index = group.members.findIndex(el => el.toString() == id.toString());

                    if (index > -1) {
                        group.members.splice(index, 1);
                    } else {
                        f2 = false;
                    }
                }
                await group.save();
            }
        }
        for (let grpId of groups) {
            const grp = await Group.findById(grpId);
            const members = grp.members;
            let flag = false;

            for (let member of members) {
                if (member.toString() == id.toString()) {
                    flag = true;
                }
            }
            if (!flag) {
                grp.members.push(id);
            }
            await grp.save();
        }
        res.json({
            message: `user ${updated.id} updated`,
            user
        });
    } catch (e) {
        res.status(400).json({
            err: e.message
        });
    }
};




/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.deleteUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).populate({
            path: "groups",
            populate: {
                path: "admin",
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
            if (group.members.length) {
                group.members = group.members.filter(member => member._id.toString() != id.toString());
                await group.save();
            }
        }
        let flag = true;
        for (let group of groups) {
            if (group.admin._id.toString() === id.toString()) {
                flag = false;
            }
        }
        if (flag) {
            await user.delete();
            res.json({
                message: `user ${user.id} deleted`
            });
        } else {
            throw new Error(`the user ${user.id} can't be deleted`);
        }
    } catch (e) {
        res.status(400).json({
            err: e.message
        });
    }
};


exports.serve = (req, res) => {

};