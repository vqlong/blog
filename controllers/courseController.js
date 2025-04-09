const mongoose = require("mongoose");
const Course = require("../models/course.js");
const Counter = require('../models/counter.js');
const baseController = require("./baseController.js");

const getId = async (counterId = 'courseId') => {
    let counter = await Counter.findOneAndUpdate(
        { id: counterId },
        { $inc: { value: 1 } },
        { new: true }
    );
	return counter.value;
}

const courseController = {};

const handleError = (res, err) =>
{
    res.status(500).json(err);
    console.error(err);
};

courseController.getCourses = async (req, res) =>
{
    // try
    // {
    //     const courses = await Course.find({});
    //     res.json(courses);
    // } catch (err)
    // {
    //     handleError(res, err);
    // }

    Course.find({ deleted: false })
        .lean()
        .then(courses => res.json(courses))
        .catch(err => handleError(res, err));
};

// '/courses/:slug'
courseController.renderCourse = async (req, res) =>
{
    const account = await baseController.getAccountLogin(req.cookies.sessionId);

    Course.findOne({ slug: req.params.slug, deleted: false })
        .lean()
        .then(course => res.render('course', { course, account }))
        .catch(err => handleError(res, err));
}

courseController.searchCourses = async (req, res) =>
{
    // console.log("search request:\n", req.params, req.query);
    let name = req.query.n;
    try
    {
        const result = await Course.find({ name: new RegExp(`.*${name}.*`), deleted: false });
        // console.log(result);
        res.send(JSON.stringify(result));
    } catch (err)
    {
        handleError(res, err);
    }
};

module.exports = courseController;
