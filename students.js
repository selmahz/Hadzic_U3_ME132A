"use strict";

//skapar globala variablar i databasen 
let students = DATABASE.students;

// skapar div med id result som innehåller elevens för och efternamn samt totala credits.
// även en div som visar repsketive elevs kurser.
function renderStudent(id) {
    let div = document.createElement("div");
    let student = DATABASE.students[id];
    div.id = "result";
    div.innerHTML =
    `<header>${student.firstName} ${student.lastName} (total credits: ${totalCredits(student)}) </header>
    <div>
        <div id="studentcourses">
        <h3>Courses:</h3>
        <div id="courses">
            ${renderCourses(student)}
        </div>
    </div>
    </div>`

    return div;
}

// skapar en funktion som räknar ut respektive students totala credits
function totalCredits(student) {
    let credits = []
    for (let course of student.courses) {
        credits.push(course.passedCredits)
    };

    let creditSum = 0
    for (let i = 0; i < credits.length; i++){
        creditSum += credits[i]
    };
    return creditSum;
}

function showStudents (students) {
    let studentsElement = document.getElementById("result");
    for (let student of students) {
        let studentElement = renderStudent(student.studentID);
        studentsElement.appendChild(studentElement);
    }
}

// funktion och loop som skapar div element för studenter
function renderCourses (student){
    let courseData = DATABASE.courses;
    let courses = [];
    for (let i = 0; i < student.courses.length; i++){
        let id = student.courses[i].courseId 
        courses.push(courseData[id])
    }

   let courseDiv = []
   for (let i = 0; i < courses.length; i++) {
       let div = document.createElement("div");

        // delat upp vilka kurser som är klara och vilka som inte är klara - innehåller titel av kurser, när eleven började kursen,
        // samt hur många poäng av möjliga studenten har i olika kurser 
       if (student.courses[i].passedCredits == courseData[courses[i].courseId].totalCredits) {
           let text = div.innerHTML = 
           `<div class="done"><h4>${courses[i].title}</h4>
           <p><b><i>Started:</i></b> ${student.courses[i].started.semester} ${student.courses[i].started.year} </p>
           <p>(${student.courses[i].passedCredits} of ${courseData[courses[i].courseId].totalCredits} credits)</p></div>`
           courseDiv.push(text)
       } else {
           let text = div.innerHTML = 
           `<div class="notdone"><h4>${courses[i].title}</h4>
           <p><b><i>Started:</b> ${student.courses[i].started.semester} ${student.courses[i].started.year} </p>
           <p>(${student.courses[i].passedCredits} of ${courseData[courses[i].courseId].totalCredits} credits)</p></div>`
           courseDiv.push(text)
       }
   }

   return courseDiv.toString().split(",").join("");
}



function searchLastName() {
    return input.value.toLowerCase();
}

let input = document.getElementById("students-search");
input.addEventListener("keyup", studentLastName);

function studentLastName (){
    let studentsArray = []
    for ( let i = 0; i < students.length; i++){
        document.getElementById("result").innerHTML = ""
        if ("" == searchLastName()){
            document.getElementById("result").innerHTML = ""
        } else if (students[i].lastName.toLowerCase().includes(searchLastName())) {
            studentsArray.push(students[i]);
        } 

    }

    showStudents(studentsArray)
}

function submit () {
    let studentsArray = []
    for ( let i = 0; i < students.length; i++){
        if (students[i].lastName.toLowerCase().includes(searchLastName())) {
            studentsArray.push(students[i]);
        } 
    }

    showStudents(studentsArray)
}

input.addEventListener("submit", submit);


// kallar (initierar) på hemsidan, alltså får fram alla studenter
showStudents(DATABASE.students);
