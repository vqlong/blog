
// Description: This file contains the code to simulate the database.

const courses = [
  {
    name: "C# for beginer",
    description: "description: Khóa học này rất hay và bổ ích",
    id: 1
  },
  {
    id: 2,
    name: "Wpf vỡ lòng",
    description: "Khóa học này không thể không học"
  },
  {
    id: 3,
    name: "WindowsForm và những điều kỳ diệu",
    description: "Khóa học này có thể không học nhưng không học thì khó làm lắm"
  },
  {
    name: "Khóa học lập trình C++ cho người mới bắt đầu",
    description: "C++ khó vãi loằn nhưng bạn không thể không học",
    id: 4
  },
  {
    name: "Khoá học CSS rất cơ bản",
    description: "Học xong khóa này bạn sẽ gõ css như điên",
    id: 5
  },
  {
    name: "1Khoá học JavaScript mới nhất",
    description: "2Khóa học này ở đâu cũng có, không cần phải đến đây mới học được",
    id: 6
  },
  {
    name: "Khóa học OPP với C#",
    description: "cũng khá lằng nhằng",
    id: 7
  },
  {
    name: "Khóa học OPP với C++",
    description: "kinh vãi loằn cái khóa học này",
    id: 8
  }
];

let getCoursesMaxId = () => courses.reduce((max, course) => course.id > max.id ? course : max, {id: 0}).id;

module.exports = { courses, getCoursesMaxId };