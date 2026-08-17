// ==========================================
// EMPLOYEE MANAGEMENT PORTAL
// ==========================================

// ---------- EMPLOYEE DATA ----------

let employees = [
    {
        id: "EMP1001",
        name: "Mohan Sai Varma",
        email: "mohansaivarma@company.com",
        department: "Engineering",
        role: "Software Engineer",
        status: "Active"
    },
    {
        id: "EMP1002",
        name: "Priya Reddy",
        email: "priya@company.com",
        department: "Human Resources",
        role: "HR Executive",
        status: "Active"
    },
    {
        id: "EMP1003",
        name: "Arjun Kumar",
        email: "arjun@company.com",
        department: "Finance",
        role: "Financial Analyst",
        status: "On Leave"
    },
    {
        id: "EMP1004",
        name: "Sneha Patel",
        email: "sneha@company.com",
        department: "Marketing",
        role: "Marketing Executive",
        status: "Active"
    }
];


// ---------- DEPARTMENTS ----------

let departments = [
    "Engineering",
    "Human Resources",
    "Finance",
    "Marketing",
    "Operations"
];


// ==========================================
// LOGIN
// ==========================================

const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const appPage = document.getElementById("appPage");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (username === "admin" && password === "admin123") {

        loginPage.classList.add("hidden");

        appPage.classList.remove("hidden");

        loginError.textContent = "";

        showPage("dashboard");

        updateDashboard();

        renderEmployees();

        renderDepartments();

        populateDepartmentDropdown();

    } else {

        loginError.textContent =
            "Invalid username or password.";

    }

});


// ==========================================
// LOGOUT
// ==========================================

document.getElementById("logoutBtn")
    .addEventListener("click", function () {

        appPage.classList.add("hidden");

        loginPage.classList.remove("hidden");

        document.getElementById("username").value = "";

        document.getElementById("password").value = "";

    });


// ==========================================
// PAGE NAVIGATION
// ==========================================

const navigationButtons =
    document.querySelectorAll(".sidebar button[data-page]");

navigationButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        showPage(button.dataset.page);

    });

});


function showPage(pageName) {

    const pages = [
        "dashboard",
        "employees",
        "addEmployee",
        "departments",
        "reports",
        "profile"
    ];

    pages.forEach(function (page) {

        const pageElement =
            document.getElementById(page + "Page");

        if (pageElement) {
            pageElement.classList.add("hidden");
        }

    });


    const selectedPage =
        document.getElementById(pageName + "Page");

    if (selectedPage) {

        selectedPage.classList.remove("hidden");

    }


    if (pageName === "dashboard") {
        updateDashboard();
    }

    if (pageName === "employees") {
        renderEmployees();
    }

    if (pageName === "addEmployee") {
        populateDepartmentDropdown();
    }

    if (pageName === "departments") {
        renderDepartments();
    }

    if (pageName === "reports") {
        updateReports();
    }

}


// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard() {

    const totalEmployees =
        employees.length;


    const activeEmployees =
        employees.filter(function (employee) {

            return employee.status === "Active";

        }).length;


    document.getElementById("totalEmployees").textContent =
        totalEmployees;


    document.getElementById("activeEmployees").textContent =
        activeEmployees;


    document.getElementById("totalDepartments").textContent =
        departments.length;


    document.getElementById("newJoiners").textContent =
        Math.min(employees.length, 2);


    renderRecentEmployees();

}


// ==========================================
// RECENT EMPLOYEES
// ==========================================

function renderRecentEmployees() {

    const table =
        document.getElementById("recentEmployees");

    table.innerHTML = "";


    employees.forEach(function (employee) {

        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td>${employee.role}</td>
            <td>${employee.status}</td>
        `;


        table.appendChild(row);

    });

}


// ==========================================
// EMPLOYEES PAGE
// ==========================================

function renderEmployees() {

    const table =
        document.getElementById("employeeTable");

    table.innerHTML = "";


    employees.forEach(function (employee) {

        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.role}</td>
            <td>${employee.status}</td>
        `;


        table.appendChild(row);

    });

}


// ==========================================
// ADD EMPLOYEE BUTTON
// ==========================================

document.getElementById("addEmployeeBtn")
    .addEventListener("click", function () {

        showPage("addEmployee");

    });


// ==========================================
// DEPARTMENT DROPDOWN
// ==========================================

function populateDepartmentDropdown() {

    const dropdown =
        document.getElementById("employeeDepartment");

    dropdown.innerHTML =
        '<option value="">Select Department</option>';


    departments.forEach(function (department) {

        const option =
            document.createElement("option");

        option.value = department;

        option.textContent = department;

        dropdown.appendChild(option);

    });

}


// ==========================================
// ADD EMPLOYEE FORM
// ==========================================

const employeeForm =
    document.getElementById("employeeForm");


employeeForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const newEmployee = {

        id:
            "EMP" +
            String(1000 + employees.length + 1),

        name:
            document.getElementById("employeeName").value.trim(),

        email:
            document.getElementById("employeeEmail").value.trim(),

        department:
            document.getElementById("employeeDepartment").value,

        role:
            document.getElementById("employeeRole").value.trim(),

        status:
            document.getElementById("employeeStatus").value

    };


    employees.push(newEmployee);


    employeeForm.reset();


    updateDashboard();

    renderEmployees();

    renderDepartments();

    updateReports();


    alert("Employee added successfully!");


    showPage("employees");

});


// ==========================================
// DEPARTMENTS
// ==========================================

function renderDepartments() {

    const table =
        document.getElementById("departmentTable");

    table.innerHTML = "";


    departments.forEach(function (department, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>DEP${String(index + 1).padStart(3, "0")}</td>
            <td>${department}</td>
        `;


        table.appendChild(row);

    });

}


// ==========================================
// REPORTS
// ==========================================

function updateReports() {

    const total =
        employees.length;


    const active =
        employees.filter(function (employee) {

            return employee.status === "Active";

        }).length;


    document.getElementById("reportTotal").textContent =
        total;


    document.getElementById("reportActive").textContent =
        active;

}


// ==========================================
// START
// ==========================================

console.log("Employee Management Portal loaded successfully.");
