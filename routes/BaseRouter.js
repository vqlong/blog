import courseRouter from './courseRouter.js';
import indexRouter from './indexRouter.js';
import userRouter from './userRouter.js';
import loginRouter from './loginRouter.js';
import registerRouter from './registerRouter.js';

export default class BaseRouter
{
    static route(app)
    {
        // các route bắt đầu bằng /courses sẽ được chuyển sang file courseRoute.js
        app.use('/courses', courseRouter);
        app.use('/user', userRouter);
        app.use('/login', loginRouter);
        app.use('/register', registerRouter);
        app.use('/index', indexRouter);
        app.use('/home', indexRouter);

        // route có path ít chi tiết nhất để xuống cuối cùng
        app.use('/', indexRouter);
        
    };
    
}
