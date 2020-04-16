const User = require('../models/user');

const {validationResult} = require('express-validator');

module.exports =new class SignUpController {
    async index(req, res, next) {
        try {

            let status = await this.validationData(req);
            if (status) {
                const userExists = await User.findOne({email: req.body.email});

                const user = await new User(req.body);
                await user.save().then(() => {
                    return res.send(user)
                }).catch((e) => {
                    return res.status(400).send(e)
                })
            }
            return res.json('failed')
        } catch (e) {
            next(e);
        }

    }

    validationData(req) {
        const errors = validationResult(req);
        let messages = [];
        errors.array().forEach(error => messages.push(error.msg));
        if (messages.length === 0) {
            return true;
        } else {
            console.log(messages);
            return false;
        }
    }
};