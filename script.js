// ==========================================================
// EMPLOYEE MANAGEMENT PORTAL
// REAL OFFICE STYLE DEMO APPLICATION
// ==========================================================


// ==========================================================
// DEFAULT DATA
// ==========================================================

const DEFAULT_EMPLOYEES = [
    {
        id: "EMP1001",
        name: "Mohan Sai Varma",
        email: "mohansaivarma@company.com",
        phone: "9876543210",
        department: "Engineering",
        role: "Software Engineer",
        status: "Active",
        joiningDate: "2026-01-10",
        resignationDate: null,
        rejoined: false,
        rejoiningRemarks: ""
    },
    {
        id: "EMP1002",
        name: "Priya Reddy",
        email: "priya@company.com",
        phone: "9876543211",
        department: "Human Resources",
        role: "HR Executive",
        status: "Active",
        joiningDate: "2026-02-15",
        resignationDate: null,
        rejoined: false,
        rejoiningRemarks: ""
    },
    {
        id: "EMP1003",
        name: "Arjun Kumar",
        email: "arjun@company.com",
        phone: "9876543212",
        department: "Finance",
        role: "Financial Analyst",
        status: "On Leave",
        joiningDate: "2026-03-20",
        resignationDate: null,
        rejoined: false,
        rejoiningRemarks: ""
    },
    {
        id: "EMP1004",
        name: "Sneha Patel",
        email: "sneha@company.com",
        phone: "9876543213",
        department: "Marketing",
        role: "Marketing Executive",
        status: "Active",
        joiningDate: "2026-04-10",
        resignationDate: null,
        rejoined: false,
        rejoiningRemarks: ""
    }
];


const DEFAULT_DEPARTMENTS = [
    "Engineering",
    "Human Resources",
    "Finance",
    "Marketing",
    "Operations",
    "Sales"
];


// ==========================================================
// LOCAL STORAGE
// ==========================================================

function loadData(key, fallback) {

    try {

        const saved = localStorage.getItem(key);

        if (saved) {
            return JSON.parse(saved);
        }

    } catch (error) {

        console.error("Storage error:", error);

    }

    return fallback;
}


let employees = loadData(
    "emp_portal_employees",
    DEFAULT_EMPLOYEES
);

let departments = loadData(
    "emp_portal_departments",
    DEFAULT_DEPARTMENTS
);

let leaveRequests = loadData(
    "emp_portal_leave_requests",
    []
);

let resignationRequests = loadData(
    "emp_portal_resignation_requests",
    []
);

let attendanceRecords = loadData(
    "emp_portal_attendance",
    []
);


// ==========================================================
// SAVE DATA
// ==========================================================

function saveAllData() {

    localStorage.setItem(
        "emp_portal_employees",
        JSON.stringify(employees)
    );

    localStorage.setItem(
        "emp_portal_departments",
        JSON.stringify(departments)
    );

    localStorage.setItem(
        "emp_portal_leave_requests",
        JSON.stringify(leaveRequests)
    );

    localStorage.setItem(
        "emp_portal_resignation_requests",
        JSON.stringify(resignationRequests)
    );

    localStorage.setItem(
        "emp_portal_attendance",
        JSON.stringify(attendanceRecords)
    );
}


// ==========================================================
// CURRENT USER
// ==========================================================

let currentUser = null;


// ==========================================================
// DOM
// ==========================================================

const loginPage =
    document.getElementById("loginPage");

const appPage =
    document.getElementById("appPage");

const loginForm =
    document.getElementById("loginForm");

const loginError =
    document.getElementById("loginError");


// ==========================================================
// LOGIN
// ==========================================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("password")
                    .value
                    .trim();


            // ADMIN LOGIN

            if (
                username === "admin" &&
                password === "admin123"
            ) {

                currentUser = {
                    type: "admin",
                    username: "admin",
                    name: "Admin",
                    role: "Super Admin",
                    email: "admin@example.com",
                    employeeId: null
                };

                startApplication();

                return;
            }


            // EMPLOYEE LOGIN
            //
            // Demo:
            // Username: EMP1001
            // Password: employee123

            if (
                password === "employee123"
            ) {

                const employee =
                    employees.find(
                        function (item) {

                            return (
                                item.id.toLowerCase() ===
                                username.toLowerCase()
                            );

                        }
                    );


                if (employee) {

                    currentUser = {

                        type: "employee",

                        username:
                            employee.id,

                        name:
                            employee.name,

                        role:
                            employee.role,

                        email:
                            employee.email,

                        employeeId:
                            employee.id

                    };


                    startApplication();

                    return;

                }

            }


            if (loginError) {

                loginError.textContent =
                    "Invalid username or password.";

            }

        }
    );

}


// ==========================================================
// START APPLICATION
// ==========================================================

function startApplication() {

    loginPage.classList.add("hidden");

    appPage.classList.remove("hidden");

    if (loginError) {
        loginError.textContent = "";
    }

    updateCurrentUserUI();

    setupRoleNavigation();

    showPage("dashboard");

    updateAll();

}


// ==========================================================
// LOGOUT
// ==========================================================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            currentUser = null;

            appPage.classList.add("hidden");

            loginPage.classList.remove("hidden");

            document.getElementById("username").value = "";

            document.getElementById("password").value = "";

        }
    );

}


// ==========================================================
// CURRENT USER UI
// ==========================================================

function updateCurrentUserUI() {

    if (!currentUser) {
        return;
    }


    const nameElement =
        document.getElementById(
            "currentUserName"
        );

    const roleElement =
        document.getElementById(
            "currentUserRole"
        );

    const avatarElement =
        document.getElementById(
            "currentUserAvatar"
        );


    if (nameElement) {
        nameElement.textContent =
            currentUser.name;
    }


    if (roleElement) {
        roleElement.textContent =
            currentUser.role;
    }


    if (avatarElement) {
        avatarElement.textContent =
            currentUser.name
                .charAt(0)
                .toUpperCase();
    }


    setText(
        "profileName",
        currentUser.name
    );

    setText(
        "profileEmail",
        currentUser.email
    );

    setText(
        "profileRole",
        currentUser.role
    );

    setText(
        "profileEmployeeId",
        currentUser.employeeId || "ADMIN001"
    );

}


// ==========================================================
// ROLE NAVIGATION
// ==========================================================

function setupRoleNavigation() {

    const navigation =
        document.getElementById(
            "mainNavigation"
        );


    if (!navigation || !currentUser) {
        return;
    }


    const existingDynamic =
        navigation.querySelectorAll(
            ".dynamic-nav-button"
        );


    existingDynamic.forEach(
        function (button) {
            button.remove();
        }
    );


    if (currentUser.type === "employee") {

        const leaveButton =
            createNavButton(
                "myLeave",
                "📅 My Leave"
            );

        const resignationButton =
            createNavButton(
                "myResignation",
                "📄 My Resignation"
            );


        const dashboardButton =
            navigation.querySelector(
                '[data-page="dashboard"]'
            );


        if (dashboardButton) {

            dashboardButton.after(
                leaveButton,
                resignationButton
            );

        }

    }

}


// ==========================================================
// CREATE NAV BUTTON
// ==========================================================

function createNavButton(
    page,
    text
) {

    const button =
        document.createElement("button");

    button.type = "button";

    button.dataset.page = page;

    button.textContent = text;

    button.className =
        "dynamic-nav-button";


    button.addEventListener(
        "click",
        function () {

            showPage(page);

        }
    );


    return button;

}


