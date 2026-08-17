export type Role = 'superadmin' | 'schooladmin' | 'teacher' | 'parent'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  schoolId?: string
  phone?: string
  status?: 'Active' | 'Inactive'
  lastLogin?: string
}

export const USERS: User[] = [
  { id: 'u1', name: 'Marcus Chen', email: 'superadmin@xanaano.com', role: 'superadmin', phone: '+1 (555) 010-0001', status: 'Active', lastLogin: '2026-08-16 08:12 AM' },
  { id: 'u2', name: 'Sarah Mitchell', email: 'admin@greenvalley.edu', role: 'schooladmin', schoolId: 's1', phone: '+1 (555) 201-4400', status: 'Active', lastLogin: '2026-08-16 07:48 AM' },
  { id: 'u3', name: 'James Okonkwo', email: 'teacher@greenvalley.edu', role: 'teacher', schoolId: 's1', phone: '+1 (555) 201-3001', status: 'Active', lastLogin: '2026-08-16 07:20 AM' },
  { id: 'u4', name: 'Priya Sharma', email: 'parent@greenvalley.edu', role: 'parent', schoolId: 's1', phone: '+1 (555) 100-2001', status: 'Active', lastLogin: '2026-08-15 09:04 PM' },
]

export interface School {
  id: string
  name: string
  admin: string
  students: number
  teachers: number
  plan: 'Basic' | 'Standard' | 'Premium' | 'Trial'
  status: 'Active' | 'Inactive' | 'Suspended'
  createdDate: string
  renewalDate: string
  email: string
  phone: string
  address: string
  website?: string
  logo?: string
}

export const SCHOOLS: School[] = [
  { id: 's1', name: 'Green Valley Academy', admin: 'Sarah Mitchell', students: 842, teachers: 48, plan: 'Premium', status: 'Active', createdDate: '2023-03-14', renewalDate: '2026-09-01', email: 'info@greenvalley.edu', phone: '+1 (555) 201-4400', address: '120 Elm Street, Springfield, IL 62701', website: 'www.greenvalley.edu' },
  { id: 's2', name: 'Sunrise Kindergarten', admin: 'Rosa Martinez', students: 186, teachers: 18, plan: 'Standard', status: 'Active', createdDate: '2023-11-15', renewalDate: '2026-09-01', email: 'hello@sunrisekg.edu', phone: '+1 (555) 590-2200', address: '77 Sunrise Blvd, Miami, FL 33101', website: 'www.sunrisekg.edu' },
  { id: 's3', name: 'Bright Future School', admin: 'Lisa Tanaka', students: 428, teachers: 31, plan: 'Standard', status: 'Active', createdDate: '2024-01-22', renewalDate: '2026-09-03', email: 'info@brightfuture.edu', phone: '+1 (555) 774-3300', address: '8 Oak Ave, Austin, TX 78701', website: 'www.brightfuture.edu' },
  { id: 's4', name: 'Al-Noor Academy', admin: 'Ahmed Hassan', students: 1203, teachers: 87, plan: 'Premium', status: 'Active', createdDate: '2022-09-01', renewalDate: '2026-09-01', email: 'contact@alnoor.edu', phone: '+1 (555) 462-6600', address: '200 Lake Dr, Chicago, IL 60601', website: 'www.alnoor.edu' },
  { id: 's5', name: 'Riverside Primary School', admin: 'David Osei', students: 364, teachers: 22, plan: 'Basic', status: 'Inactive', createdDate: '2023-06-08', renewalDate: '2026-08-28', email: 'hello@riverside.edu', phone: '+1 (555) 384-9100', address: '45 River Rd, Portland, OR 97201' },
  { id: 's6', name: 'Westfield Academy', admin: 'Brian Thompson', students: 510, teachers: 35, plan: 'Premium', status: 'Active', createdDate: '2023-07-30', renewalDate: '2026-09-01', email: 'info@westfield.edu', phone: '+1 (555) 113-8800', address: '555 West Ave, Seattle, WA 98101' },
  { id: 's7', name: 'Heritage Christian School', admin: 'Grace Amara', students: 198, teachers: 16, plan: 'Basic', status: 'Suspended', createdDate: '2024-02-10', renewalDate: '2026-08-30', email: 'contact@heritage.edu', phone: '+1 (555) 667-4400', address: '30 Faith Lane, Dallas, TX 75201' },
  { id: 's8', name: 'Little Steps Kindergarten', admin: 'Hana Yusuf', students: 64, teachers: 9, plan: 'Trial', status: 'Active', createdDate: '2026-08-04', renewalDate: '2026-09-04', email: 'hello@littlesteps.edu', phone: '+1 (555) 720-8810', address: '12 Rainbow Lane, Minneapolis, MN 55401', website: 'www.littlesteps.edu' },
]

export function planPrice(plan: School['plan']) {
  if (plan === 'Trial') return 0
  return SUBSCRIPTION_PLANS.find(p => p.name === plan)?.price ?? 0
}

export const RECENT_REGISTRATIONS = [
  { id: 'rr1', school: 'Little Steps Kindergarten', admin: 'Hana Yusuf', plan: 'Trial', date: '2026-08-04' },
  { id: 'rr2', school: 'Bright Future School', admin: 'Lisa Tanaka', plan: 'Standard', date: '2024-01-22' },
  { id: 'rr3', school: 'Heritage Christian School', admin: 'Grace Amara', plan: 'Basic', date: '2024-02-10' },
]

export const SCHOOLS_REQUIRING_ATTENTION = [
  { id: 'at1', school: 'Heritage Christian School', issue: 'Subscription suspended — payment overdue', severity: 'Critical' },
  { id: 'at2', school: 'Riverside Primary School', issue: 'Renewal due Aug 28 — no payment recorded', severity: 'Warning' },
  { id: 'at3', school: 'Westfield Academy', issue: 'August platform payment pending', severity: 'Warning' },
]

export const PLATFORM_ACTIVITY = [
  { id: 'pa1', time: '09:12', actor: 'Marcus Chen', action: 'Suspended Heritage Christian School', module: 'Tenants' },
  { id: 'pa2', time: '08:47', actor: 'Ahmed Hassan', action: 'Exported report cards', module: 'Reports' },
  { id: 'pa3', time: '08:31', actor: 'Hana Yusuf', action: 'Activated trial for Little Steps', module: 'Subscriptions' },
  { id: 'pa4', time: '08:05', actor: 'James Okonkwo', action: 'Saved Grade 7A attendance', module: 'Attendance' },
  { id: 'pa5', time: '07:52', actor: 'Rosa Martinez', action: 'Recorded fee payment', module: 'Fees' },
]

export interface Student {
  id: string
  name: string
  firstName: string
  middleName?: string
  lastName: string
  studentId: string
  class: string
  section: string
  gender: 'Male' | 'Female'
  dob: string
  nationality: string
  address: string
  parent: string
  phone: string
  email: string
  enrollDate: string
  previousSchool?: string
  academicYear: string
  status: 'Active' | 'Inactive' | 'Transferred'
  attendance: number
  fees: 'Paid' | 'Pending' | 'Overdue'
  avatar?: string
}

