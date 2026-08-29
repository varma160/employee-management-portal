/* =========================================================
   EMPLOYEE MANAGEMENT PORTAL
   Existing Project - Functional JavaScript
   ========================================================= */

"use strict";

/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE_KEY = "employeeManagementPortal_v2";

const DEFAULT_ADMIN = {
    username: "admin",
    password: "admin123",
    name: "Admin User",
    role: "Super Admin",
    email: "admin@example.com",
    employeeId: "ADMIN001"
};

let state = {
    employees: [],
    departments: [],
    leaveRequests: [],
    resignationRequests: [],
    attendance: [],
    notifications: [],
    currentUser: null
};


/* =========================================================
   HELPERS
   ========================================================= */

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
        try {
            state = JSON.parse(saved);
        } catch (error) {
            console.error("Storage error:", error);
            createInitialData();
        }
    } else {
        createInitialData();
    }

    if (!state.employees) state.employees = [];
    if (!state.departments) state.departments = [];
    if (!state.leaveRequests) state.leaveRequests = [];
    if (!state.resignationRequests) state.resignationRequests = [];
    if (!state.attendance) state.attendance = [];
    if (!state.notifications) state.notifications = [];
}

function $(id) {
    return document.getElementById(id);
}

function today() {
    return new Date().toISOString().split("T")[0];
}

