# Employee Management Portal

🚀 Modern • Responsive • Professional HR Management Application

---

## 🌟 About The Project

Employee Management Portal is a web-based HR management application designed to simulate real-world employee management and employee lifecycle operations.

The application provides Admin and Employee workflows for managing employee records, leave requests, departments, attendance, termination requests, reports, and employee lifecycle activities.

The project focuses on:

- 🎯 Clean and professional UI
- ⚡ Practical HR workflows
- 📱 Responsive design
- 🔄 Employee lifecycle management
- 📊 Dynamic dashboard
- 🔐 Admin and Employee workflows
- 🚀 Azure DevOps CI/CD

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 📊 Dashboard | Dynamic workforce statistics and employee overview |
| 👥 Employee Management | Manage employee records |
| ➕ Add Employee | Add new employee information |
| 🔍 Employee Search | Search by ID, name, email, department, role, or status |
| 👤 Employee Login | Separate employee login workflow |
| 👨‍💼 Admin Login | Admin access to management functions |
| 📅 Leave Management | Apply and manage employee leave |
| 📝 Leave Reason | Leave requests include employee reason |
| ✅ Leave Approval | Admin can approve or reject leave requests |
| 🏢 Departments | Manage departments and employee counts |
| 🕐 Attendance | Track employee attendance |
| 📊 Reports | Workforce and employee reports |
| 🚪 Termination | Terminate employees with termination reason |
| 🔄 Rejoining | Rejoin previously terminated employees |
| 🔔 Notifications | Display important employee activities |
| 📱 Responsive UI | Desktop and mobile friendly interface |

---

## 👥 Employee Management

The portal maintains approximately **1700 employee records** for realistic testing and demonstration.

### Employee Information

- 🆔 Employee ID
- 👤 Employee Name
- 📧 Email
- 📞 Phone Number
- 🏢 Department
- 💼 Job Role
- 📅 Joining Date
- 🚦 Employment Status

### Supported Employee Status

- 🟢 Active
- 🟡 On Leave
- 🔴 Terminated

---

## 🔄 Employee Lifecycle