export const STUDENTS: Student[] = [
  { id: 'st1', name: 'Ethan Williams', firstName: 'Ethan', lastName: 'Williams', studentId: 'GVA-2024-001', class: 'Grade 7', section: 'A', gender: 'Male', dob: '2012-04-12', nationality: 'United States', address: '14 Maple Drive, Springfield', parent: 'Priya Sharma', phone: '+1 (555) 100-2001', email: 'ethan.w@student.gva.edu', enrollDate: '2020-09-01', academicYear: '2025–2026', status: 'Active', attendance: 94, fees: 'Paid' },
  { id: 'st2', name: 'Aisha Johnson', firstName: 'Aisha', lastName: 'Johnson', studentId: 'GVA-2024-002', class: 'Grade 7', section: 'A', gender: 'Female', dob: '2012-07-23', nationality: 'United States', address: '88 Pine Street, Springfield', parent: 'Marcus Johnson', phone: '+1 (555) 100-2002', email: 'aisha.j@student.gva.edu', enrollDate: '2020-09-01', academicYear: '2025–2026', status: 'Active', attendance: 98, fees: 'Paid' },
  { id: 'st3', name: 'Noah Garcia', firstName: 'Noah', lastName: 'Garcia', studentId: 'GVA-2024-003', class: 'Grade 8', section: 'B', gender: 'Male', dob: '2011-11-05', nationality: 'United States', address: '201 River Lane, Springfield', parent: 'Elena Garcia', phone: '+1 (555) 100-2003', email: 'noah.g@student.gva.edu', enrollDate: '2019-09-01', academicYear: '2025–2026', status: 'Active', attendance: 82, fees: 'Pending' },
  { id: 'st4', name: 'Lily Chen', firstName: 'Lily', lastName: 'Chen', studentId: 'GVA-2024-004', class: 'Grade 6', section: 'A', gender: 'Female', dob: '2013-02-18', nationality: 'United States', address: '9 Cedar Court, Springfield', parent: 'Wei Chen', phone: '+1 (555) 100-2004', email: 'lily.c@student.gva.edu', enrollDate: '2021-09-01', academicYear: '2025–2026', status: 'Active', attendance: 100, fees: 'Paid' },
  { id: 'st5', name: 'Oliver Patel', firstName: 'Oliver', lastName: 'Patel', studentId: 'GVA-2024-005', class: 'Grade 9', section: 'C', gender: 'Male', dob: '2010-08-30', nationality: 'United States', address: '55 Oak Boulevard, Springfield', parent: 'Rajiv Patel', phone: '+1 (555) 100-2005', email: 'oliver.p@student.gva.edu', enrollDate: '2018-09-01', academicYear: '2025–2026', status: 'Active', attendance: 77, fees: 'Overdue' },
  { id: 'st6', name: 'Sofia Rodriguez', firstName: 'Sofia', lastName: 'Rodriguez', studentId: 'GVA-2024-006', class: 'Grade 7', section: 'B', gender: 'Female', dob: '2012-05-14', nationality: 'United States', address: '310 Birch Ave, Springfield', parent: 'Carmen Rodriguez', phone: '+1 (555) 100-2006', email: 'sofia.r@student.gva.edu', enrollDate: '2020-09-01', academicYear: '2025–2026', status: 'Active', attendance: 91, fees: 'Paid' },
  { id: 'st7', name: 'Liam Thompson', firstName: 'Liam', lastName: 'Thompson', studentId: 'GVA-2024-007', class: 'Grade 8', section: 'A', gender: 'Male', dob: '2011-12-22', nationality: 'United States', address: '72 Hill Street, Springfield', parent: 'Brian Thompson', phone: '+1 (555) 100-2007', email: 'liam.t@student.gva.edu', enrollDate: '2019-09-01', academicYear: '2025–2026', status: 'Active', attendance: 88, fees: 'Pending' },
  { id: 'st8', name: 'Zara Ahmed', firstName: 'Zara', lastName: 'Ahmed', studentId: 'GVA-2024-008', class: 'Grade 6', section: 'B', gender: 'Female', dob: '2013-09-07', nationality: 'United States', address: '18 Willow Way, Springfield', parent: 'Fatima Ahmed', phone: '+1 (555) 100-2008', email: 'zara.a@student.gva.edu', enrollDate: '2021-09-01', academicYear: '2025–2026', status: 'Active', attendance: 96, fees: 'Paid' },
  { id: 'st9', name: 'Mason Lee', firstName: 'Mason', lastName: 'Lee', studentId: 'GVA-2024-009', class: 'Grade 9', section: 'A', gender: 'Male', dob: '2010-03-11', nationality: 'United States', address: '14 Maple Drive, Springfield', parent: 'Priya Sharma', phone: '+1 (555) 100-2009', email: 'mason.l@student.gva.edu', enrollDate: '2018-09-01', academicYear: '2025–2026', status: 'Active', attendance: 85, fees: 'Paid' },
  { id: 'st10', name: 'Isabelle Nguyen', firstName: 'Isabelle', lastName: 'Nguyen', studentId: 'GVA-2024-010', class: 'Grade 7', section: 'C', gender: 'Female', dob: '2012-01-29', nationality: 'United States', address: '41 Garden Road, Springfield', parent: 'Minh Nguyen', phone: '+1 (555) 100-2010', email: 'isabelle.n@student.gva.edu', enrollDate: '2020-09-01', academicYear: '2025–2026', status: 'Transferred', attendance: 72, fees: 'Paid' },
]

export interface Teacher {
  id: string
  name: string
  firstName: string
  lastName: string
  teacherId: string
  subjects: string[]
  classes: string[]
  email: string
  phone: string
  gender: 'Male' | 'Female'
  dob: string
  address: string
  joinDate: string
  status: 'Active' | 'On Leave' | 'Inactive' | 'Invited'
  qualification: string
}

export const TEACHERS: Teacher[] = [
  { id: 't1', name: 'James Okonkwo', firstName: 'James', lastName: 'Okonkwo', teacherId: 'GVA-T-001', subjects: ['Mathematics', 'Physics'], classes: ['Grade 7A', 'Grade 8B'], email: 'j.okonkwo@gva.edu', phone: '+1 (555) 201-3001', gender: 'Male', dob: '1986-03-12', address: '22 Faculty Lane, Springfield', joinDate: '2021-08-15', status: 'Active', qualification: 'M.Sc Mathematics' },
  { id: 't2', name: 'Angela Morrison', firstName: 'Angela', lastName: 'Morrison', teacherId: 'GVA-T-002', subjects: ['English', 'Literature'], classes: ['Grade 6A', 'Grade 7B'], email: 'a.morrison@gva.edu', phone: '+1 (555) 201-3002', gender: 'Female', dob: '1990-09-04', address: '8 Faculty Lane, Springfield', joinDate: '2020-08-20', status: 'Active', qualification: 'B.Ed English' },
  { id: 't3', name: 'Carlos Mendez', firstName: 'Carlos', lastName: 'Mendez', teacherId: 'GVA-T-003', subjects: ['Science', 'Biology'], classes: ['Grade 8A', 'Grade 9C'], email: 'c.mendez@gva.edu', phone: '+1 (555) 201-3003', gender: 'Male', dob: '1984-11-21', address: '19 Faculty Lane, Springfield', joinDate: '2022-01-10', status: 'Active', qualification: 'M.Sc Biology' },
  { id: 't4', name: 'Fatima Al-Rashid', firstName: 'Fatima', lastName: 'Al-Rashid', teacherId: 'GVA-T-004', subjects: ['History', 'Social Studies'], classes: ['Grade 6B', 'Grade 7C'], email: 'f.alrashid@gva.edu', phone: '+1 (555) 201-3004', gender: 'Female', dob: '1988-06-18', address: '4 Faculty Lane, Springfield', joinDate: '2019-09-01', status: 'On Leave', qualification: 'B.A History' },
  { id: 't5', name: 'Kevin Park', firstName: 'Kevin', lastName: 'Park', teacherId: 'GVA-T-005', subjects: ['Computer Science', 'ICT'], classes: ['Grade 9A', 'Grade 9B'], email: 'k.park@gva.edu', phone: '+1 (555) 201-3005', gender: 'Male', dob: '1992-01-30', address: '31 Faculty Lane, Springfield', joinDate: '2023-02-14', status: 'Active', qualification: 'B.Tech Computer Science' },
  { id: 't6', name: 'Nadia Ibrahim', firstName: 'Nadia', lastName: 'Ibrahim', teacherId: 'GVA-T-006', subjects: ['Arabic', 'Islamic Studies'], classes: ['Grade 6A'], email: 'n.ibrahim@gva.edu', phone: '+1 (555) 201-3006', gender: 'Female', dob: '1994-07-09', address: '16 Faculty Lane, Springfield', joinDate: '—', status: 'Invited', qualification: 'B.A Arabic Studies' },
]

export interface Parent {
  id: string
  name: string
  relationship: string
  phone: string
  email: string
  address: string
  occupation: string
  children: string[]
  status: 'Active' | 'Invited' | 'Unverified'
  lastActivity?: string
}

export const PARENTS: Parent[] = [
  { id: 'pr1', name: 'Priya Sharma', relationship: 'Mother', phone: '+1 (555) 100-2001', email: 'priya.sharma@email.com', address: '14 Maple Drive, Springfield', occupation: 'Software Engineer', children: ['Ethan Williams', 'Mason Lee'], status: 'Active', lastActivity: '2026-08-16 09:14' },
  { id: 'pr2', name: 'Marcus Johnson', relationship: 'Father', phone: '+1 (555) 100-2002', email: 'marcus.j@email.com', address: '88 Pine Street, Springfield', occupation: 'Physician', children: ['Aisha Johnson'], status: 'Active', lastActivity: '2026-08-15 18:42' },
  { id: 'pr3', name: 'Elena Garcia', relationship: 'Mother', phone: '+1 (555) 100-2003', email: 'elena.g@email.com', address: '201 River Lane, Springfield', occupation: 'Accountant', children: ['Noah Garcia'], status: 'Active', lastActivity: '2026-08-14 12:05' },
  { id: 'pr4', name: 'Wei Chen', relationship: 'Father', phone: '+1 (555) 100-2004', email: 'wei.chen@email.com', address: '9 Cedar Court, Springfield', occupation: 'Architect', children: ['Lily Chen'], status: 'Active', lastActivity: '2026-08-13 20:31' },
  { id: 'pr5', name: 'Rajiv Patel', relationship: 'Father', phone: '+1 (555) 100-2005', email: 'rajiv.p@email.com', address: '55 Oak Boulevard, Springfield', occupation: 'Business Owner', children: ['Oliver Patel'], status: 'Active', lastActivity: '2026-08-12 10:15' },
  { id: 'pr6', name: 'Carmen Rodriguez', relationship: 'Mother', phone: '+1 (555) 100-2006', email: 'carmen.r@email.com', address: '310 Birch Ave, Springfield', occupation: 'Teacher', children: ['Sofia Rodriguez'], status: 'Active', lastActivity: '2026-08-11 07:58' },
  { id: 'pr7', name: 'Amara Diallo', relationship: 'Mother', phone: '+1 (555) 720-8811', email: 'a.diallo@email.com', address: '12 Rainbow Lane, Minneapolis', occupation: 'Nurse', children: [], status: 'Invited' },
  { id: 'pr8', name: 'Omar Farouk', relationship: 'Guardian', phone: '+1 (555) 100-2009', email: 'o.farouk@email.com', address: '30 School Road, Springfield', occupation: 'Engineer', children: ['Noah Garcia'], status: 'Unverified', lastActivity: '—' },
]

