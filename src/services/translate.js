const i18n = require('i18n')
const path = require("path");


i18n.configure({
  locales: ['fr', 'en'],
  directory: path.join(__dirname, "..", "locales"),
})

i18n.setLocale('en');

exports.translate = (key, params) => {  
    if (params instanceof Array){
        return i18n.__(key, ...params);
    }
    else {
        return i18n.__(key, params);
    }
    return "";
 };
exports.locale = (key) => i18n.setLocale(key);