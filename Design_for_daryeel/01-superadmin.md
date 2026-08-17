# Superadmin Dashboard

## Role
Superadmin manages the SaaS platform, not the daily operations of individual schools.

## Sidebar
```text
Overview
Schools
Subscriptions
Platform Revenue
Users
System Analytics
Audit Logs
Notifications
Platform Settings
Support
```

## Overview
### Statistics
- Total Schools
- Active Schools
- Trial Schools
- Suspended Schools
- Total Students
- Total Teachers
- Total Parents
- Monthly Recurring Revenue

### Widgets
- New schools this month
- School growth
- Subscription distribution
- Revenue trend
- Recent registrations
- Schools requiring attention
- Recent platform activity

### Schools table
School, Admin, Students, Plan, Status, Created date, Renewal date, Actions.

## Schools
Filters: search, status, plan, registration date, renewal date.

Detail:
- School profile
- Admin
- Subscription
- Usage
- Students/Teachers/Parents counts
- Storage
- Recent activity
- Billing history

Actions: View, platform-level edit, Suspend, Activate.

## Subscriptions
Statistics:
- Active
- Trial
- Expiring soon
- Past due
- MRR
- ARR

Table:
School, Plan, Amount, Billing cycle, Status, Start date, Renewal date, Payment status.

## Platform Revenue
Statistics:
- Today
- This month
- This year
- Outstanding
- Refunds
- Net revenue

Charts:
- Revenue by month
- Revenue by plan
- Revenue by school
- Payment status

## Users
Tabs:
- School Admins
- Teachers
- Parents

Statistics: Total, Active, Invited, Suspended.

## System Analytics
- Daily/weekly/monthly active users
- School activity
- Module usage
- Attendance records
- Payments
- Messages
- WhatsApp/email delivery
- API errors
- Background job failures

## Audit Logs
Filters: User, School, Action, Module, Date, Severity.

Columns: Timestamp, Actor, School, Action, Resource, metadata, Result.

## Notifications
Tabs: All, System, Billing, Security, Delivery failures.

## Platform Settings
- Platform identity
- Subscription plans
- Email provider
- WhatsApp provider
- Security
- Feature flags
- Maintenance
- Audit configuration

## Security
If impersonation is implemented, require explicit session boundaries, visible banner, strong auditing, and restricted destructive actions.