// ==========================================================
// PAGE NAVIGATION
// ==========================================================

const navigationButtons =
    document.querySelectorAll(
        ".sidebar button[data-page]"
    );


navigationButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                showPage(
                    button.dataset.page
                );

            }
        );

    }
);


function showPage(pageName) {

    const pages = [
        "dashboard",
        "employees",
        "addEmployee",
        "departments",
        "leaveRequests",
        "resignationRequests",
        "attendance",
        "reports",
        "profile",
        "myLeave",
        "myResignation"
    ];


    pages.forEach(
        function (page) {

            const element =
                document.getElementById(
                    page + "Page"
                );


            if (element) {

                element.classList.add(
                    "hidden"
                );

            }

        }
    );


    const selected =
        document.getElementById(
            pageName + "Page"
        );


    if (!selected) {
        return;
    }


    // Employee permission control

    if (
        currentUser &&
        currentUser.type === "employee"
    ) {

        const employeeAllowedPages = [
            "dashboard",
            "myLeave",
            "myResignation",
            "attendance",
            "profile"
        ];


        if (
            !employeeAllowedPages.includes(
                pageName
            )
        ) {

            alert(
                "You do not have permission to access this section."
            );

            showPage("dashboard");

            return;

        }

    }


    selected.classList.remove("hidden");

    updatePageTitle(pageName);


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

    if (pageName === "leaveRequests") {
        renderLeaveRequests();
    }

    if (pageName === "resignationRequests") {
        renderResignationRequests();
    }

    if (pageName === "attendance") {
        renderAttendance();
    }

    if (pageName === "reports") {
        updateReports();
    }

    if (pageName === "myLeave") {
        renderMyLeave();
    }

    if (pageName === "myResignation") {
        renderMyResignation();
    }

}


// ==========================================================
// PAGE TITLE
// ==========================================================

function updatePageTitle(pageName) {

    const title =
        document.getElementById(
            "pageTitle"
        );

    const subtitle =
        document.getElementById(
            "pageSubtitle"
        );


    const titles = {

        dashboard: [
            "Dashboard",
            "Workforce overview"
        ],

        employees: [
            "Employees",
            "Employee directory"
        ],

        addEmployee: [
            "Add Employee",
            "Create employee record"
        ],

        departments: [
            "Departments",
            "Company departments"
        ],

        leaveRequests: [
            "Leave Requests",
            "Admin approval center"
        ],

        resignationRequests: [
            "Resignation Requests",
            "Employee exit approval center"
        ],

        attendance: [
            "Attendance",
            "Daily attendance"
        ],

        reports: [
            "Reports",
            "Workforce reports"
        ],

        profile: [
            "My Profile",
            "Account information"
        ],

        myLeave: [
            "My Leave",
            "Leave management"
        ],

        myResignation: [
            "My Resignation",
            "Resignation request"
        ]

    };


    if (titles[pageName]) {

        if (title) {
            title.textContent =
                titles[pageName][0];
        }

        if (subtitle) {
            subtitle.textContent =
                titles[pageName][1];
        }

    }

}


// ==========================================================
// UPDATE ALL
// ==========================================================

function updateAll() {

    saveAllData();

    updateDashboard();

    renderEmployees();

    renderDepartments();

    renderLeaveRequests();

    renderResignationRequests();

    renderAttendance();

    updateReports();

    populateDepartmentDropdown();

    updateNotifications();

    renderMyLeave();

    renderMyResignation();

}


// ==========================================================
// DASHBOARD
// ==========================================================

function updateDashboard() {

    const total =
        employees.length;


    const active =
        employees.filter(
            function (employee) {

                return employee.status === "Active";

            }
        ).length;


    const onLeave =
        employees.filter(
            function (employee) {

                return employee.status === "On Leave";

            }
        ).length;


    const resigned =
        employees.filter(
            function (employee) {

                return employee.status === "Resigned";

            }
        ).length;


    const pendingLeaves =
        leaveRequests.filter(
            function (request) {

                return request.status === "Pending";

            }
        ).length;


    const pendingResignations =
        resignationRequests.filter(
            function (request) {

                return request.status === "Pending";

            }
        ).length;


    const newJoiners =
        getNewJoinersCount();


    const rejoined =
        employees.filter(
            function (employee) {

                return employee.rejoined === true;

            }
        ).length;


    setText(
        "totalEmployees",
        total
    );

    setText(
        "activeEmployees",
        active
    );

    setText(
        "onLeaveEmployees",
        onLeave
    );

    setText(
        "resignedEmployees",
        resigned
    );

    setText(
        "newJoiners",
        newJoiners
    );

    setText(
        "rejoinedEmployees",
        rejoined
    );

    setText(
        "totalDepartments",
        departments.length
    );

    setText(
        "pendingLeaveRequests",
        pendingLeaves
    );

    setText(
        "pendingResignations",
        pendingResignations
    );


    renderRecentEmployees();

    updateDashboardCharts();

    renderDashboardAlerts();

}


// ==========================================================
// NEW JOINERS
// ==========================================================

function getNewJoinersCount() {

    const today =
        new Date();


    const thirtyDaysAgo =
        new Date();


    thirtyDaysAgo.setDate(
        today.getDate() - 30
    );


    return employees.filter(
        function (employee) {

            const date =
                new Date(
                    employee.joiningDate
                );


            return date >= thirtyDaysAgo;

        }
    ).length;

}


// ==========================================================
// RECENT EMPLOYEES
// ==========================================================

function renderRecentEmployees() {

    const table =
        document.getElementById(
            "recentEmployees"
        );


    if (!table) {
        return;
    }


    table.innerHTML = "";


    employees
        .slice()
        .sort(
            function (a, b) {

                return (
                    new Date(b.joiningDate) -
                    new Date(a.joiningDate)
                );

            }
        )
        .slice(0, 5)
        .forEach(
            function (employee) {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>${employee.id}</td>

                    <td>${employee.name}</td>

                    <td>${employee.department}</td>

                    <td>${employee.joiningDate}</td>

                    <td>
                        ${getStatusBadge(
                            employee.status
                        )}
                    </td>

                `;


                table.appendChild(row);

            }
        );

}


// ==========================================================
// STATUS BADGE
// ==========================================================

function getStatusBadge(status) {

    return `
        <span class="status-badge status-${String(
            status
        )
            .toLowerCase()
            .replace(/\s+/g, "-")}">
            ${status}
        </span>
    `;

}


// ==========================================================
// EMPLOYEES
// ==========================================================

function renderEmployees(
    list = employees
) {

    const table =
        document.getElementById(
            "employeeTable"
        );


    if (!table) {
        return;
    }


    table.innerHTML = "";


    if (list.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7"
                    style="text-align:center;">
                    No employees found
                </td>
            </tr>
        `;

        return;

    }


    list.forEach(
        function (employee) {

            const row =
                document.createElement("tr");


            let actionButtons = "";


            if (currentUser &&
                currentUser.type === "admin") {

                actionButtons += `

                    <button
                        type="button"
                        onclick="editEmployee('${employee.id}')"
                    >
                        Edit
                    </button>

                `;


                if (
                    employee.status === "Resigned"
                ) {

                    actionButtons += `

                        <button
                            type="button"
                            onclick="rejoinEmployee('${employee.id}')"
                        >
                            Rejoin
                        </button>

                    `;

                } else {

                    actionButtons += `

                        <button
                            type="button"
                            onclick="startAdminResignation('${employee.id}')"
                        >
                            Resign
                        </button>

                    `;

                }

            } else {

                actionButtons = `

                    <button
                        type="button"
                        onclick="viewEmployee('${employee.id}')"
                    >
                        View
                    </button>

                `;

            }


            row.innerHTML = `

                <td>${employee.id}</td>

                <td>${employee.name}</td>

                <td>${employee.email}</td>

                <td>${employee.department}</td>

                <td>${employee.role}</td>

                <td>
                    ${getStatusBadge(
                        employee.status
                    )}
                </td>

                <td>
                    ${actionButtons}
                </td>

            `;


            table.appendChild(row);

        }
    );

}


