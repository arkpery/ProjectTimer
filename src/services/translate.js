const i18n = require('i18n')
const path = require("path");


i18n.configure({
  locales: ['fr', 'en'],
  directory: path.join(__dirname, "..", "locales"),
})

i18n.setLocale('en');

exports.translate = (key, params) => i18n.__(key, params);
exports.locale = (key) => i18n.setLocale(key);