export interface SchoolClass {
  id: string
  name: string
  grade: string
  section: string
  academicYear: string
  teacher: string
  room: string
  capacity: number
  students: number
}

export const CLASSES: SchoolClass[] = [
  { id: 'c1', name: 'Grade 6A', grade: 'Grade 6', section: 'A', academicYear: '2025–2026', teacher: 'Angela Morrison', room: '101', capacity: 32, students: 28 },
  { id: 'c2', name: 'Grade 6B', grade: 'Grade 6', section: 'B', academicYear: '2025–2026', teacher: 'Fatima Al-Rashid', room: '102', capacity: 32, students: 30 },
  { id: 'c3', name: 'Grade 7A', grade: 'Grade 7', section: 'A', academicYear: '2025–2026', teacher: 'James Okonkwo', room: '201', capacity: 34, students: 32 },
  { id: 'c4', name: 'Grade 7B', grade: 'Grade 7', section: 'B', academicYear: '2025–2026', teacher: 'Angela Morrison', room: '202', capacity: 34, students: 31 },
  { id: 'c5', name: 'Grade 8A', grade: 'Grade 8', section: 'A', academicYear: '2025–2026', teacher: 'Carlos Mendez', room: '301', capacity: 34, students: 29 },
  { id: 'c6', name: 'Grade 8B', grade: 'Grade 8', section: 'B', academicYear: '2025–2026', teacher: 'James Okonkwo', room: '105', capacity: 34, students: 29 },
  { id: 'c7', name: 'Grade 9A', grade: 'Grade 9', section: 'A', academicYear: '2025–2026', teacher: 'Kevin Park', room: '401', capacity: 36, students: 33 },
  { id: 'c8', name: 'Grade 9C', grade: 'Grade 9', section: 'C', academicYear: '2025–2026', teacher: 'Carlos Mendez', room: '403', capacity: 36, students: 27 },
]

export const SECTIONS = [
  { id: 'sec1', name: 'A', classes: 4, students: 124, description: 'Core academic stream' },
  { id: 'sec2', name: 'B', classes: 4, students: 118, description: 'Core academic stream' },
  { id: 'sec3', name: 'C', classes: 3, students: 96, description: 'STEM-focused stream' },
]

export const SUBJECTS = [
  { id: 'sub1', name: 'Mathematics', code: 'MATH', teacher: 'James Okonkwo', classes: 4, type: 'Core', status: 'Active' },
  { id: 'sub2', name: 'English', code: 'ENG', teacher: 'Angela Morrison', classes: 4, type: 'Core', status: 'Active' },
  { id: 'sub3', name: 'Science', code: 'SCI', teacher: 'Carlos Mendez', classes: 3, type: 'Core', status: 'Active' },
  { id: 'sub4', name: 'History', code: 'HIST', teacher: 'Fatima Al-Rashid', classes: 3, type: 'Core', status: 'Active' },
  { id: 'sub5', name: 'Computer Science', code: 'CS', teacher: 'Kevin Park', classes: 2, type: 'Elective', status: 'Active' },
  { id: 'sub6', name: 'Physics', code: 'PHY', teacher: 'James Okonkwo', classes: 2, type: 'Elective', status: 'Active' },
  { id: 'sub7', name: 'Literature', code: 'LIT', teacher: 'Angela Morrison', classes: 2, type: 'Elective', status: 'Active' },
  { id: 'sub8', name: 'French', code: 'FR', teacher: '—', classes: 1, type: 'Elective', status: 'Archived' },
]

export interface AttendanceRecord {
  studentId: string
  studentName: string
  class: string
  date: string
  status: 'Present' | 'Absent' | 'Late' | 'Leave'
}

export const ATTENDANCE: AttendanceRecord[] = [
  { studentId: 'st1', studentName: 'Ethan Williams', class: 'Grade 7A', date: '2026-08-16', status: 'Present' },
  { studentId: 'st2', studentName: 'Aisha Johnson', class: 'Grade 7A', date: '2026-08-16', status: 'Present' },
  { studentId: 'st3', studentName: 'Noah Garcia', class: 'Grade 8B', date: '2026-08-16', status: 'Absent' },
  { studentId: 'st4', studentName: 'Lily Chen', class: 'Grade 6A', date: '2026-08-16', status: 'Present' },
  { studentId: 'st5', studentName: 'Oliver Patel', class: 'Grade 9C', date: '2026-08-16', status: 'Late' },
  { studentId: 'st6', studentName: 'Sofia Rodriguez', class: 'Grade 7B', date: '2026-08-16', status: 'Present' },
  { studentId: 'st7', studentName: 'Liam Thompson', class: 'Grade 8A', date: '2026-08-16', status: 'Leave' },
  { studentId: 'st8', studentName: 'Zara Ahmed', class: 'Grade 6B', date: '2026-08-16', status: 'Present' },
  { studentId: 'st9', studentName: 'Mason Lee', class: 'Grade 9A', date: '2026-08-16', status: 'Present' },
  { studentId: 'st10', studentName: 'Isabelle Nguyen', class: 'Grade 7C', date: '2026-08-16', status: 'Absent' },
]

export interface FeeRecord {
  id: string
  studentName: string
  class: string
  feeType: string
  amount: number
  dueDate: string
  paidDate?: string
  status: 'Paid' | 'Pending' | 'Overdue' | 'Partial'
  invoiceId: string
  discount?: number
  paid?: number
}

export const FEES: FeeRecord[] = [
  { id: 'f1', studentName: 'Ethan Williams', class: 'Grade 7A', feeType: 'Tuition', amount: 1200, dueDate: '2026-08-01', paidDate: '2026-07-28', status: 'Paid', invoiceId: 'INV-2026-001', discount: 0, paid: 1200 },
  { id: 'f2', studentName: 'Aisha Johnson', class: 'Grade 7A', feeType: 'Tuition', amount: 1200, dueDate: '2026-08-01', paidDate: '2026-08-05', status: 'Paid', invoiceId: 'INV-2026-002', paid: 1200 },
  { id: 'f3', studentName: 'Noah Garcia', class: 'Grade 8B', feeType: 'Tuition', amount: 1350, dueDate: '2026-08-01', status: 'Partial', invoiceId: 'INV-2026-003', paid: 800 },
  { id: 'f4', studentName: 'Lily Chen', class: 'Grade 6A', feeType: 'Tuition', amount: 1100, dueDate: '2026-08-01', paidDate: '2026-08-01', status: 'Paid', invoiceId: 'INV-2026-004', paid: 1100 },
  { id: 'f5', studentName: 'Oliver Patel', class: 'Grade 9C', feeType: 'Tuition', amount: 1400, dueDate: '2026-07-01', status: 'Partial', invoiceId: 'INV-2026-005', paid: 600 },
  { id: 'f6', studentName: 'Sofia Rodriguez', class: 'Grade 7B', feeType: 'Activities', amount: 250, dueDate: '2026-08-10', paidDate: '2026-08-09', status: 'Paid', invoiceId: 'INV-2026-006', paid: 250 },
  { id: 'f7', studentName: 'Liam Thompson', class: 'Grade 8A', feeType: 'Tuition', amount: 1350, dueDate: '2026-08-01', status: 'Pending', invoiceId: 'INV-2026-007', paid: 0 },
  { id: 'f8', studentName: 'Mason Lee', class: 'Grade 9A', feeType: 'Lab Fee', amount: 200, dueDate: '2026-08-15', paidDate: '2026-08-14', status: 'Paid', invoiceId: 'INV-2026-008', paid: 200 },
  { id: 'f9', studentName: 'Zara Ahmed', class: 'Grade 6B', feeType: 'Tuition', amount: 1100, dueDate: '2026-08-01', status: 'Overdue', invoiceId: 'INV-2026-009', paid: 0 },
]

export const PAYMENTS = [
  { id: 'pay1', studentName: 'Ethan Williams', invoiceId: 'INV-2026-001', amount: 1200, method: 'Bank', date: '2026-07-28', reference: 'TXN-88421', receipt: 'RCT-2026-0041', status: 'Completed', recordedBy: 'Sarah Mitchell' },
  { id: 'pay2', studentName: 'Aisha Johnson', invoiceId: 'INV-2026-002', amount: 1200, method: 'Card', date: '2026-08-05', reference: 'TXN-88490', receipt: 'RCT-2026-0042', status: 'Completed', recordedBy: 'Tom Ochieng' },
  { id: 'pay3', studentName: 'Lily Chen', invoiceId: 'INV-2026-004', amount: 1100, method: 'Mobile Money', date: '2026-08-01', reference: 'TXN-88512', receipt: 'RCT-2026-0043', status: 'Completed', recordedBy: 'Tom Ochieng' },
  { id: 'pay4', studentName: 'Sofia Rodriguez', invoiceId: 'INV-2026-006', amount: 250, method: 'Cash', date: '2026-08-09', reference: 'TXN-88601', receipt: 'RCT-2026-0044', status: 'Completed', recordedBy: 'Sarah Mitchell' },
  { id: 'pay5', studentName: 'Mason Lee', invoiceId: 'INV-2026-008', amount: 200, method: 'Bank', date: '2026-08-14', reference: 'TXN-88688', receipt: 'RCT-2026-0045', status: 'Completed', recordedBy: 'Tom Ochieng' },
  { id: 'pay6', studentName: 'Noah Garcia', invoiceId: 'INV-2026-003', amount: 800, method: 'Mobile Money', date: '2026-08-10', reference: 'TXN-88640', receipt: 'RCT-2026-0046', status: 'Partial', recordedBy: 'Sarah Mitchell' },
]

