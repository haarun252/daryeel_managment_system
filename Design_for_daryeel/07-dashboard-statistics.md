# Dashboard Statistics

## Superadmin
Schools: total, active, trial, suspended.
Users: students, teachers, parents.
Finance: MRR, ARR, monthly/yearly revenue, outstanding, refunds.
Product: DAU, MAU, module usage, notification volume, delivery failures, API errors.

## School Admin
Students: total, new, present, absent, late, attendance rate.
Teachers: total, active, on leave, assignments.
Classes: total, capacity warnings, unassigned students.
Fees: expected, collected, outstanding, partial, overdue.
Finance: income, expenses, net.
Operations: today's classes, exams, reports, unassigned transport.

## Teacher
My classes, students, today's classes, attendance pending, upcoming exams, marks pending, reports pending.

## Parent
Per child: attendance rate, present/absent/late, outstanding fee, upcoming classes/exams, latest published marks, unread notifications.

## Rules
Never show a vague statistic like "Attendance 95". Show "Attendance rate — 95% — Aug 1–17, 2026".

Every meaningful metric should open a filtered page.

Examples:
Absent Today → Attendance?date=today&status=absent
Outstanding Fees → Fees?status=outstanding
Pending Reports → Reports?status=pending

Use server-side aggregate queries. Do not load thousands of records into the browser only to count them.
