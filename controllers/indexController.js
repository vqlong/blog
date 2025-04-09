const Course = require("../models/course.js");
const Session = require("../models/session.js");
const Account = require("../models/account.js");
const baseController = require("./baseController.js");
const cookieParser = require("cookie-parser");

const indexController = {};

indexController.index = async (req, res) => {
    // try
    // {
    //     const courses = await Course.find({});
    //     res.json(courses);
    // } catch (err)
    // {
    //     res.status(500).json({ error: 'Có 1 lỗi đã xảy ra!' });
    // }

    // console.log('protocol', req.protocol);
    // console.log('hostname', req.hostname);
    // console.log('referer', req.headers.referer);

    // console.log('req.cookies', req.cookies);

    const account = await baseController.getAccountLogin(req.cookies.sessionId);
    // console.log('account', account);
    // thằng lean() này sẽ tạo object bình thường của js, không theo cái schema nữa
    Course.find({ deleted: false })
        .lean()
        .sort({ id: -1 })
        .then((courses) =>
            res.render("home", {
                listCourses: courses,
                firstCourse: courses[0],
                isShow: true,
                showValue: courses[0].description,
                helpers: { encodeURIComponent: (value) => encodeURIComponent(value) },
                account,
            })
        );

    // Uncomment one of the following lines if needed:
    // res.render('home'/* , {layout: false} */);
    // res.sendFile('./views/courses-app/index.html', { root: __dirname });
};

module.exports = indexController;