export const EXPENSES = [
  { id: 'ex1', title: 'Classroom supplies', category: 'Supplies', amount: 840, date: '2026-08-04', paidTo: 'OfficeMart', reference: 'EXP-2026-031', notes: 'Term 1 stationery', status: 'Paid' },
  { id: 'ex2', title: 'Science lab equipment', category: 'Supplies', amount: 2650, date: '2026-08-08', paidTo: 'EduLab Inc', reference: 'EXP-2026-032', notes: 'Microscope sets', status: 'Paid' },
  { id: 'ex3', title: 'Sports Day catering', category: 'Food', amount: 1200, date: '2026-08-20', paidTo: 'Valley Catering', reference: 'EXP-2026-033', status: 'Pending' },
  { id: 'ex4', title: 'Staff training workshop', category: 'Other', amount: 980, date: '2026-08-12', paidTo: 'TeachWell', reference: 'EXP-2026-034', notes: 'Grading policy training', status: 'Paid' },
  { id: 'ex5', title: 'Building maintenance', category: 'Maintenance', amount: 3400, date: '2026-08-02', paidTo: 'Springfield Facilities', reference: 'EXP-2026-035', notes: 'Roof repair — Block B', status: 'Paid' },
  { id: 'ex6', title: 'Bus diesel refill', category: 'Bus Fuel', amount: 780, date: '2026-08-11', paidTo: 'GasCo Depot', reference: 'EXP-2026-036', notes: '3 buses', status: 'Paid' },
  { id: 'ex7', title: 'August electricity bill', category: 'Electricity', amount: 1120, date: '2026-08-07', paidTo: 'City Power', reference: 'EXP-2026-037', status: 'Paid' },
  { id: 'ex8', title: 'Teacher salary — August', category: 'Teacher Salary', amount: 8200, date: '2026-08-01', paidTo: 'Staff Payroll', reference: 'EXP-2026-038', notes: '48 teachers', status: 'Paid' },
  { id: 'ex9', title: 'Kitchen supplies', category: 'Food', amount: 640, date: '2026-08-13', paidTo: 'FreshMart', reference: 'EXP-2026-039', status: 'Paid' },
]

export const ASSIGNMENTS = [
  { id: 'as1', title: 'Algebra worksheet — Linear equations', class: 'Grade 7A', subject: 'Mathematics', teacher: 'James Okonkwo', dueDate: '2026-08-20', status: 'Pending', submitted: 18, total: 32 },
  { id: 'as2', title: 'Essay: A day in my community', class: 'Grade 6A', subject: 'English', teacher: 'Angela Morrison', dueDate: '2026-08-18', status: 'Submitted', submitted: 28, total: 28 },
  { id: 'as3', title: 'Lab report: Plant cells', class: 'Grade 8A', subject: 'Science', teacher: 'Carlos Mendez', dueDate: '2026-08-15', status: 'Late', submitted: 21, total: 29 },
  { id: 'as4', title: 'Python basics quiz', class: 'Grade 9A', subject: 'Computer Science', teacher: 'Kevin Park', dueDate: '2026-08-12', status: 'Graded', submitted: 33, total: 33 },
  { id: 'as5', title: 'World War II timeline', class: 'Grade 6B', subject: 'History', teacher: 'Fatima Al-Rashid', dueDate: '2026-08-22', status: 'Pending', submitted: 10, total: 30 },
]

export const RESULTS = [
  { id: 'r1', studentName: 'Ethan Williams', studentId: 'GVA-2024-001', class: 'Grade 7A', subject: 'Mathematics', marks: 88, grade: 'A', remarks: 'Strong problem solving' },
  { id: 'r2', studentName: 'Ethan Williams', studentId: 'GVA-2024-001', class: 'Grade 7A', subject: 'English', marks: 76, grade: 'B+', remarks: 'Good writing structure' },
  { id: 'r3', studentName: 'Aisha Johnson', studentId: 'GVA-2024-002', class: 'Grade 7A', subject: 'Mathematics', marks: 95, grade: 'A+', remarks: 'Outstanding' },
  { id: 'r4', studentName: 'Noah Garcia', studentId: 'GVA-2024-003', class: 'Grade 8B', subject: 'Science', marks: 68, grade: 'C+', remarks: 'Needs more revision' },
  { id: 'r5', studentName: 'Lily Chen', studentId: 'GVA-2024-004', class: 'Grade 6A', subject: 'English', marks: 91, grade: 'A+', remarks: 'Excellent vocabulary' },
  { id: 'r6', studentName: 'Mason Lee', studentId: 'GVA-2024-009', class: 'Grade 9A', subject: 'Computer Science', marks: 84, grade: 'A', remarks: 'Solid practical work' },
]

export const EXAMS = [
  { id: 'ex1', name: 'Mid-Term Mathematics', class: 'Grade 7', academicYear: '2025–2026', date: '2026-08-25', endDate: '2026-08-25', time: '09:00 AM', duration: '2h', status: 'Upcoming' },
  { id: 'ex2', name: 'Mid-Term English', class: 'Grade 7', academicYear: '2025–2026', date: '2026-08-26', endDate: '2026-08-26', time: '09:00 AM', duration: '2h', status: 'Upcoming' },
  { id: 'ex3', name: 'Mid-Term Science', class: 'Grade 8', academicYear: '2025–2026', date: '2026-08-27', endDate: '2026-08-27', time: '09:00 AM', duration: '2h', status: 'Upcoming' },
  { id: 'ex4', name: 'Final Mathematics', class: 'Grade 9', academicYear: '2025–2026', date: '2026-07-10', endDate: '2026-07-10', time: '09:00 AM', duration: '3h', status: 'Completed' },
  { id: 'ex5', name: 'Term 1 Assessment', class: 'All Grades', academicYear: '2025–2026', date: '2026-09-08', endDate: '2026-09-12', time: '09:00 AM', duration: '2h', status: 'Scheduled' },
]

export interface Announcement {
  id: string
  title: string
  description: string
  date: string
  author: string
  type: string
  audience: string
  priority: 'Normal' | 'High' | 'Urgent'
  status: 'Published' | 'Scheduled' | 'Draft'
  urgent: boolean
}

export const ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: 'Annual Sports Day 2026', description: 'Students should wear house colors. Parents are welcome from 8:00 AM.', date: '2026-08-15', author: 'Admin', type: 'Event', audience: 'All', priority: 'High', status: 'Published', urgent: false },
  { id: 'a2', title: 'Mid-Term Exam Schedule Released', description: 'Please review the timetable in the Exams module. Calculators are allowed for Mathematics.', date: '2026-08-12', author: 'Academics', type: 'Exam', audience: 'Students', priority: 'Urgent', status: 'Published', urgent: true },
  { id: 'a3', title: 'Parent-Teacher Meeting — Aug 22', description: 'Meetings will be held in classrooms from 2:00 PM to 5:00 PM.', date: '2026-08-10', author: 'Admin', type: 'Meeting', audience: 'Parents', priority: 'High', status: 'Published', urgent: false },
  { id: 'a4', title: 'Library Book Submission Deadline', description: 'All borrowed books must be returned by August 29.', date: '2026-08-08', author: 'Library', type: 'Reminder', audience: 'Students', priority: 'Normal', status: 'Published', urgent: false },
  { id: 'a5', title: 'Staff briefing — new grading policy', description: 'Draft notice for teachers only. Do not publish yet.', date: '2026-08-18', author: 'Admin', type: 'Staff', audience: 'Teachers', priority: 'Normal', status: 'Draft', urgent: false },
]

export const EVENTS = [
  { id: 'e1', title: 'Annual Sports Day', date: '2026-08-22', time: '08:00 AM', location: 'Main Ground', type: 'Sports Day' },
  { id: 'e2', title: 'Science Fair', date: '2026-09-05', time: '10:00 AM', location: 'Auditorium', type: 'School Event' },
  { id: 'e3', title: 'Parent-Teacher Meeting', date: '2026-08-22', time: '02:00 PM', location: 'Classrooms', type: 'Parent Meeting' },
  { id: 'e4', title: 'Grade 9 Field Trip', date: '2026-09-12', time: '07:30 AM', location: 'City Museum', type: 'School Event' },
  { id: 'e5', title: 'Independence Holiday', date: '2026-08-17', time: 'All day', location: 'Campus closed', type: 'Holiday' },
  { id: 'e6', title: 'Staff Meeting', date: '2026-08-19', time: '03:30 PM', location: 'Conference Room', type: 'Staff Meeting' },
  { id: 'e7', title: 'Mid-Term Exams Begin', date: '2026-08-25', time: '09:00 AM', location: 'Exam Halls', type: 'Exam' },
]

