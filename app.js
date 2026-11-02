import 'dotenv/config'; 
import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
// import sass from 'sass';
import BaseRouter from './routes/BaseRouter.js';
import db from './db/config.js';
import cors from 'cors';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
// const readline = require('readline');
// const { setTimeout } = require('timers/promises');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
const app = express();
const port = process.env.PORT ?? 3000; 

// Centralized Error Handling (Quản lý lỗi tập trung)
// Để app.js tự quyết định vòng đời của app
try
{
    await db.connect();
}
catch (err)
{
    console.error(err);
    process.exit(1);
}

// compile scss to css
// const styles = sass.compile('./views/scss/styles.scss');
// console.log(styles.css);
// const stylesmin = sass.compile('./views/scss/styles.scss', { style: 'compressed' });
// console.log(stylesmin.css);

app.use(cookieParser());

// đưa morgan lên trước các route thì nó mới bắt được (để ghi log request)
app.use(morgan('[:date[clf]] :method :url :status :response-time ms'));

app.use(methodOverride('_method'));

app.use(cors());

// cài đặt static file
// khi request đến /static thì sẽ trỏ đến thư mục assets trong views/courses-app
app.use('/static', express.static(process.cwd() + '/views/courses-app/assets'))

// cài đặt handlebars (là 1 cái template)
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
// app.enable('view cache');

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

BaseRouter.route(app);

const server = app.listen(port, "127.0.0.1", () =>
{
	console.log(`Blog app is listening on ${server.address().address}:${server.address().port}`);

    // console.log("Current working directory:",process.cwd());

    // setTimeout(2000).then(() => rl.question(`# app >>> `, cmd =>
    // {
    //     // console.log(cmd);
    //     if (cmd.trim() === 'exit')
    //     {
    //         rl.close();
    //         process.exit(0);
    //     }
    // }));
    
});

server.on("error", err =>
{
    if (err.code === "EADDRINUSE")
    {
        console.error(`Port ${port} is already in use.`);
    }
    else
    {
        console.error(err);
    }
    
    db.close();
});

// Khi ctrl+c
process.on('SIGINT', () =>
{
    console.log('Process interrupted.');
    db.close();
    server.close(err =>
    {
        console.log('Blog app closed.');
        if (err) console.error(err);
    });
});
    
// process.on('exit', () =>
// {
//     console.log('Process exitted');
//     db.close();
//     server.close(err =>
//     {
//         console.log('Blog app closed!');
//         if (err) console.log(err);
//     });
// });
    
// process.on('SIGTERM', () =>
// {
//     console.log('app terminate and exit');
// });



export default app;

