import mongoose from "mongoose";
import Course from "../models/course.js";
import Counter from '../models/counter.js';
import BaseController from './BaseController.js';

const getId = async (counterId = 'courseId') =>
{
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
    const account = await BaseController.getAccountLogin(req.cookies.sessionId);

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

export default courseController;
