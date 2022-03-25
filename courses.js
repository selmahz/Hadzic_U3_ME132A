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
            ${courses.courseResponsible}
        </div>

        <h3>Teachers:</h3>
        <div id="teachers">
            ${courses.teachers}
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

function render(student) {
    let studentData = DATABASE.students;
    let students = [];
    for (let i = 0; i < student.courses.length; i++) {
        let id = student.courses[i].courseId;
        students.push(studentData[id])
    }

    let studentBox = []
    for (let i = 0; i < student.length; i++) {
        let div = document.createElement("div")

        if (student.courses[i].passedCredits == studentData[courses[i].courseId].totalCredits) {
            let text = div.innerHTML = 
            `<div class="done"><h2>${students[i].firstName} ${students[i].lastName} (${students[i].courseId.passedCredits})</h2>
            <p>${student.courses[i].started.semester} ${student.courses[i].started.year}</p>`
            studentBox.push(text);

        } else {
            let text = div.innerHTML = 
            `<div class="notdone"><h2>${students[i].firstName} ${students[i].lastName} (${students[i].courseId.passedCredits})</h2>
            <p>${student.courses[i].started.semester} ${student.courses[i].started.year}</p>`
            studentBox.push(text);
        }
    }
    return studentBox.toString().split(",").join("");
}



renderCourses(DATABASE.courses);