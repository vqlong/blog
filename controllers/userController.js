import Course from "../models/course.js";
import Counter from '../models/counter.js';
import Session from "../models/session.js";
import BaseController from "./BaseController.js";

const getId = async (counterId = 'courseId') => {
    let counter = await Counter.findOneAndUpdate(
        { id: counterId },
        { $inc: { value: 1 } },
        { new: true }
    );
	return counter.value;
}

const userController = {};

const msgNotLogin = { message: 'Bạn vẫn chưa đăng nhập!' };

const getBtnSort = (column, sorting, path) =>
{
    let type = 'asc';
    let icon = '<i class="fa-solid fa-sort"></i>';
    if (column === sorting.column)
    {
        if (sorting.type === 'default')
        {
            type = 'asc';
            icon = '<i class="fa-solid fa-sort"></i>';
            return `<a href="${path}?_sort&column=${column}&type=${type}">${icon}</a>`;
        }
        else if (sorting.type === 'asc')
        {
            type = 'desc';
            icon = '<i class="fa-solid fa-arrow-up-wide-short"></i>';
            return `<a href="${path}?_sort&column=${column}&type=${type}">${icon}</a>`;
        }
        else if (sorting.type === 'desc')
        {
            icon = '<i class="fa-solid fa-arrow-up-short-wide"></i>';
            return `<a href="${path}">${icon}</a>`;
        }
    }
    else
    {
        return `<a href="${path}?_sort&column=${column}&type=${type}">${icon}</a>`;
    }
};
    
const helpers = { sum: (a, b) => a + b, getBtnSort };

userController.renderUser = (req, res) =>
{
    BaseController.getAccountLogin(req.cookies.sessionId)
        .then(account =>
        {
            if (account) res.render('user/user', { account });
            else res.json(msgNotLogin);
        });
    
};

userController.renderCourses = (req, res) =>
{
    // console.log(req.query);
    // res.json(res.locals._sort);
    // return;

    BaseController.getAccountLogin(req.cookies.sessionId)
        .then(account =>
        {
            if (account)
            {
                Course.find({ accountId: account._id, deleted: false })
                    .lean()
                    .sort(req.query.hasOwnProperty('_sort') ? {[req.query.column]: req.query.type} : {})
                    .then(courses => res.render('user/courses', { account, courses, helpers }))
                    .catch(err => BaseController.handleError(res, err));
            }
            else
            {
                res.json(msgNotLogin);
            }
        });
    
};

userController.renderInsert = (req, res) =>
{
    BaseController.getAccountLogin(req.cookies.sessionId)
        .then(account =>
        {
            if (account) res.render('user/insert', { account });
            else res.json(msgNotLogin);
        });
};

userController.insertCourse = async (req, res) =>
{
    BaseController.getAccountLogin(req.cookies.sessionId)
        .then(async account =>
        {
            if (account)
            {
                const newId = await getId();
                console.log('new course id: ', newId);
                let course = new Course({ id: newId, accountId: account._id, ...req.body });
                course.save()
                    .then(savedCourse => console.log(savedCourse))
                    .then(() => res.redirect('/user/courses'))
                    .catch(err => BaseController.handleError(res, err));
            }
            else
            {
                res.json(msgNotLogin);
            }
        });
    
};

userController.renderUpdate = (req, res) =>
{
    // console.log(req.params.id);
    BaseController.getAccountLogin(req.cookies.sessionId)
        .then(account =>
        {
            if (account)
            {
                Course.findOne({ _id: req.params.id, deleted: false })
                    .lean()
                    .then(course => res.render('user/update', { account, course }));
            }
            else
            {
                res.json(msgNotLogin);
            }
        });

};

userController.updateCourse = (req, res) =>
{
    // console.log(req.params.id);
    BaseController.getAccountLogin(req.cookies.sessionId)
        .then(account =>
        {
            if (account)
            {
                Course.updateOne({ _id: req.params.id }, { $set: { ...req.body, updated: Date.now() } })
                    .then(() => res.redirect('/user/courses'));
            }
            else
            {
                res.json(msgNotLogin);
            }
        });
   
};

userController.deleteCourse = (req, res) =>
{
    // console.log(req.params.id);
    BaseController.getAccountLogin(req.cookies.sessionId)
        .then(account =>
        {
            if (account)
            {
                // Course.deleteOne({ _id: req.params.id })
                //     .then(() => res.redirect('/user/courses'));

                // soft delete
                Course.updateOne({ _id: req.params.id }, { $set: { deleted: true, deletedAt: Date.now() } })
                    .then(() => res.redirect('/user/courses'));
            }
            else
            {
                res.json(msgNotLogin);
            }
        });
};

userController.renderTrash = (req, res) =>
{
    BaseController.getAccountLogin(req.cookies.sessionId)
        .then(account =>
        {
            if (account)
            {
                Course.find({ accountId: account._id, deleted: true })
                    .lean()
                    .sort(req.query.hasOwnProperty('_sort') ? { [req.query.column]: req.query.type } : {})
                    .then(courses => res.render('user/trash', { account, courses, helpers }))
                    .catch(err => BaseController.handleError(res, err));
            }
            else
            {
                res.json(msgNotLogin);
            }
        });
        
};

userController.restoreCourse = (req, res) =>
    {
        // console.log(req.params.id);
        BaseController.getAccountLogin(req.cookies.sessionId)
            .then(account =>
            {
                if (account)
                {
                    Course.updateOne({ _id: req.params.id }, { $set: { deleted: false, deletedAt: null } })
                        .then(() => res.redirect('/user/courses'));
                }
                else
                {
                    res.json(msgNotLogin);
                }
            });
    };

userController.logout = (req, res) =>
{
    console.log('logout/req.cookies', req.cookies);

    if (req.cookies.sessionId)
    {
        Session.deleteOne({ _id: req.cookies.sessionId })
            .then(result =>
            {
                // res.clearCookie('sessionId')
                //     .redirect('http://localhost:3000');

                const expires = new Date(0).toUTCString();
                // để xóa cookie cần điền đầy đủ cả path
                res.setHeader('Set-Cookie', `sessionId=;path=/;expires=${expires};`)
                .redirect('/');
                
            });
    }
    else
    {
        res.json(msgNotLogin);
    }
};

export default userController;