export const MESSAGES = [
  { id: 'm1', from: 'Sarah Mitchell', to: 'James Okonkwo', subject: 'Grade 7A coverage on Friday', preview: 'Could you cover the extra period after assembly?', date: '2026-08-16 09:14', unread: true },
  { id: 'm2', from: 'Priya Sharma', to: 'James Okonkwo', subject: 'Ethan — homework clarification', preview: 'Is the algebra worksheet due Wednesday or Thursday?', date: '2026-08-15 18:42', unread: true },
  { id: 'm3', from: 'Angela Morrison', to: 'Sarah Mitchell', subject: 'Library booking', preview: 'Requesting the library for Grade 6A on Aug 21.', date: '2026-08-15 11:05', unread: false },
  { id: 'm4', from: 'Accounts', to: 'Priya Sharma', subject: 'Fee receipt INV-2026-001', preview: 'Your payment has been recorded. Receipt attached.', date: '2026-07-28 16:20', unread: false },
]

export const NOTIFICATIONS = [
  { id: 'n1', category: 'Attendance', title: 'Noah Garcia marked absent', body: 'Grade 8B — August 16, 2026', time: '08:42 AM', read: false },
  { id: 'n2', category: 'Fees', title: 'Overdue fee reminder', body: 'Oliver Patel — Tuition $1,400 overdue', time: '08:10 AM', read: false },
  { id: 'n3', category: 'Exams', title: 'Mid-term timetable published', body: 'Mathematics starts August 25 at 09:00 AM', time: 'Yesterday', read: false },
  { id: 'n4', category: 'Assignments', title: 'New assignment posted', body: 'Algebra worksheet for Grade 7A', time: 'Yesterday', read: true },
  { id: 'n5', category: 'Announcements', title: 'Sports Day reminder', body: 'Annual Sports Day is this Saturday', time: '2 days ago', read: true },
  { id: 'n6', category: 'System', title: 'Backup completed', body: 'Nightly school data backup finished successfully', time: '2 days ago', read: true },
]

export const PLATFORM_NOTIFICATIONS = [
  { id: 'pn1', category: 'System', title: 'Scheduled maintenance — Aug 22, 02:00–04:00 UTC', body: 'Platform will be briefly unavailable during the window.', time: '08:30 AM', read: false },
  { id: 'pn2', category: 'Billing', title: 'Westfield Academy payment pending', body: 'Premium subscription $499 due since Aug 1.', time: 'Yesterday', read: false },
  { id: 'pn3', category: 'Security', title: 'Suspicious login attempt blocked', body: '203.0.113.40 — admin@riverside.edu', time: 'Yesterday', read: false },
  { id: 'pn4', category: 'Delivery', title: 'WhatsApp delivery failures — Riverside', body: '18 messages failed in the last hour.', time: '2 days ago', read: true },
  { id: 'pn5', category: 'Billing', title: 'Heritage Christian School subscription suspended', body: 'Payment overdue — school suspended on Aug 6.', time: '2 days ago', read: true },
  { id: 'pn6', category: 'System', title: 'Nightly backup completed', body: 'All tenant data backed up successfully.', time: '2 days ago', read: true },
]

export interface TeacherReport {
  id: string
  studentName: string
  className: string
  category: 'Academic' | 'Behaviour' | 'Attendance' | 'Achievement' | 'Concern' | 'General'
  report: string
  date: string
  priority: 'Normal' | 'High' | 'Urgent'
  recipient: 'Parent' | 'Admin' | 'Parent & Admin'
  status: 'Draft' | 'Submitted'
}

export const TEACHER_REPORTS: TeacherReport[] = [
  { id: 'tr1', studentName: 'Ethan Williams', className: 'Grade 7A', category: 'Academic', report: 'Strong performance in algebra; needs more practice with word problems.', date: '2026-08-15', priority: 'Normal', recipient: 'Parent', status: 'Submitted' },
  { id: 'tr2', studentName: 'Aisha Johnson', className: 'Grade 7A', category: 'Achievement', report: 'Top of class in the latest Mathematics assessment.', date: '2026-08-14', priority: 'High', recipient: 'Parent', status: 'Submitted' },
  { id: 'tr3', studentName: 'Noah Garcia', className: 'Grade 8B', category: 'Behaviour', report: 'Improved focus in class; encourage continued effort.', date: '2026-08-16', priority: 'Normal', recipient: 'Admin', status: 'Draft' },
  { id: 'tr4', studentName: 'Ethan Williams', className: 'Grade 7A', category: 'Concern', report: 'Attendance gaps in Physics affecting progress.', date: '2026-08-13', priority: 'Urgent', recipient: 'Parent & Admin', status: 'Submitted' },
  { id: 'tr5', studentName: 'Aisha Johnson', className: 'Grade 7A', category: 'General', report: 'Positive participation in group activities this week.', date: '2026-08-12', priority: 'Normal', recipient: 'Parent', status: 'Submitted' },
]

export const TEACHER_NOTIFICATIONS = [
  { id: 'tn1', category: 'Admin', title: 'Staff meeting moved to 3:30 PM', body: 'The Friday briefing has been rescheduled to the conference room.', time: '09:12 AM', read: false },
  { id: 'tn2', category: 'Schedule', title: 'Room change — Grade 7A Mathematics', body: 'Monday 08:00 lesson now in Rm 201.', time: '08:40 AM', read: false },
  { id: 'tn3', category: 'Announcements', title: 'Sports Day reminder', body: 'House colors required this Saturday. Parents welcome from 8:00 AM.', time: 'Yesterday', read: false },
  { id: 'tn4', category: 'Reports', title: 'Report feedback from admin', body: 'Mid-term report — Grade 7A returned for revision.', time: 'Yesterday', read: true },
  { id: 'tn5', category: 'Exams', title: 'Mid-term timetable published', body: 'Mathematics starts August 25 at 09:00 AM.', time: '2 days ago', read: true },
  { id: 'tn6', category: 'Admin', title: 'Grading policy update', body: 'New grading policy takes effect Term 1.', time: '3 days ago', read: true },
]

export const AUDIT_LOGS = [
  { id: 'l1', user: 'Sarah Mitchell', school: 'Green Valley Academy', action: 'Student created', module: 'Students', resource: 'Student #GVA-2026-012', severity: 'Info', date: '2026-08-16 07:51', ip: '192.168.1.14', status: 'Success' },
  { id: 'l2', user: 'James Okonkwo', school: 'Green Valley Academy', action: 'Attendance saved', module: 'Attendance', resource: 'Grade 7A — 2026-08-16', severity: 'Info', date: '2026-08-16 08:05', ip: '192.168.1.22', status: 'Success' },
  { id: 'l3', user: 'Sarah Mitchell', school: 'Green Valley Academy', action: 'Payment recorded', module: 'Fees', resource: 'INV-2026-002', severity: 'Info', date: '2026-08-14 16:18', ip: '192.168.1.14', status: 'Success' },
  { id: 'l4', user: 'Marcus Chen', school: 'Platform', action: 'School created', module: 'Tenants', resource: 'Little Steps Kindergarten', severity: 'Info', date: '2026-08-12 11:02', ip: '10.0.0.8', status: 'Success' },
  { id: 'l5', user: 'Sarah Mitchell', school: 'Green Valley Academy', action: 'Teacher updated', module: 'Teachers', resource: 'Teacher #GVA-T-003', severity: 'Info', date: '2026-08-11 09:44', ip: '192.168.1.14', status: 'Success' },
  { id: 'l6', user: 'Accounts Bot', school: 'Platform', action: 'Fee deleted', module: 'Fees', resource: 'INV-2026-009', severity: 'Warning', date: '2026-08-09 13:21', ip: '10.0.0.8', status: 'Warning' },
  { id: 'l7', user: 'Marcus Chen', school: 'Platform', action: 'Plan upgraded', module: 'Subscriptions', resource: 'Westfield Academy → Premium', severity: 'Info', date: '2026-08-08 10:16', ip: '10.0.0.8', status: 'Success' },
  { id: 'l8', user: 'Unknown', school: '—', action: 'Failed login attempt', module: 'Security', resource: 'admin@riverside.edu', severity: 'Critical', date: '2026-08-07 22:03', ip: '203.0.113.40', status: 'Failed' },
  { id: 'l9', user: 'Marcus Chen', school: 'Platform', action: 'School suspended', module: 'Tenants', resource: 'Heritage Christian School', severity: 'Warning', date: '2026-08-06 14:22', ip: '10.0.0.8', status: 'Success' },
]

export const SCHOOL_ADMINS = [
  { id: 'sa1', name: 'Sarah Mitchell', school: 'Green Valley Academy', email: 'admin@greenvalley.edu', phone: '+1 (555) 201-4400', status: 'Active', lastLogin: '2026-08-16 07:48' },
  { id: 'sa2', name: 'Rosa Martinez', school: 'Sunrise Kindergarten', email: 'admin@sunrisekg.edu', phone: '+1 (555) 590-2200', status: 'Active', lastLogin: '2026-08-15 18:11' },
  { id: 'sa3', name: 'Lisa Tanaka', school: 'Bright Future School', email: 'admin@brightfuture.edu', phone: '+1 (555) 774-3300', status: 'Active', lastLogin: '2026-08-16 06:55' },
  { id: 'sa4', name: 'Ahmed Hassan', school: 'Al-Noor Academy', email: 'admin@alnoor.edu', phone: '+1 (555) 462-6600', status: 'Active', lastLogin: '2026-08-16 08:02' },
  { id: 'sa5', name: 'David Osei', school: 'Riverside Primary School', email: 'admin@riverside.edu', phone: '+1 (555) 384-9100', status: 'Suspended', lastLogin: '2026-07-02 14:20' },
  { id: 'sa6', name: 'Hana Yusuf', school: 'Little Steps Kindergarten', email: 'admin@littlesteps.edu', phone: '+1 (555) 720-8810', status: 'Invited', lastLogin: '—' },
]

