# Nursery & Early Education Management System — Dashboard Specification

## Purpose
Complete information architecture for every dashboard role:
- Superadmin
- School Admin
- Teacher
- Parent

This specification defines sidebar navigation, pages, statistics, tables, actions, permissions, notifications, states, and major user flows.

## Core rule
Students are records, not login users. Login roles are SUPERADMIN, SCHOOL_ADMIN, TEACHER, and PARENT.

The platform is multi-tenant:
Superadmin → Schools → Admins/Teachers/Parents/Students.

Every route, statistic, record, and action must be authorized by the backend for the authenticated user, role, and school/tenant.

## Global layout
```text
Sidebar | Topbar: Search | Notifications | Profile
        | Breadcrumb / Page title
        | Page content
```

## Main modules
Platform: Schools, Subscriptions, Platform Revenue, Users, System Analytics, Audit Logs, Notifications, Platform Settings.

School: Dashboard, Students, Parents, Teachers, Classes, Subjects, Timetable, Attendance, Exams & Marks, Reports, Transport, Staff, Fees, Payments, Income, Expenses, Finance, Notifications, School Settings.

## Supporting files
- 01-superadmin.md
- 02-school-admin.md
- 03-teacher.md
- 04-parent.md
- 05-shared-ui.md
- 06-permissions.md
- 07-dashboard-statistics.md
- 08-user-flows.md
- 09-notifications.md
- 10-data-model-ui-map.md
