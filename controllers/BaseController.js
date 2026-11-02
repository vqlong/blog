import Session from "../models/session.js";
import Account from "../models/account.js";

export default class BaseController
{
    static handleError(res, err)
        {
            res.status(500).json(err);
            console.error(err);
        };
    
    static async getAccountLogin(sessionId)
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
    
}