export const PLATFORM_USERS = [
  { id: 'pu1', name: 'Marcus Chen', email: 'superadmin@xanaano.com', role: 'Super Admin', school: 'Platform', status: 'Active', lastLogin: '2026-08-16 08:12' },
  { id: 'pu2', name: 'Nadia Brooks', email: 'support@xanaano.com', role: 'Support', school: 'Platform', status: 'Active', lastLogin: '2026-08-16 07:40' },
  { id: 'pu3', name: 'Sarah Mitchell', email: 'admin@greenvalley.edu', role: 'School Admin', school: 'Green Valley Academy', status: 'Active', lastLogin: '2026-08-16 07:48' },
  { id: 'pu4', name: 'James Okonkwo', email: 'teacher@greenvalley.edu', role: 'Teacher', school: 'Green Valley Academy', status: 'Active', lastLogin: '2026-08-16 07:20' },
  { id: 'pu5', name: 'Priya Sharma', email: 'parent@greenvalley.edu', role: 'Parent', school: 'Green Valley Academy', status: 'Active', lastLogin: '2026-08-15 21:04' },
]

export const PLATFORM_PAYMENTS = [
  { id: 'pp1', school: 'Green Valley Academy', plan: 'Premium', amount: 499, date: '2026-08-01', method: 'Card', status: 'Paid' },
  { id: 'pp2', school: 'Al-Noor Academy', plan: 'Premium', amount: 499, date: '2026-08-01', method: 'Bank', status: 'Paid' },
  { id: 'pp3', school: 'Sunrise Kindergarten', plan: 'Standard', amount: 249, date: '2026-08-01', method: 'Card', status: 'Paid' },
  { id: 'pp4', school: 'Bright Future School', plan: 'Standard', amount: 249, date: '2026-08-03', method: 'Bank', status: 'Paid' },
  { id: 'pp5', school: 'Westfield Academy', plan: 'Premium', amount: 499, date: '2026-08-01', method: 'Card', status: 'Pending' },
  { id: 'pp6', school: 'Heritage Christian School', plan: 'Basic', amount: 99, date: '2026-07-01', method: 'Card', status: 'Failed' },
]

export const SUPPORT_TICKETS = [
  { id: 'tk1', school: 'Green Valley Academy', subject: 'Unable to export report cards', priority: 'High', status: 'Open', date: '2026-08-16' },
  { id: 'tk2', school: 'Sunrise Kindergarten', subject: 'Add extra kindergarten class section', priority: 'Normal', status: 'In Progress', date: '2026-08-14' },
  { id: 'tk3', school: 'Al-Noor Academy', subject: 'Billing invoice mismatch', priority: 'Urgent', status: 'Open', date: '2026-08-13' },
  { id: 'tk4', school: 'Bright Future School', subject: 'Parent portal login help', priority: 'Low', status: 'Resolved', date: '2026-08-10' },
]

export const ROLES = [
  { id: 'rl1', name: 'Super Admin', users: 2, description: 'Full platform access across all tenants' },
  { id: 'rl2', name: 'School Admin', users: 7, description: 'Manage a single school tenant' },
  { id: 'rl3', name: 'Teacher', users: 240, description: 'Classes, attendance, assignments, results' },
  { id: 'rl4', name: 'Parent', users: 2841, description: 'View children, fees, and communication' },
]

export interface TimetableSlot { subject: string; teacher: string; room: string }
export interface TimetableRow {
  time: string
  Monday: TimetableSlot
  Tuesday: TimetableSlot
  Wednesday: TimetableSlot
  Thursday: TimetableSlot
  Friday: TimetableSlot
}

export const TIMETABLE: TimetableRow[] = [
  { time: '8:00', Monday: { subject: 'Mathematics', teacher: 'J. Okonkwo', room: '201' }, Tuesday: { subject: 'English', teacher: 'A. Morrison', room: '202' }, Wednesday: { subject: 'Science', teacher: 'C. Mendez', room: '301' }, Thursday: { subject: 'Mathematics', teacher: 'J. Okonkwo', room: '201' }, Friday: { subject: 'History', teacher: 'F. Al-Rashid', room: '102' } },
  { time: '9:00', Monday: { subject: 'English', teacher: 'A. Morrison', room: '202' }, Tuesday: { subject: 'Mathematics', teacher: 'J. Okonkwo', room: '201' }, Wednesday: { subject: 'ICT', teacher: 'K. Park', room: '401' }, Thursday: { subject: 'Science', teacher: 'C. Mendez', room: '301' }, Friday: { subject: 'Mathematics', teacher: 'J. Okonkwo', room: '201' } },
  { time: '10:00', Monday: { subject: 'Science', teacher: 'C. Mendez', room: '301' }, Tuesday: { subject: 'History', teacher: 'F. Al-Rashid', room: '102' }, Wednesday: { subject: 'English', teacher: 'A. Morrison', room: '202' }, Thursday: { subject: 'PE', teacher: 'Coach Reid', room: 'Gym' }, Friday: { subject: 'Science', teacher: 'C. Mendez', room: '301' } },
  { time: '11:00', Monday: { subject: 'Break', teacher: '—', room: '—' }, Tuesday: { subject: 'Break', teacher: '—', room: '—' }, Wednesday: { subject: 'Break', teacher: '—', room: '—' }, Thursday: { subject: 'Break', teacher: '—', room: '—' }, Friday: { subject: 'Break', teacher: '—', room: '—' } },
  { time: '12:00', Monday: { subject: 'History', teacher: 'F. Al-Rashid', room: '102' }, Tuesday: { subject: 'Science', teacher: 'C. Mendez', room: '301' }, Wednesday: { subject: 'Mathematics', teacher: 'J. Okonkwo', room: '201' }, Thursday: { subject: 'English', teacher: 'A. Morrison', room: '202' }, Friday: { subject: 'ICT', teacher: 'K. Park', room: '401' } },
  { time: '1:00', Monday: { subject: 'ICT', teacher: 'K. Park', room: '401' }, Tuesday: { subject: 'Literature', teacher: 'A. Morrison', room: '202' }, Wednesday: { subject: 'Physics', teacher: 'J. Okonkwo', room: '105' }, Thursday: { subject: 'History', teacher: 'F. Al-Rashid', room: '102' }, Friday: { subject: 'Assembly', teacher: 'Admin', room: 'Hall' } },
]

export const ENROLLMENT_MONTHLY = [
  { month: 'Mar', students: 790 },
  { month: 'Apr', students: 802 },
  { month: 'May', students: 811 },
  { month: 'Jun', students: 818 },
  { month: 'Jul', students: 829 },
  { month: 'Aug', students: 842 },
]

export const REVENUE_DATA = [
  { month: 'Mar', revenue: 42000, schools: 5 },
  { month: 'Apr', revenue: 51000, schools: 5 },
  { month: 'May', revenue: 48000, schools: 6 },
  { month: 'Jun', revenue: 63000, schools: 6 },
  { month: 'Jul', revenue: 71000, schools: 7 },
  { month: 'Aug', revenue: 78400, schools: 7 },
]

export const REVENUE_BY_PLAN = [
  { name: 'Premium', value: 5988 },
  { name: 'Standard', value: 1494 },
  { name: 'Basic', value: 396 },
  { name: 'Trial', value: 0 },
]

export const REVENUE_BY_SCHOOL = [
  { school: 'Al-Noor Academy', revenue: 21940 },
  { school: 'Green Valley Academy', revenue: 18420 },
  { school: 'Westfield Academy', revenue: 14760 },
  { school: 'Bright Future School', revenue: 8960 },
  { school: 'Sunrise Kindergarten', revenue: 7420 },
]

export const DAU_WEEKLY = [
  { day: 'Mon', dau: 2820 },
  { day: 'Tue', dau: 3110 },
  { day: 'Wed', dau: 2975 },
  { day: 'Thu', dau: 3260 },
  { day: 'Fri', dau: 3420 },
  { day: 'Sat', dau: 1980 },
  { day: 'Sun', dau: 1520 },
]

export const MODULE_USAGE = [
  { name: 'Attendance', value: 84200 },
  { name: 'Fees', value: 52300 },
  { name: 'Messages', value: 31800 },
  { name: 'Exams', value: 18400 },
  { name: 'Timetable', value: 12100 },
  { name: 'Reports', value: 9400 },
]

export const DELIVERY_DATA = [
  { channel: 'WhatsApp', sent: 8420, delivered: 8170, failed: 250 },
  { channel: 'Email', sent: 12640, delivered: 12390, failed: 250 },
  { channel: 'SMS', sent: 3180, delivered: 3100, failed: 80 },
]

export const API_ERRORS = [
  { day: 'Mon', errors: 6, failures: 2 },
  { day: 'Tue', errors: 4, failures: 1 },
  { day: 'Wed', errors: 8, failures: 3 },
  { day: 'Thu', errors: 3, failures: 0 },
  { day: 'Fri', errors: 5, failures: 2 },
]

