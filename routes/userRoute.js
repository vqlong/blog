const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController.js');

// middleware
userRoute.use((req, res, next) =>
{
    // console.log('middleware', req.headers.referer);
    // chứa query của request sort đang gửi tới
    // được truyền vào view khi response
    res.locals.sorting = {
        enabled: false,
        type: 'default'
    };

    if (req.query.hasOwnProperty('_sort'))
    {
        Object.assign(res.locals.sorting, {
            enabled: true,
            column: req.query.column,
            type: req.query.type
        });
    }

    next();
});

userRoute.get('/courses', (req, res) => userController.renderCourses(req, res));
userRoute.get('/insert', (req, res) => userController.renderInsert(req, res));
userRoute.get('/trash', (req, res) => userController.renderTrash(req, res));
userRoute.get('/update/:id', (req, res) => userController.renderUpdate(req, res));
userRoute.get('/logout/', (req, res) => userController.logout(req, res));
userRoute.get('/', (req, res) => userController.renderUser(req, res));
userRoute.post('/insert', (req, res) => userController.insertCourse(req, res));
userRoute.put('/update/:id', (req, res) => userController.updateCourse(req, res));
userRoute.patch('/restore/:id', (req, res) => userController.restoreCourse(req, res));
userRoute.delete('/delete/:id', (req, res) => userController.deleteCourse(req, res));

module.exports = userRoute;
