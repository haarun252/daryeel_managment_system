# Notification Specification

## Channels
- In-app
- WhatsApp
- Email
- SMS later if needed

## Events
Student registered/class assigned/transport assigned.
Attendance absent/late/correction.
Exam announced/marks published/result available.
Report created/released.
Fee created/due/overdue.
Payment received/partial/receipt.
Transport assigned/route changed.
School announcement/holiday/schedule change/emergency.

## Delivery states
QUEUED, SENDING, SENT, DELIVERED, FAILED, READ where provider supports it.

## Record
```text
id
school_id
recipient_user_id
student_id nullable
channel
type
title
body
status
provider_message_id
sent_at
delivered_at
read_at
failure_reason
created_at
```

## Rule
WhatsApp is a communication channel, not the source of truth. The database is the source of truth.

Transient provider failures should be retried by a background queue. Permanent failures should be surfaced to authorized admins.

Never expose another family's information in a notification.
