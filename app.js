const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
// const sass = require('sass');
const baseRoute = require('./routes/baseRoute.js');
const db = require('./db/config.js');
const cors = require('cors');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
// const readline = require('readline');
// const { setTimeout } = require('timers/promises');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
const app = express();
const port = 3000;

db.connect();

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

baseRoute.route(app);

const server = app.listen(port, "127.0.0.1", () =>
{
    console.log(`Blog app is listening on port ${port}...`);
	console.log(`Blog app is listening on ${server.address().address}:${server.address().port}...`);

    // if (err) console.log(err);

    // console.log(process.cwd());
    // console.log(__dirname);
    // console.log(__filename);

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
});

process.on('SIGINT', () =>
{
    console.log('Process interrupted!');
    db.close();
    server.close(err =>
    {
        console.log('Blog app closed!');
        if (err) console.log(err);
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




