const Session = require("../models/session.js");
const Account = require("../models/account.js");

const baseController = {};

baseController.handleError = (res, err) =>
    {
        res.status(500).json(err);
        console.error(err);
    };

baseController.getAccountLogin = async (sessionId) =>
{
    // console.log('sessionId', sessionId);
    if (sessionId)
    {
        const session = await Session.findById(sessionId);
        // console.log('session', session);
        if (session)
        {
            const acc = await Account.findById(session.accountId)
                .select({ username: 1, avatar: 1 })
                .lean();
    
            return acc;            
        }
        else
        {
            return undefined;
        }
    }
    else
    {
        return undefined;
    }
};

module.exports = baseController;
