# Data Model → UI Map

## Core entities
```text
School
User
Role
Student
ParentProfile
TeacherProfile
Staff
Class
Subject
Enrollment
ClassSubject
TeacherAssignment
Schedule
Attendance
Exam
ExamMark
StudentReport
Bus
Route
TransportAssignment
Fee
Payment
Income
Expense
Notification
AuditLog
Subscription
```

## Relationships

School owns school-scoped records.

Student is separate from User.

One parent may have multiple children.

Teacher connects to assigned classes and subjects.

Enrollment preserves class history:
```text
Student
  ↓
Enrollment 2025/26 → KG 1
Enrollment 2026/27 → KG 2
```

Schedule connects Class + Subject + Teacher + Time + Day + Location.

Attendance connects Student + Date/session + Class + Teacher + Status.

Exam connects academic year + term + class + subject + exam.

ExamMark connects exam + student + score + grade/comment + publication state.

StudentReport connects student + teacher + category + content + release state.

Bus/Route/TransportAssignment keep transport separate from core student data.

Fee represents money owed.
Payment represents money actually received.

Example:
```text
Fee: $50
Payment 1: $30
Payment 2: $20
Remaining: $0
```

Income represents money entering the school.
Expense represents money leaving the school.
AuditLog tracks sensitive actions.
Subscription connects School → Plan → Billing/payment.

## UI principle
A sidebar item is a UI view over one or more domain entities; do not create a database entity merely because a sidebar item exists.
