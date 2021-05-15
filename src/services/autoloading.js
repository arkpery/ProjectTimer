const express = require("express");
const fs = require("fs");
const { Push } = require("./context");

const JS_EXTENSION = ".js";

function ReadDirRecursively(pathname, result = []) {
    const files = fs.readdirSync(`${pathname}`);

    for (let file of files) {
        if (fs.statSync(`${pathname}/${file}`).isDirectory()) {
            ReadDirRecursively(`${pathname}/${file}`, result);
        } else if (file.endsWith(JS_EXTENSION)) {
            result.push(`${pathname}/${file}`);
        }
    }
    return (result);
}

function RegisterRoutes(app){
    const routes = ReadDirRecursively(`${__dirname}/../routes`);

    for (let route of routes){
        const router = express.Router();

        Push({
            id: new Date().getTime().toString(35),
            router:router
        });
        require(route);
        app.use(router);
    }
    return (routes);
}

function autoloading(app){
    RegisterRoutes(app);
}

module.exports = {
    autoloading
};
