import express from 'express';
import userController from '../controllers/userController.js';
const userRouter = express.Router();

// middleware
userRouter.use((req, res, next) =>
{
    // console.log('middleware', req.headers.referer);
    // chứa query của request sort đang gửi tới
    // được truyền vào view khi response
    res.locals.sorting = {
        enabled: false,
        type: 'default'
    };

    if ('_sort' in req.query)
    {
        Object.assign(res.locals.sorting, {
            enabled: true,
            column: req.query.column,
            type: req.query.type
        });
    }

    next();
});

userRouter.get('/courses', (req, res) => userController.renderCourses(req, res));
userRouter.get('/insert', (req, res) => userController.renderInsert(req, res));
userRouter.get('/trash', (req, res) => userController.renderTrash(req, res));
userRouter.get('/update/:id', (req, res) => userController.renderUpdate(req, res));
userRouter.get('/logout/', (req, res) => userController.logout(req, res));
userRouter.get('/', (req, res) => userController.renderUser(req, res));
userRouter.post('/insert', (req, res) => userController.insertCourse(req, res));
userRouter.put('/update/:id', (req, res) => userController.updateCourse(req, res));
userRouter.patch('/restore/:id', (req, res) => userController.restoreCourse(req, res));
userRouter.delete('/delete/:id', (req, res) => userController.deleteCourse(req, res));

 export default userRouter;