// ==========================================================
// VIEW EMPLOYEE
// ==========================================================

function viewEmployee(id) {

    const employee =
        employees.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!employee) {
        return;
    }


    openModal(
        "Employee Details",
        `

        <div class="employee-details">

            <p>
                <strong>Employee ID:</strong>
                ${employee.id}
            </p>

            <p>
                <strong>Name:</strong>
                ${employee.name}
            </p>

            <p>
                <strong>Email:</strong>
                ${employee.email}
            </p>

            <p>
                <strong>Phone:</strong>
                ${employee.phone || "-"}
            </p>

            <p>
                <strong>Department:</strong>
                ${employee.department}
            </p>

            <p>
                <strong>Role:</strong>
                ${employee.role}
            </p>

            <p>
                <strong>Status:</strong>
                ${employee.status}
            </p>

            <p>
                <strong>Joining Date:</strong>
                ${employee.joiningDate}
            </p>

        </div>

        `
    );

}


// ==========================================================
// EDIT EMPLOYEE
// ==========================================================

function editEmployee(id) {

    const employee =
        employees.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!employee) {
        return;
    }


    openModal(
        "Edit Employee",
        `

        <form id="editEmployeeForm">

            <label>Full Name</label>

            <input
                type="text"
                id="editName"
                value="${escapeAttribute(
                    employee.name
                )}"
                required
            >


            <label>Email</label>

            <input
                type="email"
                id="editEmail"
                value="${escapeAttribute(
                    employee.email
                )}"
                required
            >


            <label>Phone</label>

            <input
                type="tel"
                id="editPhone"
                value="${escapeAttribute(
                    employee.phone || ""
                )}"
            >


            <label>Department</label>

            <select id="editDepartment">

                ${departments
                    .map(
                        function (department) {

                            return `
                                <option
                                    value="${escapeAttribute(
                                        department
                                    )}"
                                    ${
                                        department ===
                                        employee.department
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    ${department}
                                </option>
                            `;

                        }
                    )
                    .join("")}

            </select>


            <label>Job Role</label>

            <input
                type="text"
                id="editRole"
                value="${escapeAttribute(
                    employee.role
                )}"
                required
            >


            <label>Joining Date</label>

            <input
                type="date"
                id="editJoiningDate"
                value="${employee.joiningDate}"
                required
            >


            <label>Status</label>

            <select id="editStatus">

                <option
                    value="Active"
                    ${
                        employee.status === "Active"
                            ? "selected"
                            : ""
                    }
                >
                    Active
                </option>

                <option
                    value="On Leave"
                    ${
                        employee.status === "On Leave"
                            ? "selected"
                            : ""
                    }
                >
                    On Leave
                </option>

                <option
                    value="Inactive"
                    ${
                        employee.status === "Inactive"
                            ? "selected"
                            : ""
                    }
                >
                    Inactive
                </option>

                <option
                    value="Resigned"
                    ${
                        employee.status === "Resigned"
                            ? "selected"
                            : ""
                    }
                >
                    Resigned
                </option>

            </select>


            <button
                type="submit"
            >
                Save Changes
            </button>

        </form>

        `
    );


    document
        .getElementById("editEmployeeForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                employee.name =
                    document
                        .getElementById("editName")
                        .value
                        .trim();


                employee.email =
                    document
                        .getElementById("editEmail")
                        .value
                        .trim();


                employee.phone =
                    document
                        .getElementById("editPhone")
                        .value
                        .trim();


                employee.department =
                    document
                        .getElementById(
                            "editDepartment"
                        )
                        .value;


                employee.role =
                    document
                        .getElementById("editRole")
                        .value
                        .trim();


                employee.joiningDate =
                    document
                        .getElementById(
                            "editJoiningDate"
                        )
                        .value;


                employee.status =
                    document
                        .getElementById(
                            "editStatus"
                        )
                        .value;


                closeModal();

                updateAll();

                alert(
                    "Employee details updated successfully."
                );

            }
        );

}


// ==========================================================
// ADD EMPLOYEE BUTTON
// ==========================================================

const addEmployeeBtn =
    document.getElementById(
        "addEmployeeBtn"
    );


if (addEmployeeBtn) {

    addEmployeeBtn.addEventListener(
        "click",
        function () {

            showPage("addEmployee");

        }
    );

}


// ==========================================================
// DEPARTMENT DROPDOWN
// ==========================================================

function populateDepartmentDropdown() {

    const dropdown =
        document.getElementById(
            "employeeDepartment"
        );


    if (!dropdown) {
        return;
    }


    dropdown.innerHTML =
        `
        <option value="">
            Select Department
        </option>
        `;


    departments.forEach(
        function (department) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                department;

            option.textContent =
                department;


            dropdown.appendChild(option);

        }
    );

}


// ==========================================================
// ADD EMPLOYEE
// ==========================================================

const employeeForm =
    document.getElementById(
        "employeeForm"
    );


if (employeeForm) {

    employeeForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "employeeName"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "employeeEmail"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "employeePhone"
                    )
                    .value
                    .trim();


            const department =
                document
                    .getElementById(
                        "employeeDepartment"
                    )
                    .value;


            const role =
                document
                    .getElementById(
                        "employeeRole"
                    )
                    .value
                    .trim();


            const joiningDate =
                document
                    .getElementById(
                        "joiningDate"
                    )
                    .value;


            const status =
                document
                    .getElementById(
                        "employeeStatus"
                    )
                    .value;


            const duplicateEmail =
                employees.some(
                    function (employee) {

                        return (
                            employee.email.toLowerCase() ===
                            email.toLowerCase()
                        );

                    }
                );


            if (duplicateEmail) {

                alert(
                    "An employee with this email already exists."
                );

                return;

            }


            const newEmployee = {

                id:
                    generateEmployeeId(),

                name:
                    name,

                email:
                    email,

                phone:
                    phone,

                department:
                    department,

                role:
                    role,

                status:
                    status,

                joiningDate:
                    joiningDate,

                resignationDate:
                    null,

                rejoined:
                    false,

                rejoiningRemarks:
                    ""

            };


            employees.push(
                newEmployee
            );


            employeeForm.reset();

            updateAll();

            showPage("employees");


            alert(
                "Employee added successfully."
            );

        }
    );

}


// ==========================================================
// GENERATE EMPLOYEE ID
// ==========================================================

function generateEmployeeId() {

    let highest = 1000;


    employees.forEach(
        function (employee) {

            const number =
                parseInt(
                    employee.id.replace(
                        "EMP",
                        ""
                    ),
                    10
                );


            if (!isNaN(number)) {

                highest =
                    Math.max(
                        highest,
                        number
                    );

            }

        }
    );


    return "EMP" + (highest + 1);

}


// ==========================================================
// DEPARTMENTS
// ==========================================================