function formatDate(dateString) {
    if (!dateString) return "-";

    const date = new Date(dateString + "T00:00:00");

    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getInitials(name) {
    return String(name || "User")
        .split(" ")
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

function generateId(prefix, number) {
    return `${prefix}${String(number).padStart(4, "0")}`;
}

function showMessage(message, type = "success") {
    const box = document.createElement("div");

    box.textContent = message;

    box.style.position = "fixed";
    box.style.right = "25px";
    box.style.bottom = "25px";
    box.style.zIndex = "99999";
    box.style.padding = "14px 20px";
    box.style.borderRadius = "8px";
    box.style.fontSize = "14px";
    box.style.fontWeight = "600";
    box.style.boxShadow = "0 5px 20px rgba(0,0,0,.2)";
    box.style.color = "#fff";

    if (type === "error") {
        box.style.background = "#dc2626";
    } else {
        box.style.background = "#16a34a";
    }

    document.body.appendChild(box);

    setTimeout(() => {
        box.remove();
    }, 3000);
}


/* =========================================================
   DEFAULT DATA
   ========================================================= */

const departmentNames = [
    "Information Technology",
    "Human Resources",
    "Finance",
    "Sales",
    "Marketing",
    "Operations",
    "Customer Support",
    "Administration",
    "Engineering",
    "Quality Assurance"
];

const firstNames = [
    "Aarav", "Arjun", "Rahul", "Rohan", "Vikram",
    "Kiran", "Sai", "Varun", "Vivek", "Aditya",
    "Anil", "Manoj", "Sandeep", "Prakash", "Naveen",
    "Priya", "Ananya", "Sneha", "Pooja", "Divya",
    "Kavya", "Swathi", "Keerthi", "Neha", "Meena"
];

const lastNames = [
    "Sharma", "Reddy", "Kumar", "Verma", "Rao",
    "Patel", "Singh", "Das", "Naidu", "Iyer",
    "Gupta", "Mishra", "Joshi", "Nair", "Varma",
    "Chowdary", "Reddy", "Krishna", "Babu", "Pillai"
];

const roles = [
    "Software Engineer",
    "Senior Software Engineer",
    "HR Executive",
    "HR Manager",
    "Accountant",
    "Finance Executive",
    "Sales Executive",
    "Sales Manager",
    "Marketing Executive",
    "Operations Executive",
    "Support Executive",
    "System Administrator",
    "QA Engineer",
    "Team Lead",
    "Project Manager"
];

function randomDate(startYear = 2019, endYear = 2026) {
    const start = new Date(`${startYear}-01-01`).getTime();
    const end = new Date(`${endYear}-08-29`).getTime();

    return new Date(
        start + Math.random() * (end - start)
    ).toISOString().split("T")[0];
}

function createInitialData() {

    state.departments = departmentNames.map((name, index) => ({
        id: `DEP${String(index + 1).padStart(3, "0")}`,
        name,
        status: "Active"
    }));

    state.employees = [];

    for (let i = 1; i <= 1700; i++) {

        const first = firstNames[i % firstNames.length];
        const last = lastNames[i % lastNames.length];

        const department =
            state.departments[i % state.departments.length];

        const statusRandom = Math.random();

        let status = "Active";

        if (statusRandom < 0.06) {
            status = "On Leave";
        } else if (statusRandom < 0.10) {
            status = "Inactive";
        }

        const name = `${first} ${last}`;

        state.employees.push({
            id: generateId("EMP", i),
            name,
            email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@company.com`,
            phone: `9${String(100000000 + i).slice(0, 9)}`,
            department: department.name,
            role: roles[i % roles.length],
            joiningDate: randomDate(),
            status,
            password: "emp123",
            terminationDate: null,
            terminationReason: null,
            previousJoiningDates: []
        });
    }

    state.leaveRequests = [];
    state.resignationRequests = [];
    state.attendance = [];
    state.notifications = [];

    saveState();
}


/* =========================================================
   LOGIN
   ========================================================= */

function login(username, password) {

    username = username.trim();
    password = password.trim();

    /* ADMIN LOGIN */

    if (
        username === DEFAULT_ADMIN.username &&
        password === DEFAULT_ADMIN.password
    ) {

        state.currentUser = {
            type: "admin",
            username: DEFAULT_ADMIN.username,
            name: DEFAULT_ADMIN.name,
            role: DEFAULT_ADMIN.role,
            email: DEFAULT_ADMIN.email,
            employeeId: DEFAULT_ADMIN.employeeId
        };

        saveState();

        showApplication();

        return true;
    }

    /* EMPLOYEE LOGIN */

    const employee = state.employees.find(emp =>
        (
            emp.id.toLowerCase() === username.toLowerCase() ||
            emp.email.toLowerCase() === username.toLowerCase()
        ) &&
        emp.password === password
    );

    if (employee) {

        if (employee.status === "Terminated") {
            showMessage(
                "This employee account is terminated.",
                "error"
            );

            return false;
        }

        state.currentUser = {
            type: "employee",
            username: employee.id,
            name: employee.name,
            role: employee.role,
            email: employee.email,
            employeeId: employee.id
        };

        saveState();

        showApplication();

        return true;
    }

    return false;
}

function logout() {

    state.currentUser = null;

    saveState();

    $("appPage").classList.add("hidden");
    $("loginPage").classList.remove("hidden");

    $("loginForm").reset();

    $("loginError").textContent = "";

    showMessage("Logged out successfully.");
}

function showApplication() {

    $("loginPage").classList.add("hidden");
    $("appPage").classList.remove("hidden");

    setupUserInterface();

    if (state.currentUser.type === "admin") {
        navigateTo("dashboard");
    } else {
        navigateTo("myLeave");
    }

    refreshAll();
}


/* =========================================================
   USER INTERFACE
   ========================================================= */

function setupUserInterface() {

    const user = state.currentUser;

    if (!user) return;

    const avatar = $("currentUserAvatar");
    const name = $("currentUserName");
    const role = $("currentUserRole");

    if (avatar) {
        avatar.textContent = getInitials(user.name);
    }

    if (name) {
        name.textContent = user.name;
    }

    if (role) {
        role.textContent = user.role;
    }

    updateProfile();

    setupEmployeeNavigation();
}

function setupEmployeeNavigation() {

    const navigation = $("mainNavigation");

    if (!navigation) return;

    const buttons = navigation.querySelectorAll("button[data-page]");

    buttons.forEach(button => {

        const page = button.dataset.page;

        /* Employee should not access admin pages */

        if (
            state.currentUser &&
            state.currentUser.type === "employee"
        ) {

            const allowed = [
                "profile",
                "attendance",
                "myLeave",
                "myResignation"
            ];

            if (!allowed.includes(page)) {
                button.style.display = "none";
            } else {
                button.style.display = "";
            }

        } else {

            button.style.display = "";

            if (page === "myLeave" || page === "myResignation") {
                button.style.display = "none";
            }
        }
    });
}


/* =========================================================
   NAVIGATION
   ========================================================= */

const pageTitles = {
    dashboard: ["Dashboard", "Employee Management Portal"],
    employees: ["Employees", "View and manage all employee records."],
    addEmployee: ["Add New Employee", "Create a new employee record."],
    departments: ["Departments", "Manage company departments."],
    leaveRequests: ["Leave Requests", "Review and manage employee leave requests."],
    resignationRequests: ["Termination Requests", "Review employee termination requests."],
    attendance: ["Attendance", "Track employee attendance and working status."],
    reports: ["Reports", "Workforce and employee management reports."],
    profile: ["My Profile", "View your account and employment information."],
    myLeave: ["My Leave", "Apply for leave and view your leave history."],
    myResignation: ["My Termination", "Submit a termination request for Admin approval."]
};

function navigateTo(page) {

    if (!state.currentUser) return;

    /* Permission control */

    if (state.currentUser.type === "employee") {

        const allowed = [
            "myLeave",
            "myResignation",
            "attendance",
            "profile"
        ];

        if (!allowed.includes(page)) {
            page = "myLeave";
        }
    }

    document.querySelectorAll(".page").forEach(section => {
        section.classList.add("hidden");
    });

    const target = $(`${page}Page`);

    if (target) {
        target.classList.remove("hidden");
    }

    const title = pageTitles[page];

    if (title) {
        $("pageTitle").textContent = title[0];
        $("pageSubtitle").textContent = title[1];
    }

    document.querySelectorAll("#mainNavigation button[data-page]")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );
        });

    refreshAll();
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {

    const employees = state.employees;

    const total = employees.length;

    const active = employees.filter(
        e => e.status === "Active"
    ).length;

    const onLeave = employees.filter(
        e => e.status === "On Leave"
    ).length;

    const resigned = employees.filter(
        e => e.status === "Terminated"
    ).length;

    const pendingLeaves = state.leaveRequests.filter(
        r => r.status === "Pending"
    ).length;

    const pendingTerminations = state.resignationRequests.filter(
        r => r.status === "Pending"
    ).length;

    const currentYear = new Date().getFullYear();

    const newJoiners = employees.filter(e => {
        return (
            e.joiningDate &&
            new Date(e.joiningDate).getFullYear() === currentYear
        );
    }).length;

    const rejoined = employees.filter(
        e => e.previousJoiningDates &&
            e.previousJoiningDates.length > 0
    ).length;

    setText("totalEmployees", total);
    setText("activeEmployees", active);
    setText("onLeaveEmployees", onLeave);
    setText("pendingLeaveRequests", pendingLeaves);

    setText("pendingResignations", pendingTerminations);
    setText("resignedEmployees", resigned);

    setText("newJoiners", newJoiners);
    setText("rejoinedEmployees", rejoined);

    setText(
        "totalDepartments",
        state.departments.filter(
            d => d.status === "Active"
        ).length
    );

    renderDepartmentDistribution();
    renderJoiningTrend();
    renderRecentEmployees();
    renderAlerts();
}

function setText(id, value) {

    const element = $(id);

    if (element) {
        element.textContent = value;
    }
}


/* =========================================================
   DEPARTMENT DISTRIBUTION
   ========================================================= */

function renderDepartmentDistribution() {

    const container = $("departmentDistribution");

    if (!container) return;

    const counts = {};

    state.departments.forEach(dep => {
        counts[dep.name] = 0;
    });

    state.employees.forEach(employee => {

        if (employee.status !== "Terminated") {

            counts[employee.department] =
                (counts[employee.department] || 0) + 1;
        }
    });

    const total = Object.values(counts)
        .reduce((sum, value) => sum + value, 0);

    container.innerHTML = Object.entries(counts)
        .map(([department, count]) => {

            const percentage =
                total > 0
                    ? Math.round((count / total) * 100)
                    : 0;

            return `
                <div style="margin-bottom:14px;">
                    <div style="
                        display:flex;
                        justify-content:space-between;
                        margin-bottom:5px;
                    ">
                        <span>${escapeHTML(department)}</span>
                        <strong>${count}</strong>
                    </div>

                    <div style="
                        background:#e5e7eb;
                        height:8px;
                        border-radius:20px;
                        overflow:hidden;
                    ">
                        <div style="
                            width:${percentage}%;
                            height:100%;
                            background:#2563eb;
                        "></div>
                    </div>
                </div>
            `;
        })
        .join("");
}


/* =========================================================
   JOINING VS TERMINATION
   ========================================================= */

function renderJoiningTrend() {

    const container = $("joiningResignationTrend");

    if (!container) return;

    const currentYear = new Date().getFullYear();

    let html = "";

    for (let month = 0; month < 12; month++) {

        const joiningCount = state.employees.filter(emp => {

            const date = new Date(emp.joiningDate);

            return (
                date.getFullYear() === currentYear &&
                date.getMonth() === month
            );
        }).length;

        const terminationCount =
            state.resignationRequests.filter(req => {

                if (!req.requestedDate) return false;

                const date = new Date(req.requestedDate);

                return (
                    date.getFullYear() === currentYear &&
                    date.getMonth() === month &&
                    req.status === "Approved"
                );
            }).length;

        const monthName = new Date(
            currentYear,
            month,
            1
        ).toLocaleDateString("en-IN", {
            month: "short"
        });

        html += `
            <div style="
                display:flex;
                justify-content:space-between;
                padding:8px 0;
                border-bottom:1px solid #eee;
            ">
                <strong>${monthName}</strong>
                <span>
                    Joined: <b>${joiningCount}</b>
                    &nbsp; | &nbsp;
                    Terminated: <b>${terminationCount}</b>
                </span>
            </div>
        `;
    }

    container.innerHTML = html;
}


/* =========================================================
   RECENT EMPLOYEES
   ========================================================= */

function renderRecentEmployees() {

    const tbody = $("recentEmployees");

    if (!tbody) return;

    const employees = [...state.employees]
        .sort((a, b) =>
            new Date(b.joiningDate) -
            new Date(a.joiningDate)
        )
        .slice(0, 10);

    tbody.innerHTML = employees.map(employee => `
        <tr>
            <td>${escapeHTML(employee.id)}</td>

            <td>${escapeHTML(employee.name)}</td>

            <td>${escapeHTML(employee.department)}</td>

            <td>${formatDate(employee.joiningDate)}</td>

            <td>
                <span class="status ${employee.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}">
                    ${escapeHTML(employee.status)}
                </span>
            </td>
        </tr>
    `).join("");
}


/* =========================================================
   ALERTS
   ========================================================= */

function renderAlerts() {

    const container = $("dashboardAlerts");

    if (!container) return;

    const alerts = [];

    const pendingLeaves = state.leaveRequests.filter(
        r => r.status === "Pending"
    );

    const pendingTerminations =
        state.resignationRequests.filter(
            r => r.status === "Pending"
        );

    pendingLeaves.slice(0, 3).forEach(request => {

        alerts.push({
            text: `${request.employeeName} submitted a leave request.`,
            type: "Leave"
        });
    });

    pendingTerminations.slice(0, 3).forEach(request => {

        alerts.push({
            text: `${request.employeeName} submitted a termination request.`,
            type: "Termination"
        });
    });

    if (alerts.length === 0) {

        container.innerHTML = `
            <div class="alert-item">
                <span>●</span>
                <p>No new alerts.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = alerts.map(alert => `
        <div class="alert-item">
            <span>●</span>
            <p>
                <strong>${escapeHTML(alert.type)}:</strong>
                ${escapeHTML(alert.text)}
            </p>
        </div>
    `).join("");
}


/* =========================================================
   EMPLOYEE DIRECTORY
   ========================================================= */

function renderEmployees(search = "") {

    const tbody = $("employeeTable");

    if (!tbody) return;

    search = search.toLowerCase().trim();

    const employees = state.employees.filter(employee => {

        if (!search) return true;

        return [
            employee.id,
            employee.name,
            employee.email,
            employee.department,
            employee.role,
            employee.status
        ]
            .join(" ")
            .toLowerCase()
            .includes(search);
    });

    tbody.innerHTML = employees.map(employee => {

        const isTerminated =
            employee.status === "Terminated";

        const actionButton = isTerminated
            ? `
                <button
                    type="button"
                    class="rejoin-btn"
                    data-id="${employee.id}"
                >
                    Rejoin
                </button>
            `
            : `
                <button
                    type="button"
                    class="view-employee-btn"
                    data-id="${employee.id}"
                >
                    View
                </button>

                <button
                    type="button"
                    class="terminate-btn"
                    data-id="${employee.id}"
                >
                    Terminate
                </button>
            `;

        return `
            <tr>

                <td>${escapeHTML(employee.id)}</td>

                <td>${escapeHTML(employee.name)}</td>

                <td>${escapeHTML(employee.email)}</td>

                <td>${escapeHTML(employee.department)}</td>

                <td>${escapeHTML(employee.role)}</td>

                <td>
                    <span class="status">
                        ${escapeHTML(employee.status)}
                    </span>
                </td>

                <td>
                    ${actionButton}
                </td>

            </tr>
        `;

    }).join("");

    bindEmployeeActionButtons();
}

function bindEmployeeActionButtons() {

    document.querySelectorAll(".terminate-btn")
        .forEach(button => {

            button.onclick = () => {
                terminateEmployee(button.dataset.id);
            };
        });

    document.querySelectorAll(".rejoin-btn")
        .forEach(button => {

            button.onclick = () => {
                rejoinEmployee(button.dataset.id);
            };
        });

    document.querySelectorAll(".view-employee-btn")
        .forEach(button => {

            button.onclick = () => {
                viewEmployee(button.dataset.id);
            };
        });
}


/* =========================================================
   VIEW EMPLOYEE
   ========================================================= */

function viewEmployee(employeeId) {

    const employee = state.employees.find(
        e => e.id === employeeId
    );

    if (!employee) return;

    alert(
        `Employee Details\n\n` +
        `ID: ${employee.id}\n` +
        `Name: ${employee.name}\n` +
        `Email: ${employee.email}\n` +
        `Phone: ${employee.phone}\n` +
        `Department: ${employee.department}\n` +
        `Role: ${employee.role}\n` +
        `Joining Date: ${formatDate(employee.joiningDate)}\n` +
        `Status: ${employee.status}`
    );
}


/* =========================================================
   TERMINATE EMPLOYEE
   ========================================================= */

function terminateEmployee(employeeId) {

    const employee = state.employees.find(
        e => e.id === employeeId
    );

    if (!employee) return;

    if (employee.status === "Terminated") {
        showMessage(
            "Employee is already terminated.",
            "error"
        );
        return;
    }

    const reason = prompt(
        `Terminate ${employee.name}\n\nEnter termination reason:`
    );

    if (reason === null) return;

    if (!reason.trim()) {

        showMessage(
            "Termination reason is required.",
            "error"
        );

        return;
    }

    const confirmed = confirm(
        `Are you sure you want to terminate ${employee.name}?`
    );

    if (!confirmed) return;

    employee.status = "Terminated";
    employee.terminationDate = today();
    employee.terminationReason = reason.trim();

    state.notifications.unshift({
        id: `NOT${Date.now()}`,
        message: `${employee.name} has been terminated.`,
        date: today(),
        read: false
    });

    saveState();

    refreshAll();

    showMessage(
        `${employee.name} terminated successfully.`
    );
}


/* =========================================================
   REJOIN EMPLOYEE
   ========================================================= */

function rejoinEmployee(employeeId) {

    const employee = state.employees.find(
        e => e.id === employeeId
    );

    if (!employee) return;

    if (employee.status !== "Terminated") {
        showMessage(
            "Employee is not terminated.",
            "error"
        );
        return;
    }

    const confirmed = confirm(
        `Rejoin ${employee.name} as an employee?`
    );

    if (!confirmed) return;

    if (!employee.previousJoiningDates) {
        employee.previousJoiningDates = [];
    }

    if (employee.joiningDate) {
        employee.previousJoiningDates.push(
            employee.joiningDate
        );
    }

    employee.joiningDate = today();
    employee.status = "Active";
    employee.terminationDate = null;
    employee.terminationReason = null;

    state.notifications.unshift({
        id: `NOT${Date.now()}`,
        message: `${employee.name} has rejoined the organization.`,
        date: today(),
        read: false
    });

    saveState();

    refreshAll();

    showMessage(
        `${employee.name} rejoined successfully.`
    );
}


/* =========================================================
   ADD EMPLOYEE
   ========================================================= */

function addEmployee(event) {

    event.preventDefault();

    const name = $("employeeName").value.trim();
    const email = $("employeeEmail").value.trim();
    const phone = $("employeePhone").value.trim();
    const department = $("employeeDepartment").value;
    const role = $("employeeRole").value.trim();
    const joiningDate = $("joiningDate").value;
    const status = $("employeeStatus").value;

    if (
        !name ||
        !email ||
        !department ||
        !role ||
        !joiningDate
    ) {

        showMessage(
            "Please complete all required fields.",
            "error"
        );

        return;
    }

    const existingEmail = state.employees.find(
        employee =>
            employee.email.toLowerCase() ===
            email.toLowerCase()
    );

    if (existingEmail) {

        showMessage(
            "Email already exists.",
            "error"
        );

        return;
    }

    const nextNumber =
        state.employees.reduce((max, employee) => {

            const number = parseInt(
                employee.id.replace(/\D/g, ""),
                10
            );

            return Math.max(max, number || 0);

        }, 0) + 1;

    const employeeId =
        generateId("EMP", nextNumber);

    const newEmployee = {

        id: employeeId,

        name,

        email,

        phone,

        department,

        role,

        joiningDate,

        status,

        password: "emp123",

        terminationDate: null,

        terminationReason: null,

        previousJoiningDates: []
    };

    state.employees.push(newEmployee);

    state.notifications.unshift({
        id: `NOT${Date.now()}`,
        message: `${name} joined as a new employee.`,
        date: today(),
        read: false
    });

    saveState();

    event.target.reset();

    populateDepartmentSelect();

    refreshAll();

    showMessage(
        `Employee added successfully. Employee ID: ${employeeId}`
    );

    navigateTo("employees");
}


/* =========================================================
   DEPARTMENT MANAGEMENT
   ========================================================= */

function renderDepartments() {

    const tbody = $("departmentTable");

    if (!tbody) return;

    tbody.innerHTML = state.departments.map(department => {

        const employeeCount =
            state.employees.filter(
                employee =>
                    employee.department === department.name &&
                    employee.status !== "Terminated"
            ).length;

        return `
            <tr>

                <td>${escapeHTML(department.id)}</td>

                <td>${escapeHTML(department.name)}</td>

                <td>${employeeCount}</td>

                <td>${escapeHTML(department.status)}</td>

                <td>

                    <button
                        type="button"
                        class="department-toggle-btn"
                        data-id="${department.id}"
                    >
                        ${
                            department.status === "Active"
                                ? "Deactivate"
                                : "Activate"
                        }
                    </button>

                </td>

            </tr>
        `;

    }).join("");

    document.querySelectorAll(".department-toggle-btn")
        .forEach(button => {

            button.onclick = () => {

                const department =
                    state.departments.find(
                        d => d.id === button.dataset.id
                    );

                if (!department) return;

                department.status =
                    department.status === "Active"
                        ? "Inactive"
                        : "Active";

                saveState();

                refreshAll();

                showMessage(
                    `${department.name} status updated.`
                );
            };
        });
}

function addDepartment() {

    const name = prompt(
        "Enter new department name:"
    );

    if (name === null) return;

    const cleanName = name.trim();

    if (!cleanName) {

        showMessage(
            "Department name is required.",
            "error"
        );

        return;
    }

    const exists = state.departments.some(
        department =>
            department.name.toLowerCase() ===
            cleanName.toLowerCase()
    );

    if (exists) {

        showMessage(
            "Department already exists.",
            "error"
        );

        return;
    }

    const id =
        `DEP${String(state.departments.length + 1).padStart(3, "0")}`;

    state.departments.push({
        id,
        name: cleanName,
        status: "Active"
    });

    saveState();

    populateDepartmentSelect();
    refreshAll();

    showMessage(
        `${cleanName} department added.`
    );
}

function populateDepartmentSelect() {

    const select = $("employeeDepartment");

    if (!select) return;

    select.innerHTML = `
        <option value="">
            Select Department
        </option>
    `;

    state.departments
        .filter(d => d.status === "Active")
        .forEach(department => {

            const option =
                document.createElement("option");

            option.value = department.name;
            option.textContent = department.name;

            select.appendChild(option);
        });
}


/* =========================================================
   LEAVE REQUESTS - ADMIN
   ========================================================= */

function renderLeaveRequests() {

    const tbody = $("leaveRequestTable");

    if (!tbody) return;

    const pending =
        state.leaveRequests.filter(
            r => r.status === "Pending"
        ).length;

    const approved =
        state.leaveRequests.filter(
            r => r.status === "Approved"
        ).length;

    const rejected =
        state.leaveRequests.filter(
            r => r.status === "Rejected"
        ).length;

    setText("leavePendingCount", pending);
    setText("leaveApprovedCount", approved);
    setText("leaveRejectedCount", rejected);

    tbody.innerHTML =
        state.leaveRequests.map(request => {

            let actions = "";

            if (request.status === "Pending") {

                actions = `
                    <button
                        type="button"
                        class="approve-leave-btn"
                        data-id="${request.id}"
                    >
                        Approve
                    </button>

                    <button
                        type="button"
                        class="reject-leave-btn"
                        data-id="${request.id}"
                    >
                        Reject
                    </button>
                `;
            } else {

                actions = `
                    <span>
                        ${escapeHTML(request.status)}
                    </span>
                `;
            }

            return `
                <tr>

                    <td>${escapeHTML(request.id)}</td>

                    <td>${escapeHTML(request.employeeName)}</td>

                    <td>${escapeHTML(request.leaveType)}</td>

                    <td>${formatDate(request.fromDate)}</td>

                    <td>${formatDate(request.toDate)}</td>

                    <td>${escapeHTML(request.reason)}</td>

                    <td>${escapeHTML(request.status)}</td>

                    <td>${actions}</td>

                </tr>
            `;
        }).join("");

    bindLeaveButtons();
}

function bindLeaveButtons() {

    document.querySelectorAll(".approve-leave-btn")
        .forEach(button => {

            button.onclick = () => {

                updateLeaveStatus(
                    button.dataset.id,
                    "Approved"
                );
            };
        });

    document.querySelectorAll(".reject-leave-btn")
        .forEach(button => {

            button.onclick = () => {

                updateLeaveStatus(
                    button.dataset.id,
                    "Rejected"
                );
            };
        });
}

function updateLeaveStatus(requestId, status) {

    const request =
        state.leaveRequests.find(
            r => r.id === requestId
        );

    if (!request) return;

    if (request.status !== "Pending") {

        showMessage(
            "This request has already been processed.",
            "error"
        );

        return;
    }

    request.status = status;
    request.actionDate = today();
    request.actionBy =
        state.currentUser?.name || "Admin";

    const employee =
        state.employees.find(
            e => e.id === request.employeeId
        );

    if (status === "Approved" && employee) {
        employee.status = "On Leave";
    }

    if (status === "Rejected" && employee) {

        if (employee.status === "On Leave") {
            employee.status = "Active";
        }
    }

    state.notifications.unshift({
        id: `NOT${Date.now()}`,
        message:
            `Leave request ${request.id} for ${request.employeeName} was ${status.toLowerCase()}.`,
        date: today(),
        read: false
    });

    saveState();

    refreshAll();

    showMessage(
        `Leave request ${status.toLowerCase()} successfully.`
    );
}


/* =========================================================
   EMPLOYEE - APPLY LEAVE
   ========================================================= */

function applyLeaveForEmployee() {

    if (
        !state.currentUser ||
        state.currentUser.type !== "employee"
    ) {
        return;
    }

    const employeeId =
        state.currentUser.employeeId;

    const employee =
        state.employees.find(
            e => e.id === employeeId
        );

    if (!employee) return;

    const leaveType = prompt(
        "Leave Type:\n\nEnter Casual / Sick / Earned / Emergency"
    );

    if (leaveType === null) return;

    const fromDate = prompt(
        "Leave From Date (YYYY-MM-DD):"
    );

    if (fromDate === null) return;

    const toDate = prompt(
        "Leave To Date (YYYY-MM-DD):"
    );

    if (toDate === null) return;

    const reason = prompt(
        "Enter Leave Reason:"
    );

    if (reason === null) return;

    if (
        !leaveType.trim() ||
        !fromDate.trim() ||
        !toDate.trim() ||
        !reason.trim()
    ) {

        showMessage(
            "Leave type, dates and reason are required.",
            "error"
        );

        return;
    }

    if (fromDate > toDate) {

        showMessage(
            "From date cannot be after To date.",
            "error"
        );

        return;
    }

    const pendingRequest =
        state.leaveRequests.find(
            request =>
                request.employeeId === employeeId &&
                request.status === "Pending"
        );

    if (pendingRequest) {

        showMessage(
            "You already have a pending leave request.",
            "error"
        );

        return;
    }

    const requestId =
        `LR${Date.now().toString().slice(-8)}`;

    state.leaveRequests.unshift({

        id: requestId,

        employeeId,

        employeeName: employee.name,

        department: employee.department,

        leaveType: leaveType.trim(),

        fromDate: fromDate.trim(),

        toDate: toDate.trim(),

        reason: reason.trim(),

        status: "Pending",

        requestedDate: today(),

        actionDate: null,

        actionBy: null
    });

    state.notifications.unshift({
        id: `NOT${Date.now()}`,
        message:
            `${employee.name} submitted a leave request.`,
        date: today(),
        read: false
    });

    saveState();

    refreshAll();

    showMessage(
        "Leave request submitted successfully."
    );
}


/* =========================================================
   MY LEAVE
   ========================================================= */

function renderMyLeave() {

    if (
        !state.currentUser ||
        state.currentUser.type !== "employee"
    ) return;

    const employeeId =
        state.currentUser.employeeId;

    const requests =
        state.leaveRequests.filter(
            request =>
                request.employeeId === employeeId
        );

    const pending =
        requests.filter(
            r => r.status === "Pending"
        ).length;

    const approved =
        requests.filter(
            r => r.status === "Approved"
        ).length;

    setText("leaveBalance", 12 - approved);
    setText("myPendingLeaves", pending);
    setText("myApprovedLeaves", approved);

    const tbody = $("myLeaveTable");

    if (!tbody) return;

    tbody.innerHTML = requests.map(request => `
        <tr>

            <td>${escapeHTML(request.id)}</td>

            <td>${escapeHTML(request.leaveType)}</td>

            <td>${formatDate(request.fromDate)}</td>

            <td>${formatDate(request.toDate)}</td>

            <td>${escapeHTML(request.reason)}</td>

            <td>${escapeHTML(request.status)}</td>

        </tr>
    `).join("");
}


/* =========================================================
   TERMINATION REQUESTS
   ========================================================= */

function renderResignationRequests() {

    const tbody =
        $("resignationRequestTable");

    if (!tbody) return;

    const pending =
        state.resignationRequests.filter(
            r => r.status === "Pending"
        ).length;

    const approved =
        state.resignationRequests.filter(
            r => r.status === "Approved"
        ).length;

    const rejected =
        state.resignationRequests.filter(
            r => r.status === "Rejected"
        ).length;

    setText(
        "resignationPendingCount",
        pending
    );

    setText(
        "resignationApprovedCount",
        approved
    );

    setText(
        "resignationRejectedCount",
        rejected
    );

    tbody.innerHTML =
        state.resignationRequests.map(request => {

            let actions = "";

            if (request.status === "Pending") {

                actions = `
                    <button
                        type="button"
                        class="approve-termination-btn"
                        data-id="${request.id}"
                    >
                        Approve & Terminate
                    </button>

                    <button
                        type="button"
                        class="reject-termination-btn"
                        data-id="${request.id}"
                    >
                        Reject
                    </button>
                `;
            }

            return `
                <tr>

                    <td>${escapeHTML(request.id)}</td>

                    <td>${escapeHTML(request.employeeName)}</td>

                    <td>${escapeHTML(request.department)}</td>

                    <td>${formatDate(request.requestedDate)}</td>

                    <td>${formatDate(request.lastWorkingDate)}</td>

                    <td>${escapeHTML(request.reason)}</td>

                    <td>${escapeHTML(request.status)}</td>

                    <td>${actions}</td>

                </tr>
            `;
        }).join("");

    bindTerminationRequestButtons();
}

function bindTerminationRequestButtons() {

    document.querySelectorAll(
        ".approve-termination-btn"
    ).forEach(button => {

        button.onclick = () => {

            processTerminationRequest(
                button.dataset.id,
                "Approved"
            );
        };
    });

    document.querySelectorAll(
        ".reject-termination-btn"
    ).forEach(button => {

        button.onclick = () => {

            processTerminationRequest(
                button.dataset.id,
                "Rejected"
            );
        };
    });
}

function processTerminationRequest(
    requestId,
    status
) {

    const request =
        state.resignationRequests.find(
            r => r.id === requestId
        );

    if (!request) return;

    if (request.status !== "Pending") return;

    request.status = status;
    request.actionDate = today();

    const employee =
        state.employees.find(
            e => e.id === request.employeeId
        );

    if (
        status === "Approved" &&
        employee
    ) {

        employee.status = "Terminated";

        employee.terminationDate =
            request.lastWorkingDate || today();

        employee.terminationReason =
            request.reason;
    }

    saveState();

    refreshAll();

    showMessage(
        status === "Approved"
            ? "Employee terminated successfully."
            : "Termination request rejected."
    );
}


/* =========================================================
   EMPLOYEE TERMINATION REQUEST
   ========================================================= */

function requestTermination() {

    if (
        !state.currentUser ||
        state.currentUser.type !== "employee"
    ) return;

    const employeeId =
        state.currentUser.employeeId;

    const employee =
        state.employees.find(
            e => e.id === employeeId
        );

    if (!employee) return;

    const existing =
        state.resignationRequests.find(
            request =>
                request.employeeId === employeeId &&
                request.status === "Pending"
        );

    if (existing) {

        showMessage(
            "You already have a pending termination request.",
            "error"
        );

        return;
    }

    const lastWorkingDate =
        prompt(
            "Enter proposed last working date (YYYY-MM-DD):"
        );

    if (lastWorkingDate === null) return;

    const reason =
        prompt(
            "Enter reason for termination request:"
        );

    if (reason === null) return;

    if (
        !lastWorkingDate.trim() ||
        !reason.trim()
    ) {

        showMessage(
            "Last working date and reason are required.",
            "error"
        );

        return;
    }

    const confirmed =
        confirm(
            "Submit termination request to Admin?"
        );

    if (!confirmed) return;

    const requestId =
        `TR${Date.now().toString().slice(-8)}`;

    state.resignationRequests.unshift({

        id: requestId,

        employeeId,

        employeeName: employee.name,

        department: employee.department,

        requestedDate: today(),

        lastWorkingDate: lastWorkingDate.trim(),

        reason: reason.trim(),

        status: "Pending",

        actionDate: null
    });

    state.notifications.unshift({
        id: `NOT${Date.now()}`,
        message:
            `${employee.name} submitted a termination request.`,
        date: today(),
        read: false
    });

    saveState();

    refreshAll();

    showMessage(
        "Termination request submitted to Admin."
    );
}


/* =========================================================
   MY TERMINATION STATUS
   ========================================================= */

function renderMyResignation() {

    if (
        !state.currentUser ||
        state.currentUser.type !== "employee"
    ) return;

    const employeeId =
        state.currentUser.employeeId;

    const requests =
        state.resignationRequests.filter(
            request =>
                request.employeeId === employeeId
        );

    const container =
        $("resignationStatus");

    if (!container) return;

    if (requests.length === 0) {

        container.innerHTML = `
            <p>
                No termination request submitted.
            </p>
        `;

        return;
    }

    const request = requests[0];

    container.innerHTML = `
        <div>

            <h3>
                Termination Request: ${escapeHTML(request.id)}
            </h3>

            <p>
                Requested Date:
                ${formatDate(request.requestedDate)}
            </p>

            <p>
                Last Working Date:
                ${formatDate(request.lastWorkingDate)}
            </p>

            <p>
                Reason:
                ${escapeHTML(request.reason)}
            </p>

            <p>
                Status:
                <strong>
                    ${escapeHTML(request.status)}
                </strong>
            </p>

        </div>
    `;
}


/* =========================================================
   ATTENDANCE
   ========================================================= */

function createAttendanceData() {

    const date = today();

    state.attendance = state.employees
        .filter(
            employee =>
                employee.status !== "Terminated"
        )
        .slice(0, 200)
        .map((employee, index) => {

            let status = "Present";

            if (employee.status === "On Leave") {
                status = "On Leave";
            } else if (index % 17 === 0) {
                status = "Absent";
            }

            return {

                employeeId: employee.id,

                employeeName: employee.name,

                department: employee.department,

                date,

                checkIn:
                    status === "Present"
                        ? "09:00 AM"
                        : "-",

                checkOut:
                    status === "Present"
                        ? "06:00 PM"
                        : "-",

                status
            };
        });

    saveState();
}

function renderAttendance() {

    if (!state.attendance.length) {
        createAttendanceData();
    }

    let records =
        state.attendance;

    if (
        state.currentUser &&
        state.currentUser.type === "employee"
    ) {

        records = records.filter(
            record =>
                record.employeeId ===
                state.currentUser.employeeId
        );
    }

    const present =
        records.filter(
            r => r.status === "Present"
        ).length;

    const absent =
        records.filter(
            r => r.status === "Absent"
        ).length;

    const leave =
        records.filter(
            r => r.status === "On Leave"
        ).length;

    setText("presentToday", present);
    setText("absentToday", absent);
    setText("attendanceOnLeave", leave);

    const tbody =
        $("attendanceTable");

    if (!tbody) return;

    tbody.innerHTML = records.map(record => `
        <tr>

            <td>${escapeHTML(record.employeeId)}</td>

            <td>${escapeHTML(record.employeeName)}</td>

            <td>${escapeHTML(record.department)}</td>

            <td>${formatDate(record.date)}</td>

            <td>${escapeHTML(record.checkIn)}</td>

            <td>${escapeHTML(record.checkOut)}</td>

            <td>${escapeHTML(record.status)}</td>

        </tr>
    `).join("");
}


/* =========================================================
   REPORTS
   ========================================================= */

function renderReports() {

    const employees =
        state.employees;

    setText(
        "reportTotal",
        employees.length
    );

    setText(
        "reportActive",
        employees.filter(
            e => e.status === "Active"
        ).length
    );

    setText(
        "reportLeave",
        employees.filter(
            e => e.status === "On Leave"
        ).length
    );

    setText(
        "reportResigned",
        employees.filter(
            e => e.status === "Terminated"
        ).length
    );

    const container =
        $("employeeReport");

    if (!container) return;

    const departmentSummary = {};

    employees.forEach(employee => {

        departmentSummary[employee.department] =
            (departmentSummary[employee.department] || 0) + 1;
    });

    container.innerHTML = `
        <div>

            <h3>Workforce Summary</h3>

            <p>
                Generated:
                ${formatDate(today())}
            </p>

            <hr>

            <h3>Department Summary</h3>

            ${Object.entries(departmentSummary)
                .map(([department, count]) => `
                    <p>
                        <strong>
                            ${escapeHTML(department)}
                        </strong>:
                        ${count} employees
                    </p>
                `)
                .join("")}

        </div>
    `;
}

function exportReport() {

    const headers = [
        "Employee ID",
        "Name",
        "Email",
        "Phone",
        "Department",
        "Role",
        "Joining Date",
        "Status"
    ];

    const rows =
        state.employees.map(employee => [
            employee.id,
            employee.name,
            employee.email,
            employee.phone,
            employee.department,
            employee.role,
            employee.joiningDate,
            employee.status
        ]);

    const csv = [
        headers,
        ...rows
    ]
        .map(row =>
            row.map(value =>
                `"${String(value ?? "")
                    .replace(/"/g, '""')}"`
            ).join(",")
        )
        .join("\n");

    const blob =
        new Blob([csv], {
            type: "text/csv;charset=utf-8;"
        });

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        `employee-report-${today()}.csv`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    showMessage(
        "Employee report exported successfully."
    );
}


/* =========================================================
   PROFILE
   ========================================================= */

function updateProfile() {

    if (!state.currentUser) return;

    const user = state.currentUser;

    setText(
        "profileName",
        user.name
    );

    setText(
        "profileEmail",
        user.email
    );

    setText(
        "profileRole",
        user.role
    );

    setText(
        "profileEmployeeId",
        user.employeeId
    );

    const avatar =
        document.querySelector(".profile-avatar");

    if (avatar) {
        avatar.textContent =
            getInitials(user.name);
    }
}

function editProfile() {

    if (!state.currentUser) return;

    const employee =
        state.currentUser.type === "employee"
            ? state.employees.find(
                e =>
                    e.id ===
                    state.currentUser.employeeId
            )
            : null;

    const newName =
        prompt(
            "Enter your name:",
            state.currentUser.name
        );

    if (newName === null) return;

    if (!newName.trim()) return;

    state.currentUser.name =
        newName.trim();

    if (employee) {
        employee.name =
            newName.trim();
    }

    saveState();

    setupUserInterface();

    refreshAll();

    showMessage(
        "Profile updated successfully."
    );
}


/* =========================================================
   GLOBAL SEARCH
   ========================================================= */

function globalSearch(value) {

    if (
        !state.currentUser ||
        state.currentUser.type !== "admin"
    ) return;

    const search = value.trim();

    if (!search) return;

    navigateTo("employees");

    const employeeSearch =
        $("employeeSearch");

    if (employeeSearch) {
        employeeSearch.value = search;
    }

    renderEmployees(search);
}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function updateNotifications() {

    const count =
        state.notifications.filter(
            notification =>
                !notification.read
        ).length;

    setText(
        "notificationCount",
        count
    );
}

function showNotifications() {

    const notifications =
        state.notifications.slice(0, 10);

    if (!notifications.length) {

        alert("No notifications.");

        return;
    }

    alert(
        notifications
            .map(
                notification =>
                    `• ${notification.message}`
            )
            .join("\n")
    );

    state.notifications.forEach(
        notification => {
            notification.read = true;
        }
    );

    saveState();

    updateNotifications();
}


/* =========================================================
   VIEW ALL EMPLOYEES
   ========================================================= */

function viewAllEmployees() {

    navigateTo("employees");

    const search =
        $("employeeSearch");

    if (search) {
        search.value = "";
    }

    renderEmployees("");
}


/* =========================================================
   MENU
   ========================================================= */

function toggleMenu() {

    const sidebar =
        document.querySelector(".sidebar");

    if (!sidebar) return;

    sidebar.classList.toggle("open");
}


/* =========================================================
   REFRESH EVERYTHING
   ========================================================= */

function refreshAll() {

    updateDashboard();

    renderEmployees(
        $("employeeSearch")?.value || ""
    );

    renderDepartments();

    renderLeaveRequests();

    renderResignationRequests();

    renderAttendance();

    renderReports();

    renderMyLeave();

    renderMyResignation();

    updateProfile();

    updateNotifications();

    populateDepartmentSelect();
}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

function setupEventListeners() {

    /* LOGIN */

    const loginForm =
        $("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                const username =
                    $("username").value;

                const password =
                    $("password").value;

                const success =
                    login(
                        username,
                        password
                    );

                if (!success) {

                    $("loginError").textContent =
                        "Invalid username or password.";

                    $("loginError").style.color =
                        "#dc2626";

                } else {

                    $("loginError").textContent = "";
                }
            }
        );
    }


    /* LOGOUT */

    const logoutBtn =
        $("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener(
            "click",
            logout
        );
    }


    /* NAVIGATION */

    document.querySelectorAll(
        "#mainNavigation button[data-page]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {
                navigateTo(
                    button.dataset.page
                );
            }
        );
    });


    /* ADD EMPLOYEE BUTTON */

    const addEmployeeBtn =
        $("addEmployeeBtn");

    if (addEmployeeBtn) {

        addEmployeeBtn.addEventListener(
            "click",
            () => {
                navigateTo("addEmployee");
            }
        );
    }


    /* ADD EMPLOYEE FORM */

    const employeeForm =
        $("employeeForm");

    if (employeeForm) {

        employeeForm.addEventListener(
            "submit",
            addEmployee
        );
    }


    /* EMPLOYEE SEARCH */

    const employeeSearch =
        $("employeeSearch");

    if (employeeSearch) {

        employeeSearch.addEventListener(
            "input",
            event => {
                renderEmployees(
                    event.target.value
                );
            }
        );
    }


    /* GLOBAL SEARCH */

    const globalSearchInput =
        $("globalSearch");

    if (globalSearchInput) {

        globalSearchInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    globalSearch(
                        event.target.value
                    );
                }
            }
        );
    }


    /* ADD DEPARTMENT */

    const addDepartmentBtn =
        $("addDepartmentBtn");

    if (addDepartmentBtn) {

        addDepartmentBtn.addEventListener(
            "click",
            addDepartment
        );
    }


    /* APPLY LEAVE */

    const applyLeaveBtn =
        $("applyLeaveBtn");

    if (applyLeaveBtn) {

        applyLeaveBtn.addEventListener(
            "click",
            applyLeaveForEmployee
        );
    }


    /* TERMINATION REQUEST */

    const requestResignationBtn =
        $("requestResignationBtn");

    if (requestResignationBtn) {

        requestResignationBtn.addEventListener(
            "click",
            requestTermination
        );
    }


    /* EXPORT */

    const exportReportBtn =
        $("exportReportBtn");

    if (exportReportBtn) {

        exportReportBtn.addEventListener(
            "click",
            exportReport
        );
    }


    /* PROFILE */

    const editProfileBtn =
        $("editProfileBtn");

    if (editProfileBtn) {

        editProfileBtn.addEventListener(
            "click",
            editProfile
        );
    }


    /* VIEW ALL */

    const viewAllBtn =
        $("viewAllEmployeesBtn");

    if (viewAllBtn) {

        viewAllBtn.addEventListener(
            "click",
            viewAllEmployees
        );
    }


    /* NOTIFICATIONS */

    const notificationBtn =
        $("notificationBtn");

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            showNotifications
        );
    }


    /* MENU */

    const menuBtn =
        $("menuBtn");

    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            toggleMenu
        );
    }
}


/* =========================================================
   CHANGE OLD RESIGNATION LABELS TO TERMINATION
   ========================================================= */

function updateTerminationLabels() {

    document.querySelectorAll("*").forEach(element => {

        if (element.children.length === 0) {

            const text =
                element.textContent.trim();

            if (
                text === "Resignation Requests"
            ) {
                element.textContent =
                    "Termination Requests";
            }

            if (
                text === "Resigned Employees"
            ) {
                element.textContent =
                    "Terminated Employees";
            }

            if (
                text === "My Resignation"
            ) {
                element.textContent =
                    "My Termination";
            }

            if (
                text.includes(
                    "employee resignations"
                )
            ) {
                element.textContent =
                    "employee termination requests";
            }
        }
    });
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializePortal() {

    loadState();

    setupEventListeners();

    updateTerminationLabels();

    populateDepartmentSelect();

    /*
       If attendance data doesn't exist,
       create realistic demo attendance.
    */

    if (!state.attendance.length) {
        createAttendanceData();
    }

    /*
       Existing logged-in user
       */

    state.currentUser = null;
saveState();

$("appPage").classList.add("hidden");
$("loginPage").classList.remove("hidden");

}


/* =========================================================
   START APPLICATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializePortal
); 
