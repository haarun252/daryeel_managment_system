# Permissions Matrix

| Module | Superadmin | School Admin | Teacher | Parent |
|---|---|---|---|---|
| Platform Schools | MANAGE | - | - | - |
| Subscriptions | MANAGE | VIEW own | - | - |
| School Settings | platform | MANAGE own | - | - |
| Students | platform/limited | MANAGE own | OWN/VIEW | OWN CHILDREN |
| Parents | platform/limited | MANAGE own | LIMITED | SELF |
| Teachers | platform/limited | MANAGE own | SELF | ASSIGNED ONLY |
| Classes | platform | MANAGE own | OWN | CHILD'S |
| Subjects | platform | MANAGE own | ASSIGNED | CHILD'S |
| Timetable | platform | MANAGE own | OWN | CHILD'S |
| Attendance | platform audit | MANAGE own | CREATE/EDIT assigned | VIEW child |
| Exams/Marks | platform audit | MANAGE own | CREATE/EDIT assigned | VIEW published |
| Reports | platform audit | MANAGE own | CREATE assigned | VIEW released |
| Transport | platform | MANAGE own | LIMITED | VIEW child |
| Fees | platform | MANAGE own | - | VIEW/pay own |
| Payments | platform | MANAGE own | - | VIEW own |
| Income | platform | MANAGE own | - | - |
| Expenses | platform | MANAGE own | - | - |
| Staff | platform | MANAGE own | - | - |
| Notifications | platform | MANAGE own | SEND permitted | RECEIVE |
| Audit Logs | MANAGE platform | VIEW own | LIMITED own activity | - |

## Isolation
- Admin, teacher, parent must never cross school boundaries.
- Parent may access only linked children.
- Teacher may access only assigned classes/subjects/students.
- Admin may access only their school.
- Never trust tenantId, schoolId, parentId, or studentId supplied by the client as authorization.

## Sensitive data
Medical/emergency data: least privilege + audit.
Financial data: authorized school users; parent sees own relevant records.

## Audited actions
User creation/disable, student transfer, attendance correction, mark changes, mark publish/lock, fee adjustments, payment reversal, expense changes, permission changes, school suspension.