function renderDepartments() {

    const table =
        document.getElementById(
            "departmentTable"
        );


    if (!table) {
        return;
    }


    table.innerHTML = "";


    departments.forEach(
        function (department, index) {

            const count =
                employees.filter(
                    function (employee) {

                        return (
                            employee.department ===
                            department
                        );

                    }
                ).length;


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    DEP${String(
                        index + 1
                    ).padStart(3, "0")}
                </td>

                <td>
                    ${department}
                </td>

                <td>
                    ${count}
                </td>

                <td>
                    Active
                </td>

                <td>

                    <button
                        type="button"
                        onclick="viewDepartment('${escapeAttribute(
                            department
                        )}')"
                    >
                        View
                    </button>

                </td>

            `;


            table.appendChild(row);

        }
    );

}


// ==========================================================
// VIEW DEPARTMENT
// ==========================================================

function viewDepartment(
    department
) {

    const list =
        employees.filter(
            function (employee) {

                return (
                    employee.department ===
                    department
                );

            }
        );


    const names =
        list.length
            ? list
                .map(
                    function (employee) {

                        return `
                            <li>
                                ${employee.name}
                                - ${employee.role}
                            </li>
                        `;

                    }
                )
                .join("")
            : "<li>No employees</li>";


    openModal(
        department,
        `

        <p>
            Total Employees:
            <strong>${list.length}</strong>
        </p>

        <ul>
            ${names}
        </ul>

        `
    );

}


// ==========================================================
// ADD DEPARTMENT
// ==========================================================

const addDepartmentBtn =
    document.getElementById(
        "addDepartmentBtn"
    );


if (addDepartmentBtn) {

    addDepartmentBtn.addEventListener(
        "click",
        function () {

            const name =
                prompt(
                    "Enter new department name:"
                );


            if (!name) {
                return;
            }


            const cleanName =
                name.trim();


            if (!cleanName) {
                return;
            }


            const exists =
                departments.some(
                    function (department) {

                        return (
                            department.toLowerCase() ===
                            cleanName.toLowerCase()
                        );

                    }
                );


            if (exists) {

                alert(
                    "Department already exists."
                );

                return;

            }


            departments.push(
                cleanName
            );


            updateAll();


            alert(
                "Department added successfully."
            );

        }
    );

}


// ==========================================================
// ADMIN RESIGNATION
// ==========================================================

function startAdminResignation(
    id
) {

    if (
        !currentUser ||
        currentUser.type !== "admin"
    ) {

        alert(
            "Only Admin can process resignation actions."
        );

        return;

    }


    const employee =
        employees.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!employee) {
        return;
    }


    if (
        employee.status === "Resigned"
    ) {

        alert(
            "Employee is already resigned."
        );

        return;

    }


    const existing =
        resignationRequests.find(
            function (request) {

                return (
                    request.employeeId === id &&
                    request.status === "Pending"
                );

            }
        );


    if (existing) {

        alert(
            "A resignation request is already pending."
        );

        return;

    }


    openModal(
        "Resignation Request",
        `

        <p>
            Employee:
            <strong>${employee.name}</strong>
        </p>

        <p>
            Employee ID:
            <strong>${employee.id}</strong>
        </p>


        <label>
            Last Working Date
        </label>

        <input
            type="date"
            id="adminResignDate"
            required
        >


        <label>
            Reason
        </label>

        <textarea
            id="adminResignReason"
            rows="4"
            placeholder="Enter resignation reason"
        ></textarea>


        <button
            type="button"
            id="submitAdminResignation"
        >
            Submit Resignation Request
        </button>

        `
    );


    document
        .getElementById(
            "submitAdminResignation"
        )
        .addEventListener(
            "click",
            function () {

                const lastDate =
                    document
                        .getElementById(
                            "adminResignDate"
                        )
                        .value;


                const reason =
                    document
                        .getElementById(
                            "adminResignReason"
                        )
                        .value
                        .trim();


                if (!lastDate) {

                    alert(
                        "Please select the last working date."
                    );

                    return;

                }


                if (!reason) {

                    alert(
                        "Please enter the reason."
                    );

                    return;

                }


                resignationRequests.push({

                    id:
                        generateResignationId(),

                    employeeId:
                        employee.id,

                    employeeName:
                        employee.name,

                    department:
                        employee.department,

                    requestedDate:
                        today(),

                    lastWorkingDate:
                        lastDate,

                    reason:
                        reason,

                    status:
                        "Pending"

                });


                closeModal();

                updateAll();

                showPage(
                    "resignationRequests"
                );


                alert(
                    "Resignation request sent to Admin approval queue."
                );

            }
        );

}


// ==========================================================
// REJOIN
// ==========================================================

function rejoinEmployee(
    id
) {

    if (
        !currentUser ||
        currentUser.type !== "admin"
    ) {

        alert(
            "Only Admin can process employee rejoining."
        );

        return;

    }


    const employee =
        employees.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!employee) {
        return;
    }


    if (
        employee.status !== "Resigned"
    ) {

        alert(
            "Only resigned employees can be rejoined."
        );

        return;

    }


    openModal(
        "Employee Rejoining",
        `

        <p>
            Employee:
            <strong>${employee.name}</strong>
        </p>


        <label>
            Rejoining Date
        </label>

        <input
            type="date"
            id="rejoinDate"
        >


        <label>
            Rejoining Remarks
        </label>

        <textarea
            id="rejoinRemarks"
            rows="4"
            placeholder="Enter rejoining remarks"
        ></textarea>


        <button
            type="button"
            id="saveRejoinButton"
        >
            Save Rejoining
        </button>

        `
    );


    document
        .getElementById(
            "saveRejoinButton"
        )
        .addEventListener(
            "click",
            function () {

                const date =
                    document
                        .getElementById(
                            "rejoinDate"
                        )
                        .value;


                const remarks =
                    document
                        .getElementById(
                            "rejoinRemarks"
                        )
                        .value
                        .trim();


                if (!date) {

                    alert(
                        "Please select rejoining date."
                    );

                    return;

                }


                if (!remarks) {

                    alert(
                        "Please enter rejoining remarks."
                    );

                    return;

                }


                employee.status =
                    "Active";


                employee.joiningDate =
                    date;


                employee.resignationDate =
                    null;


                employee.rejoined =
                    true;


                employee.rejoiningRemarks =
                    remarks;


                closeModal();

                updateAll();


                alert(
                    `${employee.name} rejoined successfully.`
                );

            }
        );

}


// ==========================================================
// RESIGNATION REQUEST TABLE
// ==========================================================

function renderResignationRequests() {

    const table =
        document.getElementById(
            "resignationRequestTable"
        );


    if (!table) {
        return;
    }


    table.innerHTML = "";


    resignationRequests.forEach(
        function (request) {

            const row =
                document.createElement("tr");


            let actions = "Completed";


            if (
                request.status ===
                "Pending"
            ) {

                actions = `

                    <button
                        type="button"
                        onclick="approveResignation('${request.id}')"
                    >
                        Approve
                    </button>

                    <button
                        type="button"
                        onclick="rejectResignation('${request.id}')"
                    >
                        Reject
                    </button>

                `;

            }


            row.innerHTML = `

                <td>${request.id}</td>

                <td>${request.employeeName}</td>

                <td>${request.department}</td>

                <td>${request.requestedDate}</td>

                <td>${request.lastWorkingDate}</td>

                <td>${request.reason}</td>

                <td>
                    ${getStatusBadge(
                        request.status
                    )}
                </td>

                <td>
                    ${actions}
                </td>

            `;


            table.appendChild(row);

        }
    );


    updateResignationCounts();

}


// ==========================================================
// APPROVE RESIGNATION
// ==========================================================

function approveResignation(
    id
) {

    if (
        !currentUser ||
        currentUser.type !== "admin"
    ) {

        alert(
            "Only Admin can approve resignations."
        );

        return;

    }


    const request =
        resignationRequests.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!request) {
        return;
    }


    const employee =
        employees.find(
            function (item) {

                return (
                    item.id ===
                    request.employeeId
                );

            }
        );


    if (!employee) {
        return;
    }


    const confirmApproval =
        confirm(
            `Approve resignation for ${employee.name}?`
        );


    if (!confirmApproval) {
        return;
    }


    request.status =
        "Approved";


    employee.status =
        "Resigned";


    employee.resignationDate =
        request.lastWorkingDate;


    updateAll();


    alert(
        "Resignation approved. Employee status updated to Resigned."
    );

}


// ==========================================================
// REJECT RESIGNATION
// ==========================================================

function rejectResignation(
    id
) {

    if (
        !currentUser ||
        currentUser.type !== "admin"
    ) {

        alert(
            "Only Admin can reject resignations."
        );

        return;

    }


    const request =
        resignationRequests.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!request) {
        return;
    }


    request.status =
        "Rejected";


    updateAll();


    alert(
        "Resignation request rejected."
    );

}


// ==========================================================
// RESIGNATION COUNTS
// ==========================================================

function updateResignationCounts() {

    setText(
        "resignationPendingCount",
        resignationRequests.filter(
            function (request) {

                return request.status === "Pending";

            }
        ).length
    );


    setText(
        "resignationApprovedCount",
        resignationRequests.filter(
            function (request) {

                return request.status === "Approved";

            }
        ).length
    );


    setText(
        "resignationRejectedCount",
        resignationRequests.filter(
            function (request) {

                return request.status === "Rejected";

            }
        ).length
    );

}


// ==========================================================
// MY RESIGNATION
// ==========================================================

function renderMyResignation() {

    const container =
        document.getElementById(
            "resignationStatus"
        );


    if (!container) {
        return;
    }


    if (
        !currentUser ||
        currentUser.type !== "employee"
    ) {

        container.innerHTML = `
            <p>
                Employee self-service resignation information
                is available after employee login.
            </p>
        `;

        return;

    }


    const requests =
        resignationRequests.filter(
            function (request) {

                return (
                    request.employeeId ===
                    currentUser.employeeId
                );

            }
        );


    const latest =
        requests.length
            ? requests[requests.length - 1]
            : null;


    if (!latest) {

        container.innerHTML = `
            <p>
                No resignation request submitted.
            </p>
        `;

        return;

    }


    container.innerHTML = `

        <div>

            <p>
                <strong>Request ID:</strong>
                ${latest.id}
            </p>

            <p>
                <strong>Requested Date:</strong>
                ${latest.requestedDate}
            </p>

            <p>
                <strong>Last Working Date:</strong>
                ${latest.lastWorkingDate}
            </p>

            <p>
                <strong>Reason:</strong>
                ${latest.reason}
            </p>

            <p>
                <strong>Status:</strong>
                ${getStatusBadge(
                    latest.status
                )}
            </p>

        </div>

    `;


    const button =
        document.getElementById(
            "requestResignationBtn"
        );


    if (button) {

        button.disabled =
            latest.status === "Pending" ||
            latest.status === "Approved";

    }

}


// ==========================================================
// EMPLOYEE RESIGNATION REQUEST
// ==========================================================

const requestResignationBtn =
    document.getElementById(
        "requestResignationBtn"
    );


if (requestResignationBtn) {

    requestResignationBtn.addEventListener(
        "click",
        function () {

            if (
                !currentUser ||
                currentUser.type !== "employee"
            ) {

                alert(
                    "Please login as an employee to submit resignation."
                );

                return;

            }


            const existing =
                resignationRequests.find(
                    function (request) {

                        return (
                            request.employeeId ===
                            currentUser.employeeId &&
                            request.status === "Pending"
                        );

                    }
                );


            if (existing) {

                alert(
                    "You already have a pending resignation request."
                );

                return;

            }


            openModal(
                "Submit Resignation",
                `

                <p>
                    This request will be sent to Admin
                    for approval.
                </p>


                <label>
                    Proposed Last Working Date
                </label>

                <input
                    type="date"
                    id="employeeResignDate"
                >


                <label>
                    Reason
                </label>

                <textarea
                    id="employeeResignReason"
                    rows="4"
                    placeholder="Enter reason"
                ></textarea>


                <button
                    type="button"
                    id="submitEmployeeResignation"
                >
                    Submit to Admin
                </button>

                `
            );


            document
                .getElementById(
                    "submitEmployeeResignation"
                )
                .addEventListener(
                    "click",
                    function () {

                        const date =
                            document
                                .getElementById(
                                    "employeeResignDate"
                                )
                                .value;


                        const reason =
                            document
                                .getElementById(
                                    "employeeResignReason"
                                )
                                .value
                                .trim();


                        if (!date || !reason) {

                            alert(
                                "Please complete all fields."
                            );

                            return;

                        }


                        const employee =
                            employees.find(
                                function (item) {

                                    return (
                                        item.id ===
                                        currentUser.employeeId
                                    );

                                }
                            );


                        resignationRequests.push({

                            id:
                                generateResignationId(),

                            employeeId:
                                employee.id,

                            employeeName:
                                employee.name,

                            department:
                                employee.department,

                            requestedDate:
                                today(),

                            lastWorkingDate:
                                date,

                            reason:
                                reason,

                            status:
                                "Pending"

                        });


                        closeModal();

                        updateAll();

                        renderMyResignation();


                        alert(
                            "Resignation request sent to Admin."
                        );

                    }
                );

        }
    );

}


// ==========================================================
// LEAVE REQUESTS
// ==========================================================

function renderLeaveRequests() {

    const table =
        document.getElementById(
            "leaveRequestTable"
        );


    if (!table) {
        return;
    }


    table.innerHTML = "";


    leaveRequests.forEach(
        function (request) {

            const row =
                document.createElement("tr");


            let actions =
                "Completed";


            if (
                request.status === "Pending"
            ) {

                actions = `

                    <button
                        type="button"
                        onclick="approveLeave('${request.id}')"
                    >
                        Approve
                    </button>

                    <button
                        type="button"
                        onclick="rejectLeave('${request.id}')"
                    >
                        Reject
                    </button>

                `;

            }


            row.innerHTML = `

                <td>${request.id}</td>

                <td>${request.employeeName}</td>

                <td>${request.leaveType}</td>

                <td>${request.from}</td>

                <td>${request.to}</td>

                <td>${request.reason}</td>

                <td>
                    ${getStatusBadge(
                        request.status
                    )}
                </td>

                <td>
                    ${actions}
                </td>

            `;


            table.appendChild(row);

        }
    );


    updateLeaveCounts();

}


// ==========================================================
// LEAVE COUNTS
// ==========================================================

function updateLeaveCounts() {

    setText(
        "leavePendingCount",
        leaveRequests.filter(
            function (request) {

                return request.status === "Pending";

            }
        ).length
    );


    setText(
        "leaveApprovedCount",
        leaveRequests.filter(
            function (request) {

                return request.status === "Approved";

            }
        ).length
    );


    setText(
        "leaveRejectedCount",
        leaveRequests.filter(
            function (request) {

                return request.status === "Rejected";

            }
        ).length
    );

}


// ==========================================================
// APPROVE LEAVE
// ==========================================================

function approveLeave(id) {

    if (
        !currentUser ||
        currentUser.type !== "admin"
    ) {

        alert(
            "Only Admin can approve leave."
        );

        return;

    }


    const request =
        leaveRequests.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!request) {
        return;
    }


    request.status =
        "Approved";


    const employee =
        employees.find(
            function (item) {

                return (
                    item.id ===
                    request.employeeId
                );

            }
        );


    if (employee) {

        employee.status =
            "On Leave";

    }


    updateAll();


    alert(
        "Leave approved successfully."
    );

}


// ==========================================================
// REJECT LEAVE
// ==========================================================

function rejectLeave(id) {

    if (
        !currentUser ||
        currentUser.type !== "admin"
    ) {

        alert(
            "Only Admin can reject leave."
        );

        return;

    }


    const request =
        leaveRequests.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!request) {
        return;
    }


    request.status =
        "Rejected";


    updateAll();


    alert(
        "Leave request rejected."
    );

}


// ==========================================================
// MY LEAVE
// ==========================================================

function renderMyLeave() {

    const table =
        document.getElementById(
            "myLeaveTable"
        );


    if (!table) {
        return;
    }


    table.innerHTML = "";


    if (
        !currentUser ||
        currentUser.type !== "employee"
    ) {

        return;

    }


    const myRequests =
        leaveRequests.filter(
            function (request) {

                return (
                    request.employeeId ===
                    currentUser.employeeId
                );

            }
        );


    myRequests.forEach(
        function (request) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${request.id}</td>

                <td>${request.leaveType}</td>

                <td>${request.from}</td>

                <td>${request.to}</td>

                <td>${request.reason}</td>

                <td>
                    ${getStatusBadge(
                        request.status
                    )}
                </td>

            `;


            table.appendChild(row);

        }
    );


    setText(
        "myPendingLeaves",
        myRequests.filter(
            function (request) {

                return request.status === "Pending";

            }
        ).length
    );


    setText(
        "myApprovedLeaves",
        myRequests.filter(
            function (request) {

                return request.status === "Approved";

            }
        ).length
    );


    setText(
        "leaveBalance",
        Math.max(
            12 -
            myRequests.filter(
                function (request) {

                    return request.status === "Approved";

                }
            ).length,
            0
        )
    );

}


