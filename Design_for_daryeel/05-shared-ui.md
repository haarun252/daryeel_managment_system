# Shared UI Specification

## Topbar
Sidebar toggle, breadcrumb, search, notification bell, help, profile.

## Sidebar
Desktop: 240–280px, collapsible, tooltips in icon mode, active state, badges.
Mobile: drawer, close after navigation, prioritize Dashboard and role-specific primary action.

## Dashboard cards
Every card should show:
1. Number
2. Period
3. Meaning
4. Click-through action

Example:
```text
Outstanding Fees
$1,650
August 2026
12 students
[View outstanding]
```

## Tables
Where relevant: search, filters, sort, pagination, column visibility, export, row actions.
Mobile: cards or horizontal scroll.

## Detail pages
Use tabs instead of huge pages.
Example:
Overview | Parent | Attendance | Marks | Reports | Fees | Transport

## States
Loading: skeleton/progress.
Empty: explain what is empty and next action.
Error: explain, retry, support.
Permission denied: do not expose sensitive content.

## Confirmation dialogs
Required for delete/archive/suspend, payment reversal, mark publish/lock, historical attendance correction, disabling users, critical settings.

## Search
Always permission-aware and tenant-aware.

Parent: own children only.
Teacher: assigned data only.
Admin: school data only.
Superadmin: platform data.

## Date/time
Use school's configured timezone.

## Money
Always show currency and status.

## Accessibility
Keyboard navigation, visible focus, labels, adequate contrast, no color-only status, accessible tables/dialogs.