```text
        👤 NEW EMPLOYEE
              │
              ▼
        🟢 ACTIVE
              │
              │ Termination
              ▼
        🔴 TERMINATED
              │
              │ Rejoin
              ▼
        🟢 ACTIVE
📅 Leave Management

Employees can submit leave requests with:
Leave Type
From Date
To Date
Reason
The leave request is stored and displayed in the Admin Leave Requests section.

Admin Actions
Admin can:

Review leave requests

View employee details

View leave reason

Approve leave requests

Reject leave requests

Dashboard and leave statistics update according to the request status.

🏢 Department Management

The portal provides department management functionality.

Admin can:
View departments
View employee count by department
Add departments
Manage department status

🕐 Attendance

The Attendance module provides employee attendance information including:

Employee ID
Employee Name
Department
Date
Check-in
Check-out
Attendance Status

Attendance Statistics

Present Today
Absent Today
On Leave

📊 Dashboard

The dashboard dynamically displays workforce information including:

Total Employees
Active Employees
Employees On Leave
Pending Leave Requests
Pending Termination Requests
Terminated Employees
New Joiners
Rejoined Employees
Departments
Department Distribution
Joining vs Termination information
Recent Employees
Alerts & Notifications

🚪 Termination Workflow
🟢 ACTIVE EMPLOYEE
        │
        ▼
   Termination
        │
        ▼
🔴 TERMINATED
        │
        ▼
      Rejoin
        │
        ▼
🟢 ACTIVE
Termination records include:
Termination Date
Termination Reason
Employee Status

👨‍💼 Admin & Employee Workflow
              LOGIN
                │
        ┌───────┴───────┐
        ▼               ▼
      ADMIN           EMPLOYEE
        │               │
        ▼               ▼
   Management       Self Service
        │               │
   ┌────┼────┐      ┌───┴────┐
   ▼    ▼    ▼      ▼        ▼
Leave Employees   My Leave  Profile
Dept  Reports     Attendance
Attendance
Termination

🎨 UI / UX Design
The application provides a modern professional interface.
Design Highlights
✨ Modern dashboard
🎨 Professional color theme
🌈 Gradient visual elements
🧩 Card-based layout
🖱️ Interactive buttons
📋 Modern employee tables
🔎 Clean search interface
📱 Responsive layout
⚡ Smooth user interactions

🏗️ Application Architecture
                    👨‍💼 ADMIN
                       │
                       ▼
              ┌─────────────────┐
              │ Employee Portal │
              └─────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   📊 Dashboard   👥 Employees     📈 Reports
                       │
             ┌─────────┼─────────┐
             │         │         │
             ▼         ▼         ▼
          ➕ Add     🔍 Search   🔄 Lifecycle
                                  │
                           ┌──────┴──────┐
                           ▼             ▼
                       🚪 Terminate   🔄 Rejoin
                           │             │
                           ▼             ▼
                     🔴 Terminated   🟢 Active

🛠️ Technology Stack

Technology
Usage
🟧 HTML5
Application structure
🔵 CSS3
Styling and responsive UI
🟨 JavaScript
Application logic and dynamic functionality
🟠 Git
Version control
⚫ GitHub
Source code management
☁️ Azure DevOps
CI/CD pipeline
📄 YAML
Pipeline configuration
🌐 Azure Static Web Apps
Application deployment
🚀 GitHub Pages
Live website hosting

📁 Project Structure
employee-management-portal/
│
├── 📄 index.html
├── 🎨 style.css
├── ⚙️ script.js
├── ☁️ azure-pipelines.yml
└── 📖 README.md

🔧 Git & DevOps Workflow
👨‍💻 Development
       │
       ▼
💻 VS Code
       │
       ▼
📦 Git
       │
       ▼
🐙 GitHub main
       │
       ▼
☁️ Azure DevOps Pipeline
       │
       ▼
📄 YAML CI/CD
       │
       ▼
🌐 Azure Static Web Apps
       │
       ▼
🚀 Live Application

Common Git Commands
git status

git add .

git commit -m "update employee management portal"

git push

🚀 CI/CD Pipeline
The project uses an Azure DevOps YAML pipeline to automate the application deployment process.
Pipeline Process
👨‍💻 Developer
      │
      ▼
💻 VS Code
      │
      ▼
📦 Git Commit
      │
      ▼
🐙 GitHub main
      │
      ▼
☁️ Azure DevOps
      │
      ▼
📄 YAML Pipeline
      │
      ▼
🚀 Azure Static Web Apps
      │
      ▼
🌐 Live Application
The pipeline is configured to run automatically when updated code is pushed to the main branch.

🌐 Deployment
The application uses:
GitHub for source code management
Azure DevOps for CI/CD
YAML for pipeline configuration
Azure Static Web Apps for deployment
GitHub Pages for live website publishing

Deployment Flow
💻 VS Code
    ↓
📦 Git
    ↓
🐙 GitHub main
    ↓
☁️ Azure DevOps Pipeline
    ↓
🚀 Azure Static Web Apps
    ↓
🌐 Live Application
The live application was verified after deployment.

📌 Project Status
Completed
[x] Employee Management Portal UI
[x] Modern Dashboard
[x] Responsive Design
[x] Approximately 1700 Employee Records
[x] Admin Login
[x] Employee Login Workflow
[x] Employee Management
[x] Add Employee
[x] Employee Search
[x] Employee Status
[x] Joining Date
[x] Leave Application
[x] Leave Reason
[x] Leave Approval / Rejection
[x] Department Management
[x] Attendance
[x] Reports
[x] Termination Workflow
[x] Rejoining Workflow
[x] Dynamic Dashboard
[x] Notifications
[x] Git Version Control
[x] GitHub Repository
[x] Azure DevOps YAML Pipeline
[x] Azure Static Web Apps Deployment
[x] GitHub Pages Deployment
[x] Live Website Verification

🎯 Learning Outcomes
Through this project, practical experience was gained in:
🌐 Frontend Development
🧱 HTML5
🎨 CSS3
⚙️ JavaScript
🔄 Employee Lifecycle Management
🐙 Git & GitHub
☁️ Azure DevOps
📄 YAML Pipelines
🔁 CI/CD
🌐 Azure Static Web Apps
📱 Responsive Web Design
🐛 Debugging & Troubleshooting
🏗️ Real-World Project Structure

💡 Real-World Scenarios
Scenario 1 — Leave Request
Employee
   ↓
Apply Leave
   ↓
Enter Leave Details
   ↓
Enter Reason
   ↓
Admin Reviews
   ↓
Approve / Reject
   ↓
Dashboard Updated

Scenario 2 — Employee Termination
Active Employee
      ↓
Termination Request
      ↓
Admin Action
      ↓
Termination Reason
      ↓
Terminated
      ↓
Rejoin
      ↓
Active Employee

Scenario 3 — Employee Rejoining
Terminated Employee
        ↓
      Rejoin
        ↓
   Active Employee

Scenario 4 — CI/CD
Code Change
    ↓
Git Commit
    ↓
GitHub main
    ↓
Azure DevOps Pipeline
    ↓
Automatic Deployment
    ↓
Azure Static Web Apps
    ↓
Live Website

🏆 Project Highlights
⭐ Modern Employee Management Portal
⭐ Approximately 1700 Employee Records
⭐ Admin & Employee Workflows
⭐ Leave Management with Reason and Approval/Rejection
⭐ Department Management
⭐ Attendance Management
⭐ Termination & Rejoining Workflow
⭐ Dynamic Dashboard
⭐ Employee Search
⭐ Git & GitHub Integration
⭐ Azure DevOps CI/CD Pipeline
⭐ YAML Pipeline Configuration
⭐ Azure Static Web Apps Deployment
⭐ GitHub Pages Deployment
⭐ Live Application

👨‍💻 Author
Mohan Sai Varma

Employee Management Portal
Frontend Development • Git • GitHub • Azure DevOps • CI/CD

⭐ If you like this project, consider giving it a star!
