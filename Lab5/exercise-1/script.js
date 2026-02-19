const tableBody = document.getElementById("empTable");
const form = document.getElementById("empForm");
const message = document.getElementById("message");

let xmlDoc;

// READ (Fetch XML using AJAX)
function loadEmployees() {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);

    xhr.onload = function () {
        if (xhr.status === 200) {

            if (!xhr.responseXML) {
                showMessage("Malformed XML file.", "error");
                return;
            }

            xmlDoc = xhr.responseXML;

            const employees = xmlDoc.getElementsByTagName("employee");

            if (employees.length === 0) {
                showMessage("No employees found.", "error");
                tableBody.innerHTML = "";
                return;
            }

            displayEmployees();
            showMessage("Employees loaded successfully (200 OK)", "success");

        } else {
            showMessage("Error loading XML file (404/500).", "error");
        }
    };

    xhr.onerror = function () {
        showMessage("Network error occurred.", "error");
    };

    xhr.send();
}

// DISPLAY
function displayEmployees() {
    tableBody.innerHTML = "";

    const employees = xmlDoc.getElementsByTagName("employee");

    for (let i = 0; i < employees.length; i++) {

        const id = employees[i].getElementsByTagName("id")[0].textContent;
        const name = employees[i].getElementsByTagName("name")[0].textContent;
        const dept = employees[i].getElementsByTagName("department")[0].textContent;
        const salary = employees[i].getElementsByTagName("salary")[0].textContent;

        const row = `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${dept}</td>
                <td>${salary}</td>
                <td>
                    <button onclick="editEmployee(${i})">Edit</button>
                    <button onclick="deleteEmployee(${i})">Delete</button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    }
}

// CREATE
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("empId").value;
    const name = document.getElementById("empName").value;
    const dept = document.getElementById("empDept").value;
    const salary = document.getElementById("empSalary").value;

    const newEmployee = xmlDoc.createElement("employee");

    newEmployee.innerHTML = `
        <id>${id}</id>
        <name>${name}</name>
        <department>${dept}</department>
        <salary>${salary}</salary>
    `;

    xmlDoc.getElementsByTagName("employees")[0].appendChild(newEmployee);

    displayEmployees();
    showMessage("Employee added successfully.", "success");

    form.reset();
});

// UPDATE
function editEmployee(index) {

    const employees = xmlDoc.getElementsByTagName("employee");
    const emp = employees[index];

    const newDept = prompt("Enter new Department:", emp.getElementsByTagName("department")[0].textContent);
    const newSalary = prompt("Enter new Salary:", emp.getElementsByTagName("salary")[0].textContent);

    if (newDept) emp.getElementsByTagName("department")[0].textContent = newDept;
    if (newSalary) emp.getElementsByTagName("salary")[0].textContent = newSalary;

    displayEmployees();
    showMessage("Employee updated successfully.", "success");
}

// DELETE
function deleteEmployee(index) {

    const employees = xmlDoc.getElementsByTagName("employee");
    const emp = employees[index];

    emp.parentNode.removeChild(emp);

    displayEmployees();
    showMessage("Employee deleted successfully.", "success");
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

// Load on start
loadEmployees();
