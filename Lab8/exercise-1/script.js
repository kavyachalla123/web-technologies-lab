// Arrow function to calculate average
const calculateAverage = (m1, m2, m3) => {
return (m1 + m2 + m3) / 3;
}

function calculate(){

let studentName = document.getElementById("name").value;

let mark1 = Number(document.getElementById("m1").value);
let mark2 = Number(document.getElementById("m2").value);
let mark3 = Number(document.getElementById("m3").value);

// total marks
let total = mark1 + mark2 + mark3;

// average using arrow function
let average = calculateAverage(mark1, mark2, mark3);

// display result using template literals
document.getElementById("result").innerHTML =
`Student Name: ${studentName} <br>
Total Marks: ${total} <br>
Average Marks: ${average.toFixed(2)}`;

}