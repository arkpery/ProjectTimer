const translator = require("../services/translate");

exports.setLang = (req, res) => {
    const lang = req.params.lang;

    if ([
        "en",
        "fr"
    ].findIndex((el) => {
        return el === lang
    }) > -1){
        translator.locale(lang);

        res.json({
            success: true
        });
    }
    else {
        res.status(400).json({
            success: false
        });
    }
};