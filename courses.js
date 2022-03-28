"use strict";

let courses = DATABASE.courses;

function renderCourse(id) {
    let div = document.createElement("div");
    let courses = DATABASE.courses[id];
    div.classList = "result";
    div.innerHTML =
    `<header>${courses.title} (total credits: ${courses.totalCredits})</header>
    <div>
        <h3>Course Responsible:</h3>
        <div id="resteachers">${findResponsible(courses)}</div>
        <br>
        <h3>Teachers:</h3>
        <div id="teachers">${findTeachers(courses)}</div>
        <br>
        <h3>Students:</h3>
        <div id="students">
        ${findStudents(courses)}</div>
        <br>
        <div id="border"></div>
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
            <div id="responsibleteacher"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</h2>`
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
            <div id="findteachers"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName}</h4></div>`
            teacherBox.push(text);
        } else if (DATABASE.teachers[i].teacherId == courses.teachers[1]) {
            let text = div.innerHTML = `
            <div id="findteachers"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName}</h4></div>`
            teacherBox.push(text);
        } else if (DATABASE.teachers[i].teacherId == courses.teachers[2]) {
            let text = div.innerHTML = `
            <div id="findteachers"><h4>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName}</h4></div>`
            teacherBox.push(text);
        } 
    }
    return teacherBox.toString().split(",").join("");
}

function findStudents(courses) {
    let studentBox = [];
    for (let i = 0; i < DATABASE.students.length; i++) {
        let div = document.createElement("div");
        for ( let x = 0; x <DATABASE.students[i].courses.length; x++)
        if (DATABASE.students[i].courses[x].courseId == courses.courseId && DATABASE.students[i].courses[x].passedCredits == courses.totalCredits) {
            let text = div.innerHTML = `
            <div class="done"><h4>${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName} (${DATABASE.students[i].courses[x].passedCredits} credits)  </h4>
            <p>${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}</div>`
            studentBox.push(text);
        } else if (DATABASE.students[i].courses[x].courseId == courses.courseId){
            let text = div.innerHTML = `
            <div class="notdone"><h4>${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName} (${DATABASE.students[i].courses[x].passedCredits} credits)  </h4>
            <p>${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}</div>`
            studentBox.push(text);
        }
    }
    return studentBox.toString().split(",").join("");
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