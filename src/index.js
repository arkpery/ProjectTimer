/*
require("./app");
*/
const User = require("./models/user_model").Model;
const Group = require("./models/group_model").Model;
const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/apinode');

/*
setTimeout(()  => {
    const user = new User({
        email: "hello123@mail.fr",
        password: "azerty123"
    });
    let uid = null;

    user.save().then((ret) => {
        console.log(ret);
        console.log("it's save");
        const group = new Group({
            name: "hello world",
            admin: ret._id
        });

        uid = ret._id;
        //user.groups.push(group);

        return group.save();
    }).then((obj) => {
        user.groups.push(obj._id);

        return user.save();
    }).then((o) => {
        console.log(`save: ${JSON.stringify(o)}`);
    }).then(() => {
        return User.find({}).populate({
            path: "groups",
            populate: {
                path: "admin"
            }
        })
    }).then(async (ret) => {
        for (let user of ret){

        //    await fetchGroup(user);
            const l = user.groups;

            l.forEach((item) => console.log(item.admin));
            console.log(user);
        }
    }).catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`);
    });


}, 10000)

const fetchGroup = async (user) => {
    const g = [];

    for (let group of user.groups){
        const grp = await group.populate("admin");

        console.log(grp.admin);
        g.push(grp);

    }
    console.log(g);
    user.groups = g;
    return (user);
}
*/
require("./app");