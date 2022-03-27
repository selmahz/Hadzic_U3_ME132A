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
            <div id="responsibleteacher"><h2>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</h2>`
            responsibleBox.push(text);

        } 
    }
    return responsibleBox.toString().split(",").join(""); 
}     


function findTeachers(courses) {
    let teacherBox = [];
    for (let i = 0; i < DATABASE.teachers.length; i++) {
        let div = document.createElement("div")
        if (DATABASE.teachers[i].teacherId == courses.teachers[0]) {
            let text = div.innerHTML = `
            <div id="findteacher"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName}</h4></div>`
            teacherBox.push(text);
        } else if (DATABASE.teachers[i].teacherId == courses.teachers[1]) {
            let text = div.innerHTML = `
            <div id="findteacher"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName}</h4></div>`
            teacherBox.push(text);
        } else if (DATABASE.teachers[i].teacherId == courses.teachers[2]) {
            let text = div.innerHTML = `
            <div id="findteacher"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName}</h4></div>`
            teacherBox.push(text);
        } 
    }
    return teacherBox.toString().split(",").join("");
}

//students: en loop som loopar igenom studenter, i den loopen loopa igenom den studentens kurser så det blir student[i].courses.lenght 
//i den loopen ska vi ha en ifsats som kollar om sutdents[i].courses[i].courseId == courses.courseId 


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