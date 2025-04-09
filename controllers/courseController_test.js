// controller này chỉ để test trên file courses-db.json

const fs = require('node:fs');

const courses = [];
const getCoursesMaxId = () => courses.reduce((max, course) => course.id > max.id ? course : max, {id: 0}).id;

const courseController = {};

courseController.loadCourses = () =>
{
    // clear array
    courses.length = 0;

    fs.readFile(process.cwd() + '/db/courses-db.json', 'utf8', (err, data) =>
    {
        if (err)
        {
            console.error(err);
            return;
        }
        // console.log("courses-db.json:\n", data);
        courses.push(...JSON.parse(data));
        // console.log("courses:\n", courses);
    });
};

courseController.saveCourses = () =>
{
    fs.writeFile(process.cwd() + '/db/courses-db.json', JSON.stringify(courses, null, 2), (err) =>
    {
        if (err)
        {
            console.error(err);
            return;
        }
        // console.log('save courses success!');
    });
};

courseController.getCourses = (req, res) => res.send(JSON.stringify(courses));

courseController.searchCourses = (req, res) =>
{
    console.log("search request:\n", req.params, req.query);
    let name = req.query.n;
    let result = courses.filter(course => course.name.indexOf(name) !== -1);
    res.send(JSON.stringify(result));
};

courseController.insertCourse = (req, res) =>
{
    // console.log("post request:\n", req.body);
    courses.push({ id: getCoursesMaxId() + 1, ...req.body });
    res.send(JSON.stringify(courses[courses.length - 1]));
    courseController.saveCourses();
};

courseController.deleteCourse = (req, res) =>
{
    // console.log("delete request:\n", req.params);
    let id = parseInt(req.params.id);
    let index = courses.findIndex(course => course.id === id);
    let course = courses[index];
    courses.splice(index, 1);
    res.send(JSON.stringify({}));
    courseController.saveCourses();
};

courseController.updateCourse = (req, res) =>
{
    // console.log("put request:\n", req.params, req.body);
    let id = parseInt(req.params.id);
    let index = courses.findIndex(course => course.id === id);
    let course = courses[index];
    courses[index] = { id: course.id, ...req.body };
    res.send(JSON.stringify(courses[index]));
    courseController.saveCourses();
};

module.exports = courseController;