"use strict";

let courses = DATABASE.courses;

function renderCourse(id) {
    let div = document.createElement("div");
    let courses = DATABASE.courses[id];
    div.classList = "result";
    div.innerHTML =
    `<header>${courses.title} (total credits: ${courses.totalCredits})</header>
    <div>
        <div id="studentcourses">

        <h3>Course Responsible:</h3>
        <div id="teachers">
        ${findResponsible(courses)}
        </div>

        <h3>Teachers:</h3>
        ${findTeachers(courses)}
        <div id="teachers">
        </div>
        <h3>Students:</h3>
        <div>
        </div>
    </div>
    </div>
          `
    return div;
}

function renderCourses (courses) {
    let coursesElement = document.getElementById("result");
    for (let course of courses) {
        let courseElement = renderCourse(course.courseId);
        coursesElement.appendChild(courseElement);
    }
}

function findResponsible (courses) {
let responsibleBox = []
        for (let i = 0; i < DATABASE.teachers.length; i++) {
        let div = document.createElement("div")
        if (DATABASE.teachers[i].teacherId == courses.courseResponsible) {
            let text = div.innerHTML = `
            <div class="responsibleteacher"><h2>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</h2>`
            responsibleBox.push(text);

        } 
    }
    return responsibleBox.toString().split(",").join(""); 
}     



function searchCourse() {
    return input.value.toLowerCase();
}

let input = document.getElementById("course-search");
input.addEventListener("keyup", courseSearch);

function courseSearch() {
    let coursesArray = []
    for (let i = 0; i < courses.length; i++){
        document.getElementById("result").innerHTML = ""
        if ("" == searchCourse()) {
            document.getElementById("result").innerHTML = ""
        } else if (courses[i].title.toLowerCase().includes(searchCourse())) {
            coursesArray.push(courses[i]);
        }
    }

    renderCourses(coursesArray)
}

function submit () {
    let coursesArray = []
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].courses.toLowerCase().includes(searchCourse)) {
            coursesArray.push(courses[i]);
        }
    }
    renderCourses(coursesArray)
}

input.addEventListener("submit", submit);

renderCourses(DATABASE.courses);