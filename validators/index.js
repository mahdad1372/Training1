const validator = require('./validator');
const {check} = require('express-validator');

class courseValidator extends validator {

    handle() {
        return [

            check('name')
                .isLength({min: 5})
                .withMessage('عنوان نمیتواند کمتر از 5 کاراکتر باشد'),

            check('email')
                .isEmail()
                .withMessage('you have to put email address'),

            check('hashed_password')
                .not().isEmpty()
                .withMessage('passwor is empthy'),

        ]
    }

}

module.exports = new courseValidator();