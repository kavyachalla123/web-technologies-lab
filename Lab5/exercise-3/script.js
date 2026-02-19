let students = [];

// Fetch JSON data
async function loadStudents() {
    try {
        const response = await fetch("students.json");

        if (!response.ok) {
            throw new Error("Failed to load JSON file");
        }

        students = await response.json();
        displayStudents();

    } catch (error) {
        alert("Error loading JSON: " + error.message);
    }
}

// Display students in table
function displayStudents() {
    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = "";

    students.forEach(student => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.marks}</td>
                <td>
                    <button class="delete-btn" onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Validation
function validateInputs(id, name, course, marks) {
    if (!id || !name || !course || !marks) {
        alert("All fields are required!");
        return false;
    }

    if (marks < 0 || marks > 100) {
        alert("Marks must be between 0 and 100!");
        return false;
    }

    return true;
}

// Add Student
function addStudent() {
    const id = parseInt(document.getElementById("id").value);
    const name = document.getElementById("name").value.trim();
    const course = document.getElementById("course").value.trim();
    const marks = parseInt(document.getElementById("marks").value);

    if (!validateInputs(id, name, course, marks)) return;

    const exists = students.find(student => student.id === id);
    if (exists) {
        alert("Student ID already exists!");
        return;
    }

    students.push({ id, name, course, marks });
    displayStudents();
    clearFields();
}

// Update Student
function updateStudent() {
    const id = parseInt(document.getElementById("id").value);
    const course = document.getElementById("course").value.trim();
    const marks = parseInt(document.getElementById("marks").value);

    const student = students.find(student => student.id === id);

    if (!student) {
        alert("Student not found!");
        return;
    }

    if (course) student.course = course;
    if (marks) student.marks = marks;

    displayStudents();
    clearFields();
}

// Delete Student
function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    displayStudents();
}

// Clear input fields
function clearFields() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("course").value = "";
    document.getElementById("marks").value = "";
}

// Load data on page load
window.onload = loadStudents;