// ==========================================================
// APPLY LEAVE
// ==========================================================

const applyLeaveBtn =
    document.getElementById(
        "applyLeaveBtn"
    );


if (applyLeaveBtn) {

    applyLeaveBtn.addEventListener(
        "click",
        function () {

            if (
                !currentUser ||
                currentUser.type !== "employee"
            ) {

                alert(
                    "Please login as an employee."
                );

                return;

            }


            openModal(
                "Apply for Leave",
                `

                <label>
                    Leave Type
                </label>

                <select id="applyLeaveType">

                    <option value="">
                        Select Leave Type
                    </option>

                    <option value="Casual Leave">
                        Casual Leave
                    </option>

                    <option value="Sick Leave">
                        Sick Leave
                    </option>

                    <option value="Annual Leave">
                        Annual Leave
                    </option>

                </select>


                <label>
                    From Date
                </label>

                <input
                    type="date"
                    id="applyLeaveFrom"
                >


                <label>
                    To Date
                </label>

                <input
                    type="date"
                    id="applyLeaveTo"
                >


                <label>
                    Reason
                </label>

                <textarea
                    id="applyLeaveReason"
                    rows="4"
                    placeholder="Enter reason"
                ></textarea>


                <button
                    type="button"
                    id="submitLeaveButton"
                >
                    Submit Leave Request
                </button>

                `
            );


            document
                .getElementById(
                    "submitLeaveButton"
                )
                .addEventListener(
                    "click",
                    function () {

                        const type =
                            document
                                .getElementById(
                                    "applyLeaveType"
                                )
                                .value;


                        const from =
                            document
                                .getElementById(
                                    "applyLeaveFrom"
                                )
                                .value;


                        const to =
                            document
                                .getElementById(
                                    "applyLeaveTo"
                                )
                                .value;


                        const reason =
                            document
                                .getElementById(
                                    "applyLeaveReason"
                                )
                                .value
                                .trim();


                        if (
                            !type ||
                            !from ||
                            !to ||
                            !reason
                        ) {

                            alert(
                                "Please complete all leave details."
                            );

                            return;

                        }


                        if (
                            new Date(from) >
                            new Date(to)
                        ) {

                            alert(
                                "To date cannot be before From date."
                            );

                            return;

                        }


                        const employee =
                            employees.find(
                                function (item) {

                                    return (
                                        item.id ===
                                        currentUser.employeeId
                                    );

                                }
                            );


                        leaveRequests.push({

                            id:
                                generateLeaveId(),

                            employeeId:
                                employee.id,

                            employeeName:
                                employee.name,

                            leaveType:
                                type,

                            from:
                                from,

                            to:
                                to,

                            reason:
                                reason,

                            status:
                                "Pending"

                        });


                        closeModal();

                        updateAll();

                        renderMyLeave();


                        alert(
                            "Leave request submitted to Admin."
                        );

                    }
                );

        }
    );

}