export const SCHOOL_GROWTH_DATA = [
  { month: 'Jan', schools: 3 },
  { month: 'Feb', schools: 4 },
  { month: 'Mar', schools: 5 },
  { month: 'Apr', schools: 5 },
  { month: 'May', schools: 6 },
  { month: 'Jun', schools: 6 },
  { month: 'Jul', schools: 7 },
  { month: 'Aug', schools: 7 },
]

export const STUDENT_GROWTH_DATA = [
  { month: 'Mar', students: 2100 },
  { month: 'Apr', students: 2340 },
  { month: 'May', students: 2580 },
  { month: 'Jun', students: 2750 },
  { month: 'Jul', students: 3020 },
  { month: 'Aug', students: 3535 },
]

export const ATTENDANCE_WEEKLY = [
  { day: 'Mon', present: 788, absent: 42, late: 12 },
  { day: 'Tue', present: 798, absent: 35, late: 9 },
  { day: 'Wed', present: 771, absent: 48, late: 23 },
  { day: 'Thu', present: 805, absent: 28, late: 9 },
  { day: 'Fri', present: 762, absent: 55, late: 25 },
]

export const FEE_MONTHLY = [
  { month: 'Apr', collected: 38500, pending: 8200 },
  { month: 'May', collected: 42100, pending: 6400 },
  { month: 'Jun', collected: 39800, pending: 9100 },
  { month: 'Jul', collected: 45600, pending: 5300 },
  { month: 'Aug', collected: 31200, pending: 12400 },
]

export interface BusDriver {
  id: string
  name: string
  phone: string
  license: string
  status: 'Active' | 'Off Duty' | 'On Leave'
}

export const BUS_DRIVERS: BusDriver[] = [
  { id: 'bd1', name: 'Samuel Okafor', phone: '+1 (555) 401-0011', license: 'CDL-A 88412', status: 'Active' },
  { id: 'bd2', name: 'David Mwangi', phone: '+1 (555) 401-0012', license: 'CDL-B 77431', status: 'Active' },
  { id: 'bd3', name: 'Joseph Osei', phone: '+1 (555) 401-0013', license: 'CDL-B 66108', status: 'On Leave' },
]

export interface BusRoute {
  id: string
  name: string
  stops: string[]
  distance: string
}

export const BUS_ROUTES: BusRoute[] = [
  { id: 'br1', name: 'Route 1 — North Loop', stops: ['Elm Street', 'Hill Street', 'Oak Boulevard'], distance: '12 km' },
  { id: 'br2', name: 'Route 2 — River Side', stops: ['River Lane', 'Pine Street', 'Cedar Court'], distance: '9 km' },
  { id: 'br3', name: 'Route 3 — East Valley', stops: ['Birch Ave', 'Garden Road', 'Willow Way'], distance: '14 km' },
]

export interface Bus {
  id: string
  number: string
  plate: string
  driver: string
  capacity: number
  assigned: number
  route: string
  status: 'Active' | 'Maintenance' | 'Inactive'
}

export const BUSES: Bus[] = [
  { id: 'b1', number: 'BUS-01', plate: 'GV-8421A', driver: 'Samuel Okafor', capacity: 54, assigned: 41, route: 'Route 1 — North Loop', status: 'Active' },
  { id: 'b2', number: 'BUS-02', plate: 'GV-5587B', driver: 'David Mwangi', capacity: 54, assigned: 38, route: 'Route 2 — River Side', status: 'Active' },
  { id: 'b3', number: 'BUS-03', plate: 'GV-3390C', driver: 'Joseph Osei', capacity: 44, assigned: 0, route: 'Route 3 — East Valley', status: 'Maintenance' },
  { id: 'b4', number: 'BUS-04', plate: 'GV-9112D', driver: '—', capacity: 30, assigned: 0, route: 'Unassigned', status: 'Inactive' },
]

export interface BusAssignment {
  id: string
  studentName: string
  className: string
  bus: string
  route: string
  stop: string
}

export const BUS_ASSIGNMENTS: BusAssignment[] = [
  { id: 'ba1', studentName: 'Ethan Williams', className: 'Grade 7A', bus: 'BUS-01', route: 'Route 1 — North Loop', stop: 'Elm Street' },
  { id: 'ba2', studentName: 'Aisha Johnson', className: 'Grade 7A', bus: 'BUS-01', route: 'Route 1 — North Loop', stop: 'Hill Street' },
  { id: 'ba3', studentName: 'Lily Chen', className: 'Grade 6A', bus: 'BUS-02', route: 'Route 2 — River Side', stop: 'River Lane' },
  { id: 'ba4', studentName: 'Sofia Rodriguez', className: 'Grade 7B', bus: 'BUS-02', route: 'Route 2 — River Side', stop: 'Pine Street' },
  { id: 'ba5', studentName: 'Zara Ahmed', className: 'Grade 6B', bus: 'BUS-01', route: 'Route 1 — North Loop', stop: 'Oak Boulevard' },
  { id: 'ba6', studentName: 'Mason Lee', className: 'Grade 9A', bus: 'BUS-02', route: 'Route 2 — River Side', stop: 'Cedar Court' },
]

export function busOf(studentName: string): string {
  return BUS_ASSIGNMENTS.find(a => a.studentName === studentName)?.bus ?? '—'
}

export interface StaffMember {
  id: string
  name: string
  role: 'Driver' | 'Security' | 'Cleaner' | 'Cook' | 'Accountant' | 'Other'
  phone: string
  compensation: number
  status: 'Active' | 'On Leave' | 'Inactive'
}

export const STAFF: StaffMember[] = [
  { id: 'sf1', name: 'Samuel Okafor', role: 'Driver', phone: '+1 (555) 401-0011', compensation: 2100, status: 'Active' },
  { id: 'sf2', name: 'David Mwangi', role: 'Driver', phone: '+1 (555) 401-0012', compensation: 2100, status: 'Active' },
  { id: 'sf3', name: 'Rashid Ali', role: 'Security', phone: '+1 (555) 402-0021', compensation: 1500, status: 'Active' },
  { id: 'sf4', name: 'Grace Njoroge', role: 'Cleaner', phone: '+1 (555) 402-0022', compensation: 1100, status: 'Active' },
  { id: 'sf5', name: 'Mary Wanjiku', role: 'Cook', phone: '+1 (555) 402-0023', compensation: 1300, status: 'On Leave' },
  { id: 'sf6', name: 'Tom Ochieng', role: 'Accountant', phone: '+1 (555) 402-0024', compensation: 2600, status: 'Active' },
  { id: 'sf7', name: 'Hassan Farah', role: 'Other', phone: '+1 (555) 402-0025', compensation: 1200, status: 'Inactive' },
]

export interface IncomeRecord {
  id: string
  date: string
  amount: number
  category: 'Student Fees' | 'Registration' | 'Transport' | 'Donations' | 'Other'
  source: string
  reference: string
  notes?: string
}

export const INCOME: IncomeRecord[] = [
  { id: 'in1', date: '2026-08-14', amount: 1200, category: 'Student Fees', source: 'Ethan Williams', reference: 'TXN-88421', notes: 'Tuition — August' },
  { id: 'in2', date: '2026-08-12', amount: 1200, category: 'Student Fees', source: 'Aisha Johnson', reference: 'TXN-88490' },
  { id: 'in3', date: '2026-08-09', amount: 250, category: 'Student Fees', source: 'Sofia Rodriguez', reference: 'TXN-88601', notes: 'Activities fee' },
  { id: 'in4', date: '2026-08-08', amount: 320, category: 'Transport', source: 'Bus fee pool', reference: 'TRP-2026-08', notes: 'August transport' },
  { id: 'in5', date: '2026-08-05', amount: 200, category: 'Registration', source: 'New enrollment', reference: 'REG-2026-018' },
  { id: 'in6', date: '2026-08-03', amount: 1500, category: 'Donations', source: 'Alumni Association', reference: 'DON-1102' },
  { id: 'in7', date: '2026-08-01', amount: 1100, category: 'Student Fees', source: 'Lily Chen', reference: 'TXN-88512' },
  { id: 'in8', date: '2026-08-15', amount: 200, category: 'Student Fees', source: 'Mason Lee', reference: 'TXN-88688', notes: 'Lab fee' },
]

export interface SchoolReport {
  id: string
  type: 'Student' | 'Teacher'
  title: string
  subject: string
  className: string
  date: string
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Sent' | 'Archived'
  preparedBy: string
}

export const SCHOOL_REPORTS: SchoolReport[] = [
  { id: 'rp1', type: 'Student', title: 'Mid-term report — Grade 7A', subject: 'All subjects', className: 'Grade 7A', date: '2026-08-14', status: 'Pending Review', preparedBy: 'James Okonkwo' },
  { id: 'rp2', type: 'Student', title: 'Progress report — Grade 6A', subject: 'All subjects', className: 'Grade 6A', date: '2026-08-12', status: 'Approved', preparedBy: 'Angela Morrison' },
  { id: 'rp3', type: 'Teacher', title: 'Teacher evaluation — Term 2', subject: 'Mathematics', className: 'Grade 8B', date: '2026-08-10', status: 'Pending Review', preparedBy: 'Sarah Mitchell' },
  { id: 'rp4', type: 'Student', title: 'Term 1 report cards', subject: 'All subjects', className: 'All classes', date: '2026-07-30', status: 'Sent', preparedBy: 'Academics Office' },
  { id: 'rp5', type: 'Teacher', title: 'Class performance summary', subject: 'Science', className: 'Grade 8A', date: '2026-08-08', status: 'Draft', preparedBy: 'Carlos Mendez' },
  { id: 'rp6', type: 'Student', title: 'Behaviour & conduct report', subject: '—', className: 'Grade 9C', date: '2026-07-22', status: 'Archived', preparedBy: 'Sarah Mitchell' },
]

