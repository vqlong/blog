const ip = '192.168.1.3:3000';
const hostAddress = `http://${ip}/courses`;

start();

function start()
{
    console.log(location.href);
    // getCourses(renderCourses);
    // setupFormAddCourse();
}

function handleResponse(response)
{
    if (response.ok)
    {
        return response.json();
    }
    else
    {
        response.text().then((text) => console.error("server said:", text));
        throw new Error(response.status + " " + response.statusText);
    }
}

function getCourses(afterGetCourses)
{
    fetch(hostAddress)
        .then(response => handleResponse(response))
        .then(courses => afterGetCourses(courses))
        .catch(err => console.error(err));
    // .catch để dưới cùng để khi throw error nó chạy thẳng xuống đây là hết
    // nếu không sau khi .catch xong nó vẫn chạy tiếp .then khác
}

function searchCourses(name, description, afterSearchCourses)
{
    fetch(`${hostAddress}/search?n=${encodeURIComponent(name)}&d=${encodeURIComponent(description)}`)
        .then(response => handleResponse(response))
        .then(courses => afterSearchCourses(courses))
        .catch(err => console.error(err));
 
}

function renderCourses(courses)
{
    let html = '';
    courses.forEach(course => 
    {
        html += htmlCourse(course);
    });

    document.getElementById('list-courses').innerHTML = html;
    //console.log(courses);
}

function htmlCourse(course)
{
    html =
    `<div class="col-md-4 course-wrapper" data-id="${course.id}">
        <div class="card mb-5">
            <a href="${hostAddress}/${course.slug}">
                <img src="${course.thumb}" class="card-img-top" alt="..." />
            </a>
            <div class="card-body">
                <a href="${hostAddress}/${course.slug}">
                    <h5 class="card-title">${course.name}</h5>
                <a/>
                <p class="card-text">${course.description}</p>
                <a href="#" class="btn btn-primary">Vào xem</a>
            </div>
            <div class="p-2">
                <button class="btn btn-success mt-3" onclick="editCourse(${course.id})">
                    Sửa
                </button>
                <button class="btn btn-danger mt-3" onclick="deleteCourse(${course.id})">
                    Xóa
                </button>
            </div>
        </div>
    </div>`;

    return html;
}

function addCourse(course)
{
    fetch(hostAddress + '/insert',
        {
            method: 'POST',
            // mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)//new URLSearchParams(course) // URLSearchParams dùng cho x-www-form-urlencoded
        })
        .then(response => handleResponse(response))
        .then(reponseCourse =>
            document.querySelector('.courses-container .row').insertAdjacentHTML('afterbegin', htmlCourse(reponseCourse)))
        .catch(err => console.error(err));
    
}

function deleteCourse(id)
{
    fetch(`${hostAddress}/${id}`,
        {
            method: 'DELETE'
        })
        .then(response => handleResponse(response))
        .then(result => result.deletedCount === 1 ? document.querySelector(`.course-wrapper[data-id="${id}"]`).remove() : '')
        .catch(err => console.error(err));
    
}

function editCourse(id)
{
    let li = document.querySelector(`li[data-id="${id}"]`);
    let name = li.querySelector('.course-name').innerText;
    let description = li.querySelector('.course-description').innerText;

    fetch(`${hostAddress}/${id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: name, description: description})
        })
        .then(response => handleResponse(response))
        .then(course => console.log(course))
        .catch(err => console.error(err));
    
}

function setupFormAddCourse()
{
    // document.getElementById('form-insert-course').addEventListener('submit', function(event)
    // {
    //     event.preventDefault();
    //     let form = event.target;
    //     const name = form.querySelector('[name=name]').value;
    //     const slug = form.querySelector('[name=slug]').value;
    //     const videoId = form.querySelector('[name=videoId]').value;
    //     let thumb = form.querySelector('[name=thumb]').value;
    //     if (thumb == '')
    //         thumb = 'https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/7f8f028196ca.jpeg';
    //     const description = form.querySelector('[name=description]').value;
    //     addCourse({name, slug, videoId, thumb, description});
    // });

    // document.getElementById('btn-search-courses').addEventListener('click', function (event)
    // {
    //     let form = document.getElementById('form-insert-course');
    //     let name = form.querySelector('[name=name]').value;
    //     let description = form.querySelector('[name=description]').value;
    //     searchCourses(name, description, renderCourses);
    // });
}

// bind
const Id = document.getElementById.bind(document);
const Select = document.querySelector.bind(document);
const SelectAll = document.querySelectorAll.bind(document);