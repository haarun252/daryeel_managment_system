# Xanaano — Multi-Tenant School Management System

Design and build a modern, professional, responsive **multi-tenant School & Kindergarten Management System** called **“Xanaano”**.

The system should be designed as a SaaS-style multi-tenant platform where multiple schools/kindergartens can use the same system while keeping their data completely separated.

## Brand & UI

* System name: **Xanaano**
* Type: Multi-Tenant School & Kindergarten Management System
* Primary colors: **Blue + White**
* Use clean shades of blue for primary buttons, navigation, active states, icons, and highlights.
* White backgrounds and clean cards.
* Use light gray only for borders, backgrounds, and secondary elements.
* Avoid AI/futuristic colors.
* Do NOT use purple, neon gradients, excessive glassmorphism, or AI-style visual effects.
* Design should feel like a professional education management SaaS product.
* Modern, clean, minimal, friendly, and easy to use.
* Fully responsive for desktop, tablet, and mobile.
* Use consistent spacing, typography, icons, buttons, cards, tables, modals, forms, and navigation.

## Multi-Tenant Architecture

Xanaano must support multiple schools/organizations.

Each school is a separate tenant.

Each tenant should have:

* School profile
* School logo
* School name
* Address
* Phone
* Email
* Academic years
* Classes
* Sections
* Teachers
* Students
* Parents
* Attendance
* Fees
* Payments
* Exams
* Results
* Announcements
* Events
* School settings

Tenant data must be isolated. An admin from School A must never see students, teachers, parents, payments, or other data belonging to School B.

The Super Admin controls the entire platform and can manage all tenants.

---

# 1. SUPER ADMIN DASHBOARD

Create a powerful platform-level dashboard for the **Super Admin**.

### Sidebar

* Dashboard
* Schools / Tenants
* School Admins
* Subscription Plans
* Subscriptions
* Payments
* Platform Users
* Reports
* Notifications
* System Settings
* Profile
* Logout

### Dashboard Overview

Show professional statistics cards:

* Total Schools
* Active Schools
* Total Students
* Total Teachers
* Total Parents
* Monthly Revenue
* Active Subscriptions
* Pending Payments

### Charts

Include:

* Schools Growth
* Student Growth
* Revenue Overview
* Subscription Statistics

### Schools Management

Super Admin can:

* Add new school
* Edit school
* View school
* Activate/deactivate school
* Delete/suspend school
* Assign school admin
* View school statistics
* Manage subscription
* View school billing
* Search and filter schools

School table columns:

* School Name
* Admin
* Students
* Teachers
* Plan
* Status
* Created Date
* Actions

### Subscription Management

Plans such as:

* Basic
* Standard
* Premium

Allow Super Admin to manage:

* Plan name
* Price
* Billing cycle
* Student limit
* Teacher limit
* Features
* Status

---

# 2. SCHOOL ADMIN DASHBOARD

The **Admin Dashboard** belongs to an individual school tenant.

The admin can only access data belonging to their own school.

### Sidebar

* Dashboard
* Students
* Teachers
* Parents
* Classes
* Subjects
* Attendance
* Fees
* Payments
* Exams
* Results
* Timetable
* Assignments
* Announcements
* Events
* Messages
* Reports
* School Settings
* Profile
* Logout

### Dashboard Cards

Show:

* Total Students
* Total Teachers
* Total Parents
* Total Classes
* Today's Attendance
* Pending Fees
* Upcoming Exams
* Upcoming Events

### Dashboard Sections

Include:

* Student Attendance Overview
* Fee Collection Overview
* Student Enrollment Chart
* Recent Payments
* Recent Students
* Upcoming Events
* Recent Announcements

### Student Management

Admin can:

* Add student
* Edit student
* View student profile
* Upload student photo
* Assign class
* Assign section
* Assign parent
* View attendance
* View fees
* View results
* View academic history
* Promote student
* Transfer student
* Archive student

Student profile should contain:

* Full name
* Student ID
* Date of birth
* Gender
* Photo
* Class
* Section
* Parent information
* Contact information
* Address
* Enrollment date
* Attendance
* Fees
* Results

### Teacher Management

Admin can:

* Add teacher
* Edit teacher
* View teacher profile
* Assign subjects
* Assign classes
* Manage teacher attendance
* View teacher schedule

### Parent Management

Admin can:

* Add parent
* Edit parent
* View parent
* Link parent to one or multiple children
* View parent communication history

### Attendance

Provide:

* Daily attendance
* Monthly attendance
* Student attendance
* Class attendance
* Teacher attendance
* Present
* Absent
* Late
* Leave

### Fees & Payments

Admin can manage:

* Fee structures
* Student fees
* Invoices
* Payments
* Outstanding balances
* Payment history
* Discounts
* Receipts

Dashboard should clearly show:

* Total collected
* Pending
* Overdue
* Recent payments

### Exams & Results

Admin can manage:

* Exams
* Subjects
* Marks
* Grades
* Results
* Report cards

Allow report cards to be generated and downloaded.

---

# 3. TEACHER DASHBOARD

Create a dedicated dashboard for teachers.

Teachers should only see classes and students assigned to them.

### Sidebar

* Dashboard
* My Classes
* My Students
* Attendance
* Assignments
* Exams
* Results
* Timetable
* Announcements
* Messages
* Profile
* Logout

### Teacher Dashboard

Show:

* My Classes
* Total Students
* Today's Classes
* Today's Attendance
* Pending Assignments
* Upcoming Exams

### Teacher Features

Teachers can:

* View assigned classes
* View students
* Mark attendance
* Edit attendance according to permissions
* Create assignments
* Upload assignment materials
* View submissions
* Enter exam marks
* View timetable
* Send announcements/messages
* View student academic performance

### Student View

Teacher can open a student profile and see:

* Student information
* Attendance
* Assignments
* Exam results
* Academic performance

---

# 4. PARENT DASHBOARD

Create a simple, friendly dashboard for parents.

Parents should only see their own children.

### Sidebar

* Dashboard
* My Children
* Attendance
* Fees
* Payments
* Results
* Assignments
* Timetable
* Announcements
* Events
* Messages
* Profile
* Logout

### Parent Dashboard

Show:

* My Children
* Today's Attendance
* Pending Fees
* Upcoming Exams
* Recent Results
* Upcoming Events
* Recent Announcements

### Child Profile

Parents can select each child and see:

* Profile
* Class
* Teacher
* Attendance
* Exam results
* Assignments
* Timetable
* Fees
* Payment history
* Announcements

### Parent Payments

Parents should be able to:

* View invoices
* View outstanding fees
* View payment history
* Download receipts
* Make online payments if payment integration is enabled

---

# AUTHENTICATION & ROLE SYSTEM

Create a secure authentication system with role-based access control.

Roles:

1. Super Admin
2. School Admin
3. Teacher
4. Parent

After login, redirect each user to the correct dashboard.

Example:

* Super Admin → Super Admin Dashboard
* Admin → School Admin Dashboard
* Teacher → Teacher Dashboard
* Parent → Parent Dashboard

Users must never access pages or data outside their permissions.

---

# SCHOOL SWITCHING

For Super Admin, provide a school/tenant selector.

Super Admin can:

* Search schools
* Open a school
* View school dashboard
* View school users
* View school statistics

School Admin should NOT have access to the tenant selector and should only operate inside their own school.

---

# NOTIFICATIONS

Create a notification system.

Notifications can include:

* New student
* Attendance alerts
* Fee reminders
* Payment confirmation
* Exam announcements
* Assignment announcements
* School announcements
* Events

Show notification icon in the top navigation with unread count.

---

# SEARCH & FILTERS

All major tables should have:

* Search
* Filters
* Sorting
* Pagination
* Export
* View
* Edit
* Delete/archive actions

Use confirmation modals before destructive actions.

---

# DESIGN SYSTEM

Use a professional blue-and-white design system.

### Colors

Primary:

* Blue

Background:

* White

Secondary background:

* Very light gray

Text:

* Dark navy/gray

Success:

* Green

Warning:

* Amber

Error:

* Red

Use blue as the main brand color throughout Xanaano.

### Components

Create reusable:

* Sidebar
* Top navbar
* Dashboard cards
* Tables
* Data tables
* Forms
* Dropdowns
* Search bars
* Filters
* Tabs
* Modals
* Confirmation dialogs
* Toast notifications
* Pagination
* Empty states
* Loading states
* Error states

---

# RESPONSIVE DESIGN

The entire Xanaano system must work perfectly on:

* Desktop
* Laptop
* Tablet
* Mobile

On mobile:

* Sidebar becomes a drawer
* Tables become horizontally scrollable or responsive cards
* Dashboard cards stack properly
* Forms become single-column
* Navigation remains easy to use

---

# UX REQUIREMENTS

Prioritize usability.

The interface should be:

* Simple
* Fast
* Clean
* Professional
* Easy for school staff to understand
* Suitable for kindergarten and school environments

Avoid unnecessary complexity.

Use clear labels and intuitive icons.

Every page should have:

* Page title
* Breadcrumb where appropriate
* Primary action button
* Search/filter area where needed
* Clean content layout

---

# IMPORTANT

Build Xanaano as a **real multi-tenant SaaS school management system**, not as a simple static dashboard.

The architecture should be prepared for:

* Multiple schools
* Multiple users
* Role-based permissions
* Tenant data isolation
* Subscription management
* Scalable database structure
* Secure authentication
* School-specific settings
* School-specific branding

The final UI should look like a polished commercial education SaaS platform with **Blue + White branding**, clean dashboards, professional tables, responsive layouts, and a consistent design system.

Do not use AI-themed visual styling or unnecessary futuristic effects.

The product name everywhere in the interface should be:

**Xanaano**