// ==========================================================
// ATTENDANCE
// ==========================================================

function renderAttendance() {

    const table =
        document.getElementById(
            "attendanceTable"
        );


    if (!table) {
        return;
    }


    table.innerHTML = "";


    const todayDate =
        today();


    employees.forEach(
        function (employee) {

            let record =
                attendanceRecords.find(
                    function (item) {

                        return (
                            item.employeeId ===
                            employee.id &&
                            item.date ===
                            todayDate
                        );

                    }
                );


            if (!record) {

                record = {

                    employeeId:
                        employee.id,

                    employeeName:
                        employee.name,

                    department:
                        employee.department,

                    date:
                        todayDate,

                    checkIn:
                        "-",

                    checkOut:
                        "-",

                    status:
                        employee.status ===
                        "On Leave"
                            ? "On Leave"
                            : "Absent"

                };

            }


            const row =
                document.createElement("tr");


            let action = "";


            if (
                currentUser &&
                currentUser.type === "employee" &&
                currentUser.employeeId ===
                employee.id
            ) {

                if (
                    record.checkIn === "-"
                ) {

                    action = `

                        <button
                            type="button"
                            onclick="checkIn()"
                        >
                            Check In
                        </button>

                    `;

                } else if (
                    record.checkOut === "-"
                ) {

                    action = `

                        <button
                            type="button"
                            onclick="checkOut()"
                        >
                            Check Out
                        </button>

                    `;

                }

            }


            row.innerHTML = `

                <td>${employee.id}</td>

                <td>${employee.name}</td>

                <td>${employee.department}</td>

                <td>${record.date}</td>

                <td>${record.checkIn}</td>

                <td>${record.checkOut}</td>

                <td>
                    ${getStatusBadge(
                        record.status
                    )}
                </td>

                <td>
                    ${action}
                </td>

            `;


            table.appendChild(row);

        }
    );


    updateAttendanceCounts();

}


// ==========================================================
// ATTENDANCE COUNTS
// ==========================================================

function updateAttendanceCounts() {

    const date =
        today();


    const present =
        employees.filter(
            function (employee) {

                const record =
                    attendanceRecords.find(
                        function (item) {

                            return (
                                item.employeeId ===
                                employee.id &&
                                item.date ===
                                date
                            );

                        }
                    );


                return (
                    record &&
                    record.checkIn !== "-"
                );

            }
        ).length;


    const leave =
        employees.filter(
            function (employee) {

                return (
                    employee.status ===
                    "On Leave"
                );

            }
        ).length;


    const absent =
        Math.max(
            employees.length -
            present -
            leave,
            0
        );


    setText(
        "presentToday",
        present
    );

    setText(
        "absentToday",
        absent
    );

    setText(
        "attendanceOnLeave",
        leave
    );

}