export interface TimetableEntry {
  id: string
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'
  start: string
  end: string
  subject: string
  teacher: string
  className: string
  location: string
}

export const TIMETABLE_ENTRIES: TimetableEntry[] = [
  { id: 'tt1', day: 'Monday', start: '08:00', end: '09:00', subject: 'Mathematics', teacher: 'James Okonkwo', className: 'Grade 7A', location: 'Rm 201' },
  { id: 'tt2', day: 'Monday', start: '09:00', end: '10:00', subject: 'English', teacher: 'Angela Morrison', className: 'Grade 7A', location: 'Rm 202' },
  { id: 'tt3', day: 'Monday', start: '10:00', end: '11:00', subject: 'Science', teacher: 'Carlos Mendez', className: 'Grade 7A', location: 'Rm 301' },
  { id: 'tt4', day: 'Monday', start: '12:00', end: '13:00', subject: 'History', teacher: 'Fatima Al-Rashid', className: 'Grade 7A', location: 'Rm 102' },
  { id: 'tt5', day: 'Monday', start: '13:00', end: '14:00', subject: 'ICT', teacher: 'Kevin Park', className: 'Grade 7A', location: 'Rm 401' },
  { id: 'tt6', day: 'Tuesday', start: '08:00', end: '09:00', subject: 'English', teacher: 'Angela Morrison', className: 'Grade 7A', location: 'Rm 202' },
  { id: 'tt7', day: 'Tuesday', start: '09:00', end: '10:00', subject: 'Mathematics', teacher: 'James Okonkwo', className: 'Grade 7A', location: 'Rm 201' },
  { id: 'tt8', day: 'Tuesday', start: '10:00', end: '11:00', subject: 'History', teacher: 'Fatima Al-Rashid', className: 'Grade 7A', location: 'Rm 102' },
  { id: 'tt9', day: 'Tuesday', start: '12:00', end: '13:00', subject: 'Science', teacher: 'Carlos Mendez', className: 'Grade 7A', location: 'Rm 301' },
  { id: 'tt10', day: 'Tuesday', start: '13:00', end: '14:00', subject: 'Literature', teacher: 'Angela Morrison', className: 'Grade 7A', location: 'Rm 202' },
  { id: 'tt11', day: 'Wednesday', start: '08:00', end: '09:00', subject: 'Science', teacher: 'Carlos Mendez', className: 'Grade 7A', location: 'Rm 301' },
  { id: 'tt12', day: 'Wednesday', start: '09:00', end: '10:00', subject: 'ICT', teacher: 'Kevin Park', className: 'Grade 7A', location: 'Rm 401' },
  { id: 'tt13', day: 'Wednesday', start: '10:00', end: '11:00', subject: 'English', teacher: 'Angela Morrison', className: 'Grade 7A', location: 'Rm 202' },
  { id: 'tt14', day: 'Wednesday', start: '12:00', end: '13:00', subject: 'Mathematics', teacher: 'James Okonkwo', className: 'Grade 7A', location: 'Rm 201' },
  { id: 'tt15', day: 'Wednesday', start: '13:00', end: '14:00', subject: 'Physics', teacher: 'James Okonkwo', className: 'Grade 7A', location: 'Rm 105' },
  { id: 'tt16', day: 'Thursday', start: '08:00', end: '09:00', subject: 'Mathematics', teacher: 'James Okonkwo', className: 'Grade 7A', location: 'Rm 201' },
  { id: 'tt17', day: 'Thursday', start: '09:00', end: '10:00', subject: 'Science', teacher: 'Carlos Mendez', className: 'Grade 7A', location: 'Rm 301' },
  { id: 'tt18', day: 'Thursday', start: '10:00', end: '11:00', subject: 'PE', teacher: 'Coach Reid', className: 'Grade 7A', location: 'Gym' },
  { id: 'tt19', day: 'Thursday', start: '12:00', end: '13:00', subject: 'English', teacher: 'Angela Morrison', className: 'Grade 7A', location: 'Rm 202' },
  { id: 'tt20', day: 'Thursday', start: '13:00', end: '14:00', subject: 'History', teacher: 'Fatima Al-Rashid', className: 'Grade 7A', location: 'Rm 102' },
  { id: 'tt21', day: 'Friday', start: '08:00', end: '09:00', subject: 'History', teacher: 'Fatima Al-Rashid', className: 'Grade 7A', location: 'Rm 102' },
  { id: 'tt22', day: 'Friday', start: '09:00', end: '10:00', subject: 'Mathematics', teacher: 'James Okonkwo', className: 'Grade 7A', location: 'Rm 201' },
  { id: 'tt23', day: 'Friday', start: '10:00', end: '11:00', subject: 'Science', teacher: 'Carlos Mendez', className: 'Grade 7A', location: 'Rm 301' },
  { id: 'tt24', day: 'Friday', start: '12:00', end: '13:00', subject: 'ICT', teacher: 'Kevin Park', className: 'Grade 7A', location: 'Rm 401' },
  { id: 'tt25', day: 'Friday', start: '13:00', end: '14:00', subject: 'Assembly', teacher: 'Admin', className: 'Grade 7A', location: 'Hall' },
  { id: 'tt26', day: 'Monday', start: '08:00', end: '09:00', subject: 'Mathematics', teacher: 'James Okonkwo', className: 'Grade 8B', location: 'Rm 105' },
  { id: 'tt27', day: 'Monday', start: '08:00', end: '09:00', subject: 'English', teacher: 'Angela Morrison', className: 'Grade 6A', location: 'Rm 101' },
  { id: 'tt28', day: 'Monday', start: '08:00', end: '09:00', subject: 'Mathematics', teacher: 'Kevin Park', className: 'Grade 9A', location: 'Rm 201' },
  { id: 'tt29', day: 'Tuesday', start: '10:00', end: '11:00', subject: 'Science', teacher: 'Carlos Mendez', className: 'Grade 8A', location: 'Rm 301' },
]

export const FINANCE_MONTHLY = [
  { month: 'Apr', income: 39800, expenses: 14100 },
  { month: 'May', income: 43100, expenses: 15600 },
  { month: 'Jun', income: 40900, expenses: 14200 },
  { month: 'Jul', income: 46800, expenses: 16500 },
  { month: 'Aug', income: 5770, expenses: 19170 },
]

export const SUBSCRIPTION_PLANS = [
  { id: 'p1', name: 'Basic', price: 99, billing: 'Monthly', studentLimit: 200, teacherLimit: 20, features: ['Student Management', 'Attendance', 'Basic Reports'], status: 'Active', subscribers: 2 },
  { id: 'p2', name: 'Standard', price: 249, billing: 'Monthly', studentLimit: 600, teacherLimit: 60, features: ['Everything in Basic', 'Fee Management', 'Exam & Results', 'Events & Announcements'], status: 'Active', subscribers: 2 },
  { id: 'p3', name: 'Premium', price: 499, billing: 'Monthly', studentLimit: 2000, teacherLimit: 200, features: ['Everything in Standard', 'Timetable', 'Assignments', 'Parent Portal', 'Priority Support'], status: 'Active', subscribers: 3 },
]

export const CHILDREN = [
  { ...STUDENTS[0], subject: 'Mathematics', teacher: 'James Okonkwo' },
  { ...STUDENTS[8], subject: 'Science', teacher: 'Carlos Mendez' },
]

export const LOGIN_HISTORY = [
  { id: 'lh1', device: 'Chrome · Windows', ip: '192.168.1.14', date: '2026-08-16 07:48 AM', status: 'Success' },
  { id: 'lh2', device: 'Safari · iPhone', ip: '192.168.1.90', date: '2026-08-15 09:04 PM', status: 'Success' },
  { id: 'lh3', device: 'Chrome · Windows', ip: '192.168.1.14', date: '2026-08-15 07:12 AM', status: 'Success' },
  { id: 'lh4', device: 'Unknown · Linux', ip: '203.0.113.40', date: '2026-08-14 02:11 AM', status: 'Failed' },
]

export const REPORT_CARD_SUBJECTS = [
  { subject: 'Mathematics', marks: 88, grade: 'A', comment: 'Strong analytical skills.' },
  { subject: 'English', marks: 76, grade: 'B+', comment: 'Clear writing; expand vocabulary.' },
  { subject: 'Science', marks: 92, grade: 'A+', comment: 'Excellent lab work.' },
  { subject: 'History', marks: 71, grade: 'B', comment: 'Good recall; improve essays.' },
  { subject: 'Computer Science', marks: 95, grade: 'A+', comment: 'Outstanding practical projects.' },
  { subject: 'Physical Education', marks: 84, grade: 'A', comment: 'Active and collaborative.' },
]

export function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

export function money(n: number) {
  return `$${n.toLocaleString()}`
}
