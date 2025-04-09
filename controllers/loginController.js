const Session = require("../models/session.js");
const Account = require("../models/account.js");

const crypto = require('crypto');

const Sha256 = (inputString) =>
{
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
};

const loginController = {};

loginController.renderLogin = (req, res) => res.render('login');

loginController.login = (req, res) =>
{
    console.log('referer', req.headers.referer);

    // console.log(req.body);
    // res.json({ [req.body.password]: Sha256(req.body.password) });

    Account.findOne({ username: req.body.username, password: Sha256(req.body.password) })
        .select({ password: 0 })
        .lean()
        .then(account =>
        {
            if (account)
            {
                console.log('login account', account);
                let session = new Session({ accountId: account._id });
                session.save()
                    .then(savedSession =>
                    {
                        console.log('new session', savedSession);
                        const expires = new Date(Date.now() + 600000).toUTCString();
                        res.setHeader('Set-Cookie', `sessionId=${savedSession._id};path=/;expires=${expires};`)
                            .redirect('/');
                    });
            }
            else
            {
                res.render('login', { message: 'Đăng nhập thất bại!' });
            }
        });

}

module.exports = loginController;