import Session from "../models/session.js";
import Account from "../models/account.js";
import BaseController from "./BaseController.js";

import crypto from 'crypto';

const Sha256 = (inputString) =>
{
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
};

const registerController = {};

registerController.renderRegister = (req, res) => res.render('register');

registerController.register = (req, res) =>
{
    // console.log(req.body);
    // res.json({ [req.body.password]: Sha256(req.body.password) }); return;

    Account.findOne({ username: req.body.username })
        .select({ password: 0 })
        .lean()
        .then(account =>
        {
            if (account)
            {
                res.render('register', { message: 'Đăng ký thất bại!' });
                
            }
            else
            {
                let acc = new Account({ username: req.body.username, password: Sha256(req.body.password) });
                acc.save()
                    .then(saved => console.log('new account', saved))
                    .then(() => res.redirect('/'))
                    .catch(err => BaseController.handleError(res, err));
            }
        });

}

export default registerController;