// ==========================================================
// CHECK IN
// ==========================================================

function checkIn() {

    if (
        !currentUser ||
        currentUser.type !== "employee"
    ) {

        alert(
            "Please login as an employee."
        );

        return;

    }


    const employee =
        employees.find(
            function (item) {

                return (
                    item.id ===
                    currentUser.employeeId
                );

            }
        );


    if (!employee) {
        return;
    }


    const date =
        today();


    let record =
        attendanceRecords.find(
            function (item) {

                return (
                    item.employeeId ===
                    employee.id &&
                    item.date ===
                    date
                );

            }
        );


    if (
        record &&
        record.checkIn !== "-"
    ) {

        alert(
            "You have already checked in today."
        );

        return;

    }


    const time =
        new Date()
            .toLocaleTimeString();


    if (!record) {

        record = {

            employeeId:
                employee.id,

            employeeName:
                employee.name,

            department:
                employee.department,

            date:
                date,

            checkIn:
                time,

            checkOut:
                "-",

            status:
                "Present"

        };


        attendanceRecords.push(
            record
        );

    } else {

        record.checkIn =
            time;

        record.status =
            "Present";

    }


    updateAll();

    alert(
        "Check-in recorded successfully."
    );

}


// ==========================================================
// CHECK OUT
// ==========================================================

function checkOut() {

    if (
        !currentUser ||
        currentUser.type !== "employee"
    ) {

        alert(
            "Please login as an employee."
        );

        return;

    }


    const record =
        attendanceRecords.find(
            function (item) {

                return (
                    item.employeeId ===
                    currentUser.employeeId &&
                    item.date ===
                    today()
                );

            }
        );


    if (
        !record ||
        record.checkIn === "-"
    ) {

        alert(
            "Please check in first."
        );

        return;

    }


    if (
        record.checkOut !== "-"
    ) {

        alert(
            "You have already checked out today."
        );

        return;

    }


    record.checkOut =
        new Date()
            .toLocaleTimeString();


    updateAll();


    alert(
        "Check-out recorded successfully."
    );

}


// ==========================================================
// REPORTS
// ==========================================================

function updateReports() {

    const total =
        employees.length;


    const active =
        employees.filter(
            function (employee) {

                return employee.status === "Active";

            }
        ).length;


    const leave =
        employees.filter(
            function (employee) {

                return employee.status === "On Leave";

            }
        ).length;


    const resigned =
        employees.filter(
            function (employee) {

                return employee.status === "Resigned";

            }
        ).length;


    setText(
        "reportTotal",
        total
    );

    setText(
        "reportActive",
        active
    );

    setText(
        "reportLeave",
        leave
    );

    setText(
        "reportResigned",
        resigned
    );


    const area =
        document.getElementById(
            "employeeReport"
        );


    if (area) {

        area.innerHTML = `

            <p>
                Total Employees:
                <strong>${total}</strong>
            </p>

            <p>
                Active:
                <strong>${active}</strong>
            </p>

            <p>
                On Leave:
                <strong>${leave}</strong>
            </p>

            <p>
                Resigned:
                <strong>${resigned}</strong>
            </p>

        `;

    }

}


// ==========================================================
// DASHBOARD CHARTS
// ==========================================================

function updateDashboardCharts() {

    const chart =
        document.getElementById(
            "departmentDistribution"
        );


    if (chart) {

        const counts = {};


        employees.forEach(
            function (employee) {

                counts[employee.department] =
                    (
                        counts[
                            employee.department
                        ] || 0
                    ) + 1;

            }
        );


        chart.innerHTML = "";


        Object.keys(counts).forEach(
            function (department) {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "chart-row";


                const width =
                    Math.min(
                        counts[department] * 20,
                        100
                    );


                row.innerHTML = `

                    <div class="chart-label">

                        <span>
                            ${department}
                        </span>

                        <strong>
                            ${counts[department]}
                        </strong>

                    </div>

                    <div class="chart-bar">

                        <span
                            style="width:${width}%"
                        ></span>

                    </div>

                `;


                chart.appendChild(row);

            }
        );

    }


    const trend =
        document.getElementById(
            "joiningResignationTrend"
        );


    if (trend) {

        const joined =
            employees.length;


        const resigned =
            employees.filter(
                function (employee) {

                    return employee.status ===
                        "Resigned";

                }
            ).length;


        trend.innerHTML = `

            <div class="trend-content">

                <p>
                    Total Joined:
                    <strong>${joined}</strong>
                </p>

                <p>
                    Total Resigned:
                    <strong>${resigned}</strong>
                </p>

            </div>

        `;

    }

}


// ==========================================================
// DASHBOARD ALERTS
// ==========================================================

function renderDashboardAlerts() {

    const container =
        document.getElementById(
            "dashboardAlerts"
        );


    if (!container) {
        return;
    }


    const pendingLeaves =
        leaveRequests.filter(
            function (request) {

                return request.status ===
                    "Pending";

            }
        ).length;


    const pendingResignations =
        resignationRequests.filter(
            function (request) {

                return request.status ===
                    "Pending";

            }
        ).length;


    container.innerHTML = "";


    if (
        pendingLeaves === 0 &&
        pendingResignations === 0
    ) {

        container.innerHTML = `

            <div class="alert-item">

                <span>●</span>

                <p>
                    No pending employee actions.
                </p>

            </div>

        `;

        return;

    }


    if (pendingLeaves > 0) {

        container.innerHTML += `

            <div class="alert-item">

                <span>●</span>

                <p>
                    ${pendingLeaves}
                    leave request(s) awaiting approval.
                </p>

            </div>

        `;

    }


    if (pendingResignations > 0) {

        container.innerHTML += `

            <div class="alert-item">

                <span>●</span>

                <p>
                    ${pendingResignations}
                    resignation request(s) awaiting approval.
                </p>

            </div>

        `;

    }

}


// ==========================================================
// NOTIFICATIONS
// ==========================================================

function updateNotifications() {

    const count =
        leaveRequests.filter(
            function (request) {

                return request.status ===
                    "Pending";

            }
        ).length +

        resignationRequests.filter(
            function (request) {

                return request.status ===
                    "Pending";

            }
        ).length;


    setText(
        "notificationCount",
        count
    );

}


// ==========================================================
// NOTIFICATION BUTTON
// ==========================================================

const notificationBtn =
    document.getElementById(
        "notificationBtn"
    );


if (notificationBtn) {

    notificationBtn.addEventListener(
        "click",
        function () {

            const leaveCount =
                leaveRequests.filter(
                    function (request) {

                        return request.status ===
                            "Pending";

                    }
                ).length;


            const resignationCount =
                resignationRequests.filter(
                    function (request) {

                        return request.status ===
                            "Pending";

                    }
                ).length;


            alert(
                "Notifications\n\n" +

                "Pending Leave Requests: " +
                leaveCount +

                "\nPending Resignation Requests: " +
                resignationCount
            );

        }
    );

}


// ==========================================================
// VIEW ALL EMPLOYEES
// ==========================================================

const viewAllEmployeesBtn =
    document.getElementById(
        "viewAllEmployeesBtn"
    );


