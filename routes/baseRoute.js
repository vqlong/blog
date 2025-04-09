const courseRoute = require('./courseRoute.js');
const indexRoute = require('./indexRoute.js');
const userRoute = require('./userRoute.js');
const loginRoute = require('./loginRoute.js');
const registerRoute = require('./registerRoute.js');

const baseRoute = {};
baseRoute.route = app =>
{
    // các route bắt đầu bằng /courses sẽ được chuyển sang file courseRoute.js
    app.use('/courses', courseRoute);
    // courseRoute.loadCourses();

    app.use('/user', userRoute);

    app.use('/login', loginRoute);
    app.use('/register', registerRoute);

    app.use('/index', indexRoute);
    app.use('/home', indexRoute);
    // route có path ít chi tiết nhất để xuống cuối cùng
    app.use('/', indexRoute);
    
};

module.exports = baseRoute;