# School Admin Dashboard

## Role
School Admin manages one school's academic, operational, financial, transport, staff, and communication data.

## Sidebar
```text
Dashboard

Students
Parents
Teachers
Classes
Subjects
Timetable
Attendance
Exams & Marks
Reports

Transport
Staff

Fees
Payments
Income
Expenses
Finance

Notifications
School Settings
```

## Dashboard
### Statistics
- Total Students
- Present Today
- Absent Today
- Late Today
- Total Teachers
- Active Classes
- Fees Collected This Month
- Outstanding Fees

### Widgets
Today's classes, students needing attention, pending reports, upcoming exams, unpaid/partial fees, bus assignments, staff count.

### Finance
Income this month, expenses this month, net this month, outstanding fees.

### Quick actions
Add Student, Add Teacher, Create Class, Record Payment, Create Fee, Review Attendance, Add Expense, Send Notification.

## Students
### List
Filters: name, class, status, gender, bus, fee status, enrollment year.

Columns: Student, Parent, Class, Attendance today, Fee status, Bus, Status, Actions.

### Detail tabs
Overview, Parent/Guardian, Enrollment, Attendance, Timetable, Exams & Marks, Reports, Fees & Payments, Transport, Medical/Emergency, Activity.

Actions: View, Edit, Transfer class, Record payment, View attendance/reports/marks, Archive.

## Parents
Statistics: Total, Active, Invited, Unverified.
Table: Parent, Phone, Email, Children, Account status, Last activity.
Detail: Profile, Children, Communication history, Fees/payments, Account status.

## Teachers
Statistics: Total, Active, On leave, Classes assigned.
Table: Teacher, Subjects, Classes, Schedule, Status, Account status.
Actions: Create, Assign class, Assign subject, Assign timetable, Invite, Disable.

## Classes
Statistics: Total classes, enrolled students, capacity warnings.
Table: Class, Teachers, Subjects, Students, Capacity, Status.
Detail tabs: Students, Teachers, Subjects, Timetable, Attendance, Marks, Reports, Fees.

## Subjects
Table: Subject, Classes, Teachers, Status.
Actions: Create, Edit, Assign to class, Assign teacher, Archive.

## Timetable
Views: Weekly, Daily, By class, By teacher.
Fields: Class, Subject, Teacher, Location, Start, End.
Detect teacher/class double-booking.

## Attendance
Statistics: Present, Absent, Late, Attendance rate.
Views: By class, student, date.
Historical corrections require reason and audit trail.

## Exams & Marks
Statistics: Upcoming exams, completed exams, missing marks, class averages.
Actions: Create, enter, review, publish, lock.
Published/locked changes require elevated permission and audit.

## Reports
Views: Student reports, teacher reports, pending review, sent, archived.
Actions: View, Review, Approve, Return, Send to parent.

## Transport
Statistics: Buses, active buses, assigned students, unassigned students.
Pages: Buses, Drivers, Routes, Assignments.
Bus detail: Number, Plate, Driver, Capacity, Route, Students.

## Staff
Categories: Driver, Security, Cleaner, Cook, Accountant, Other.
Table: Name, Role, Phone, compensation record if authorized, Status.

## Fees
Statistics: Expected, Collected, Outstanding, Partial, Overdue.
Views: By student, class, month.
Actions: Create fee, mark paid, partial payment, adjustment with permission, receipt, reminder.

## Payments
Columns: Receipt number, Student, Parent, Amount, Date, Method, Status, Recorded by.
Actions: Record, View receipt, Print/download, Reverse/refund with permission and audit.

## Income
Categories: Student Fees, Registration, Transport, Donations, Other.
Fields: Date, Amount, Category, Source, Reference, Notes.

## Expenses
Categories: Teacher Salary, Staff Salary, Bus Fuel, Food, Electricity, Water, Rent, Maintenance, Supplies, Other.
Fields: Date, Amount, Category, Payee, Reference, Notes.

## Finance
Cards: Total income, total expenses, net balance, outstanding fees.
Charts: Income vs expense, expense by category, income by source, cash flow.
Calendar: daily income, expenses, net movement.

## Notifications
Tabs: All, Attendance, Fees, Exams, Reports, Transport, System.
Admin can announce to school, class, parents, teachers, and choose configured channels.

## School Settings
School profile, logo, contact, academic year, terms, working days, hours, fees, notifications, transport, users, security.