if (viewAllEmployeesBtn) {

    viewAllEmployeesBtn.addEventListener(
        "click",
        function () {

            showPage("employees");

        }
    );

}


// ==========================================================
// EMPLOYEE SEARCH
// ==========================================================

const employeeSearch =
    document.getElementById(
        "employeeSearch"
    );


if (employeeSearch) {

    employeeSearch.addEventListener(
        "input",
        function () {

            const text =
                employeeSearch.value
                    .trim()
                    .toLowerCase();


            if (!text) {

                renderEmployees();

                return;

            }


            const results =
                employees.filter(
                    function (employee) {

                        return (

                            employee.id
                                .toLowerCase()
                                .includes(text)

                            ||

                            employee.name
                                .toLowerCase()
                                .includes(text)

                            ||

                            employee.email
                                .toLowerCase()
                                .includes(text)

                            ||

                            employee.department
                                .toLowerCase()
                                .includes(text)

                            ||

                            employee.role
                                .toLowerCase()
                                .includes(text)

                        );

                    }
                );


            renderEmployees(
                results
            );

        }
    );

}


// ==========================================================
// GLOBAL SEARCH
// ==========================================================

const globalSearch =
    document.getElementById(
        "globalSearch"
    );


if (globalSearch) {

    globalSearch.addEventListener(
        "input",
        function () {

            const text =
                globalSearch.value
                    .trim()
                    .toLowerCase();


            if (!text) {
                return;
            }


            const results =
                employees.filter(
                    function (employee) {

                        return (

                            employee.id
                                .toLowerCase()
                                .includes(text)

                            ||

                            employee.name
                                .toLowerCase()
                                .includes(text)

                            ||

                            employee.email
                                .toLowerCase()
                                .includes(text)

                            ||

                            employee.department
                                .toLowerCase()
                                .includes(text)

                            ||

                            employee.role
                                .toLowerCase()
                                .includes(text)

                        );

                    }
                );


            showPage(
                "employees"
            );


            renderEmployees(
                results
            );

        }
    );

}


// ==========================================================
// MENU BUTTON
// ==========================================================

const menuBtn =
    document.getElementById(
        "menuBtn"
    );


if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        function () {

            const sidebar =
                document.querySelector(
                    ".sidebar"
                );


            if (sidebar) {

                sidebar.classList.toggle(
                    "sidebar-open"
                );

            }

        }
    );

}


// ==========================================================
// EDIT PROFILE
// ==========================================================

const editProfileBtn =
    document.getElementById(
        "editProfileBtn"
    );


if (editProfileBtn) {

    editProfileBtn.addEventListener(
        "click",
        function () {

            if (!currentUser) {
                return;
            }


            openModal(
                "Edit Profile",
                `

                <label>
                    Name
                </label>

                <input
                    type="text"
                    id="profileEditName"
                    value="${escapeAttribute(
                        currentUser.name
                    )}"
                >


                <label>
                    Email
                </label>

                <input
                    type="email"
                    id="profileEditEmail"
                    value="${escapeAttribute(
                        currentUser.email
                    )}"
                >


                <button
                    type="button"
                    id="saveProfileButton"
                >
                    Save Profile
                </button>

                `
            );


            document
                .getElementById(
                    "saveProfileButton"
                )
                .addEventListener(
                    "click",
                    function () {

                        const name =
                            document
                                .getElementById(
                                    "profileEditName"
                                )
                                .value
                                .trim();


                        const email =
                            document
                                .getElementById(
                                    "profileEditEmail"
                                )
                                .value
                                .trim();


                        if (!name || !email) {

                            alert(
                                "Name and email are required."
                            );

                            return;

                        }


                        currentUser.name =
                            name;


                        currentUser.email =
                            email;


                        if (
                            currentUser.type ===
                            "employee"
                        ) {

                            const employee =
                                employees.find(
                                    function (item) {

                                        return (
                                            item.id ===
                                            currentUser.employeeId
                                        );

                                    }
                                );


                            if (employee) {

                                employee.name =
                                    name;

                                employee.email =
                                    email;

                            }

                        }


                        closeModal();

                        updateCurrentUserUI();

                        updateAll();


                        alert(
                            "Profile updated successfully."
                        );

                    }
                );

        }
    );

}


// ==========================================================
// EXPORT REPORT
// ==========================================================

const exportReportBtn =
    document.getElementById(
        "exportReportBtn"
    );


if (exportReportBtn) {

    exportReportBtn.addEventListener(
        "click",
        function () {

            const rows = [
                [
                    "Employee ID",
                    "Name",
                    "Email",
                    "Department",
                    "Role",
                    "Status",
                    "Joining Date"
                ]
            ];


            employees.forEach(
                function (employee) {

                    rows.push([
                        employee.id,
                        employee.name,
                        employee.email,
                        employee.department,
                        employee.role,
                        employee.status,
                        employee.joiningDate
                    ]);

                }
            );


            const csv =
                rows
                    .map(
                        function (row) {

                            return row
                                .map(
                                    function (value) {

                                        return `"${String(
                                            value
                                        ).replace(
                                            /"/g,
                                            '""'
                                        )}"`;

                                    }
                                )
                                .join(",");

                        }
                    )
                    .join("\n");


            const blob =
                new Blob(
                    [csv],
                    {
                        type:
                            "text/csv;charset=utf-8;"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement("a");


            link.href =
                url;


            link.download =
                "employee-management-report.csv";


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            URL.revokeObjectURL(
                url
            );

        }
    );

}


// ==========================================================
// MODAL
// ==========================================================

function openModal(
    title,
    content
) {

    closeModal();


    const modal =
        document.createElement("div");


    modal.id =
        "portalModal";


    modal.innerHTML = `

        <div style="
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.55);
            display:flex;
            align-items:center;
            justify-content:center;
            padding:20px;
            z-index:99999;
        ">

            <div style="
                background:white;
                width:100%;
                max-width:560px;
                max-height:90vh;
                overflow:auto;
                border-radius:18px;
                padding:28px;
                box-shadow:
                    0 20px 60px
                    rgba(0,0,0,0.30);
            ">

                <div style="
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    margin-bottom:20px;
                ">

                    <h2 style="margin:0;">
                        ${title}
                    </h2>

                    <button
                        type="button"
                        id="closePortalModal"
                        style="
                            border:none;
                            background:none;
                            font-size:28px;
                            cursor:pointer;
                        "
                    >
                        ×
                    </button>

                </div>

                <div>
                    ${content}
                </div>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    document
        .getElementById(
            "closePortalModal"
        )
        .addEventListener(
            "click",
            closeModal
        );

}


function closeModal() {

    const modal =
        document.getElementById(
            "portalModal"
        );


    if (modal) {
        modal.remove();
    }

}


// ==========================================================
// ID GENERATORS
// ==========================================================

function generateLeaveId() {

    return (
        "LV" +
        String(
            1001 +
            leaveRequests.length
        )
    );

}


function generateResignationId() {

    return (
        "RES" +
        String(
            1001 +
            resignationRequests.length
        )
    );

}


// ==========================================================
// DATE
// ==========================================================

function today() {

    return new Date()
        .toISOString()
        .split("T")[0];

}


// ==========================================================
// SAFE TEXT
// ==========================================================

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


// ==========================================================
// ESCAPE HTML ATTRIBUTE
// ==========================================================

function escapeAttribute(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );

}


// ==========================================================
// INITIALIZE
// ==========================================================

populateDepartmentDropdown();

console.log(
    "Employee Management Portal loaded successfully."
);