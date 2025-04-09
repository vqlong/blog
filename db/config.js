const mongoose = require('mongoose');

const dbConfig = {};

const localdb = 'mongodb://127.0.0.1:27017/blogdb';
const clouddb = 'mongodb+srv://vqlong:long931991@cluster0.emeom.mongodb.net/blogdb'

dbConfig.connect = async () =>
{
    try
    {
        await mongoose.connect(clouddb);
        console.log('Connect database successfully!');
    }
    catch (err)
    {
        console.error(err);
    }
};

dbConfig.close = async () =>
    {
        try
        {
            await mongoose.disconnect();
            console.log('Disconnect database successfully!');
        }
        catch (err)
        {
            console.error(err);
        }
    };

module.exports = dbConfig;