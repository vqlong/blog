import mongoose from 'mongoose';

export default class DatabaseConfig
{
    
    static async connect()
    {
        const uri = process.env.MONGODB_URI; 
        if (!uri) throw new Error("Chưa cấu hình MONGODB_URI!");

        const conn = await mongoose.connect(uri);
        console.log(`Connect database ${conn.connection.name} successfully at ${conn.connection.host}:${conn.connection.port}`);
        
    };
    
    static async close()
    {
        await mongoose.disconnect();
        console.log('Disconnect database successfully!');
    };
    
}

