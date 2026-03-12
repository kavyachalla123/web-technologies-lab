function showStudent(){

// Get user input
let id = document.getElementById("id").value;
let name = document.getElementById("name").value;
let department = document.getElementById("dept").value;
let marks = Number(document.getElementById("marks").value);

// Create student object
const student = {
id,
name,
department,
marks
};

// Object destructuring
const {id: sid, name: sname, department: sdept, marks: smarks} = student;

// Display extracted values
document.getElementById("details").innerHTML =
`Student Info: ${sid} ${sname} ${sdept} ${smarks}`;

// Decide grade
let grade;
if(smarks >= 90) grade = "A";
else if(smarks >= 75) grade = "B";
else if(smarks >= 60) grade = "C";
else grade = "D";

// Create updated object using spread operator
const updatedStudent = {
...student,
grade
};

// Display updated object
document.getElementById("updated").innerHTML =
`Updated Student:<br> ${JSON.stringify(updatedStudent, null, 2)}`;

}